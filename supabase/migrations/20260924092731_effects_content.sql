create table public.effect_content (
 id text primary key,
 schema_version integer not null default 1 check (schema_version = 1),
 payload jsonb not null check (jsonb_typeof(payload) = 'object' and payload->>'id' = id),
 published boolean not null default false,
 updated_at timestamptz not null default now()
);
alter table public.effect_content enable row level security;
grant select on public.effect_content to anon, authenticated;
revoke insert, update, delete on public.effect_content from anon, authenticated;
grant all on public.effect_content to service_role;
create policy "Published Effects are readable" on public.effect_content for select to anon, authenticated using (published);
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('effect-content', 'effect-content', true, 20971520, array['image/png','application/json'])
on conflict (id) do nothing;
-- No client write policies: uploads are restricted to the administrative publisher.
