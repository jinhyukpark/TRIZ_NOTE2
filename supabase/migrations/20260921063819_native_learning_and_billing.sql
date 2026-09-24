-- Native app: own-row records. Purchase authority is exclusively server-side.
create table public.profiles (
  user_id uuid primary key references auth.users(id) on delete cascade default auth.uid(),
  display_name text not null default '' check (char_length(display_name) <= 100),
  locale text not null default 'ko' check (locale in ('ko','en','ja','zh')),
  updated_at timestamptz not null default now()
);
create table public.bookmarks (
  user_id uuid not null references auth.users(id) on delete cascade default auth.uid(),
  principle_id smallint not null check (principle_id between 1 and 40),
  created_at timestamptz not null default now(), primary key(user_id, principle_id)
);
create table public.learning_progress (
  user_id uuid not null references auth.users(id) on delete cascade default auth.uid(),
  principle_id smallint not null check (principle_id between 1 and 40),
  completed boolean not null default false, updated_at timestamptz not null default now(),
  primary key(user_id, principle_id)
);
create table public.notes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade default auth.uid(),
  principle_id smallint not null check (principle_id between 1 and 40),
  body text not null check (char_length(body) between 1 and 5000),
  updated_at timestamptz not null default now()
);
create index notes_owner on public.notes(user_id, principle_id);
create table public.store_products (
  store text not null check (store in ('apple','google')),
  product_id text not null,
  kind text not null check (kind in ('subscription','non_consumable')),
  entitlement text not null default 'premium',
  active boolean not null default false,
  primary key(store, product_id)
);
create table public.purchase_records (
  store text not null check (store in ('apple','google')),
  transaction_id text not null,
  user_id uuid not null references auth.users(id) on delete cascade,
  product_id text not null,
  expires_at timestamptz,
  revoked boolean not null default false,
  verified_at timestamptz not null default now(),
  primary key(store, transaction_id),
  foreign key(store, product_id) references public.store_products(store, product_id)
);
create index purchase_owner on public.purchase_records(user_id);
create index purchase_product on public.purchase_records(store, product_id);
create table public.entitlements (
  user_id uuid not null references auth.users(id) on delete cascade,
  entitlement text not null,
  active boolean not null default false,
  expires_at timestamptz,
  verified_at timestamptz not null default now(),
  primary key(user_id, entitlement)
);
alter table public.profiles enable row level security;
revoke all on public.profiles from anon, authenticated;
grant select, insert, update, delete on public.profiles to authenticated;
create policy own_rows on public.profiles for all to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
grant all on public.profiles to service_role;
alter table public.bookmarks enable row level security;
revoke all on public.bookmarks from anon, authenticated;
grant select, insert, update, delete on public.bookmarks to authenticated;
create policy own_rows on public.bookmarks for all to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
grant all on public.bookmarks to service_role;
alter table public.learning_progress enable row level security;
revoke all on public.learning_progress from anon, authenticated;
grant select, insert, update, delete on public.learning_progress to authenticated;
create policy own_rows on public.learning_progress for all to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
grant all on public.learning_progress to service_role;
alter table public.notes enable row level security;
revoke all on public.notes from anon, authenticated;
grant select, insert, update, delete on public.notes to authenticated;
create policy own_rows on public.notes for all to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
grant all on public.notes to service_role;
alter table public.store_products enable row level security;
revoke all on public.store_products from anon, authenticated;
grant select on public.store_products to authenticated;
create policy active_products on public.store_products for select to authenticated using (active);
grant all on public.store_products to service_role;
alter table public.purchase_records enable row level security;
revoke all on public.purchase_records from anon, authenticated;
grant select on public.purchase_records to authenticated;
create policy own_read_only on public.purchase_records for select to authenticated using ((select auth.uid()) = user_id);
grant all on public.purchase_records to service_role;
alter table public.entitlements enable row level security;
revoke all on public.entitlements from anon, authenticated;
grant select on public.entitlements to authenticated;
create policy own_read_only on public.entitlements for select to authenticated using ((select auth.uid()) = user_id);
grant all on public.entitlements to service_role;
