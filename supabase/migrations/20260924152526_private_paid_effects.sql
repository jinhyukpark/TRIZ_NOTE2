-- All payload delivery goes through the authenticated, entitlement-checking Edge Function.
-- Storage bucket visibility is changed via the Storage API by publish-effects.mjs.
drop policy if exists "Published Effects are readable" on public.effect_content;
revoke all on public.effect_content from anon, authenticated;
alter table public.effect_content enable row level security;
grant select,insert,update,delete on public.effect_content to service_role;
