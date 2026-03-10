-- Run this AFTER schema.sql in Supabase SQL Editor
-- Enables authenticated admin to manage all content and use Storage

-- Drop existing "public read contact_messages" if you want only admin to see messages (optional)
-- Here we keep public read for dashboard; admin can still select.

-- Authenticated users can INSERT, UPDATE, DELETE all portfolio tables
create policy "Auth insert profiles" on public.profiles for insert to authenticated with check (true);
create policy "Auth update profiles" on public.profiles for update to authenticated using (true) with check (true);
create policy "Auth delete profiles" on public.profiles for delete to authenticated using (true);

create policy "Auth insert education" on public.education for insert to authenticated with check (true);
create policy "Auth update education" on public.education for update to authenticated using (true) with check (true);
create policy "Auth delete education" on public.education for delete to authenticated using (true);

create policy "Auth insert expertise" on public.expertise for insert to authenticated with check (true);
create policy "Auth update expertise" on public.expertise for update to authenticated using (true) with check (true);
create policy "Auth delete expertise" on public.expertise for delete to authenticated using (true);

create policy "Auth insert honors" on public.honors for insert to authenticated with check (true);
create policy "Auth update honors" on public.honors for update to authenticated using (true) with check (true);
create policy "Auth delete honors" on public.honors for delete to authenticated using (true);

create policy "Auth insert projects" on public.projects for insert to authenticated with check (true);
create policy "Auth update projects" on public.projects for update to authenticated using (true) with check (true);
create policy "Auth delete projects" on public.projects for delete to authenticated using (true);

create policy "Auth insert skills" on public.skills for insert to authenticated with check (true);
create policy "Auth update skills" on public.skills for update to authenticated using (true) with check (true);
create policy "Auth delete skills" on public.skills for delete to authenticated using (true);

create policy "Auth insert services" on public.services for insert to authenticated with check (true);
create policy "Auth update services" on public.services for update to authenticated using (true) with check (true);
create policy "Auth delete services" on public.services for delete to authenticated using (true);

create policy "Auth delete contact_messages" on public.contact_messages for delete to authenticated using (true);
create policy "Auth update contact_messages" on public.contact_messages for update to authenticated using (true) with check (true);

-- Storage bucket: create in Dashboard → Storage → New bucket → name "portfolio", set Public.
-- Then run the policies below (or create bucket first via API).

create policy "Public read portfolio storage" on storage.objects for select using (bucket_id = 'portfolio');
create policy "Auth upload portfolio storage" on storage.objects for insert to authenticated with check (bucket_id = 'portfolio');
create policy "Auth update portfolio storage" on storage.objects for update to authenticated using (bucket_id = 'portfolio');
create policy "Auth delete portfolio storage" on storage.objects for delete to authenticated using (bucket_id = 'portfolio');
