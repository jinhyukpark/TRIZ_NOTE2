create function public.commit_verified_purchase(p_user uuid, p_store text, p_transaction text, p_product text, p_expires timestamptz, p_revoked boolean)
returns void language plpgsql security invoker set search_path = '' as $$
declare entitlement_key text; current_owner uuid;
begin
  perform pg_advisory_xact_lock(hashtextextended(p_store || ':' || p_transaction, 0));
  select user_id into current_owner from public.purchase_records where store=p_store and transaction_id=p_transaction;
  if current_owner is not null and current_owner <> p_user then raise exception 'Purchase belongs to another account'; end if;
  select entitlement into strict entitlement_key from public.store_products where store=p_store and product_id=p_product;
  perform pg_advisory_xact_lock(hashtextextended(p_user::text || ':' || entitlement_key, 0));
  insert into public.purchase_records(store,transaction_id,user_id,product_id,expires_at,revoked,verified_at)
  values(p_store,p_transaction,p_user,p_product,p_expires,p_revoked,now())
  on conflict(store,transaction_id) do update set expires_at=excluded.expires_at,revoked=excluded.revoked,verified_at=now();
  insert into public.entitlements(user_id,entitlement,active,expires_at,verified_at)
  select p_user,entitlement_key,
    coalesce(bool_or(not r.revoked and (r.expires_at is null or r.expires_at>now())),false),
    case when coalesce(bool_or(not r.revoked and r.expires_at is null),false) then null else max(r.expires_at) filter(where not r.revoked) end,now()
  from public.purchase_records r join public.store_products p using(store,product_id)
  where r.user_id=p_user and p.entitlement=entitlement_key
  on conflict(user_id,entitlement) do update set active=excluded.active,expires_at=excluded.expires_at,verified_at=now();
end; $$;
revoke all on function public.commit_verified_purchase(uuid,text,text,text,timestamptz,boolean) from public,anon,authenticated;
grant execute on function public.commit_verified_purchase(uuid,text,text,text,timestamptz,boolean) to service_role;
