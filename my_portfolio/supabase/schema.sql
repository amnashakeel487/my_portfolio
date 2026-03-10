-- Portfolio website Supabase schema
-- Run this in your Supabase project SQL Editor (Dashboard → SQL Editor → New query)

-- Enable UUID extension if not exists
create extension if not exists "uuid-ossp";

-- Profile (single row or one per user if using auth)
create table if not exists public.profiles (
  id uuid primary key default uuid_generate_v4(),
  full_name text not null default 'Your Name',
  tagline text default 'Creative Designer & Developer',
  bio text,
  bio_short text,
  avatar_url text,
  location text,
  experience_years text,
  languages text,
  cv_url text,
  email text,
  linkedin_url text,
  twitter_url text,
  github_url text,
  youtube_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Education / Academic journey
create table if not exists public.education (
  id uuid primary key default uuid_generate_v4(),
  sort_order int default 0,
  period text not null,
  title text not null,
  institution text,
  description text,
  created_at timestamptz default now()
);

-- Expertise / Core expertise items
create table if not exists public.expertise (
  id uuid primary key default uuid_generate_v4(),
  sort_order int default 0,
  title text not null,
  description text,
  created_at timestamptz default now()
);

-- Honors / Featured honors
create table if not exists public.honors (
  id uuid primary key default uuid_generate_v4(),
  sort_order int default 0,
  title text not null,
  created_at timestamptz default now()
);

-- Projects
create table if not exists public.projects (
  id uuid primary key default uuid_generate_v4(),
  sort_order int default 0,
  title text not null,
  description text,
  image_url text,
  tags text[] default '{}',
  live_url text,
  github_url text,
  status text default 'Live',
  category text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Skills
create table if not exists public.skills (
  id uuid primary key default uuid_generate_v4(),
  sort_order int default 0,
  category text not null default 'Frontend',
  name text not null,
  description text,
  percentage int check (percentage >= 0 and percentage <= 100) default 80,
  level text default 'Intermediate',
  icon_color text,
  created_at timestamptz default now()
);

-- Services (for Services page)
create table if not exists public.services (
  id uuid primary key default uuid_generate_v4(),
  sort_order int default 0,
  title text not null,
  description text,
  icon text,
  created_at timestamptz default now()
);

-- Contact form submissions
create table if not exists public.contact_messages (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text not null,
  subject text,
  message text not null,
  read_at timestamptz,
  created_at timestamptz default now()
);

-- Enable RLS (Row Level Security)
alter table public.profiles enable row level security;
alter table public.education enable row level security;
alter table public.expertise enable row level security;
alter table public.honors enable row level security;
alter table public.projects enable row level security;
alter table public.skills enable row level security;
alter table public.services enable row level security;
alter table public.contact_messages enable row level security;

-- Public read for all content (portfolio is public)
create policy "Public read profiles" on public.profiles for select using (true);
create policy "Public read education" on public.education for select using (true);
create policy "Public read expertise" on public.expertise for select using (true);
create policy "Public read honors" on public.honors for select using (true);
create policy "Public read projects" on public.projects for select using (true);
create policy "Public read skills" on public.skills for select using (true);
create policy "Public read services" on public.services for select using (true);

-- Anyone can insert contact messages
create policy "Anyone can insert contact_messages" on public.contact_messages for insert with check (true);

-- Only authenticated users can update profiles (optional; use service role for admin)
-- For simplicity we allow anon to update if you use service key in admin. Or add auth later.
create policy "Public read contact_messages" on public.contact_messages for select using (true);

-- Seed default profile
insert into public.profiles (full_name, tagline, bio, bio_short, location, experience_years, languages)
values (
  'Alex Rivers',
  'Senior UI/UX Designer & Creative Technologist',
  'Passionate about building digital experiences that merge aesthetics with deep functionality. I specialize in crafting clean, user-centric interfaces that solve complex business challenges. My approach is rooted in design thinking, rapid prototyping, and a strong understanding of front-end development.

Over the last decade, I''ve worked with startups and Fortune 500 companies to redefine their digital presence. I believe that good design isn''t just about how it looks, but how it works and feels in the hands of the user. When I''m not pushing pixels, you can find me exploring the intersection of AI and generative design.',
  'Designing digital experiences with purpose. 8+ years crafting interfaces that users love.',
  'San Francisco, CA',
  '8+ Years Experience',
  'English, French'
) on conflict do nothing;

-- Seed default education
insert into public.education (sort_order, period, title, institution, description) values
(0, '2018 - 2020', 'M.S. in Human-Computer Interaction', 'Stanford University', 'Specialized in cognitive psychology and interactive systems.'),
(1, '2014 - 2018', 'B.F.A. in Graphic Design', 'Rhode Island School of Design', 'Focus on typography, layout, and visual communication.'),
(2, '2021', 'Certified Product Designer', 'Design Management Institute', 'Executive certification in product lifecycle management.');

-- Seed default expertise
insert into public.expertise (sort_order, title, description) values
(0, 'Interface Design', 'High-fidelity UI, Design Systems, Component Libraries'),
(1, 'User Experience', 'User Research, Information Architecture, Wireframing'),
(2, 'Interaction Design', 'Prototyping, Micro-interactions, Motion Graphics'),
(3, 'Strategic Thinking', 'Product Strategy, UX Audit, Conversion Optimization');

-- Seed default honors
insert into public.honors (sort_order, title) values (0, 'Awwwards Jury Member 2023'), (1, 'Red Dot Design Award Winner');

-- Seed default projects
insert into public.projects (sort_order, title, description, tags, live_url, github_url, status, category) values
(0, 'NeoCommerce API', 'A high-performance e-commerce backend built with NestJS and PostgreSQL, featuring microservices architecture.', array['NEXT.JS','PRISMA','TYPESCRIPT'], '#', '#', 'Live', 'React'),
(1, 'Insight Analytics', 'Real-time data visualization platform for monitoring server health and application performance metrics.', array['REACT','D3.JS','SUPABASE'], '#', '#', 'Live', 'React'),
(2, 'EtherFlow Wallet', 'A non-custodial browser extension wallet with multi-chain support and built-in decentralized swap features.', array['SOLIDITY','WEB3.JS','REDUX'], '#', '#', 'Live', 'Web3'),
(3, 'NeuralCanvas AI', 'Integration of Stable Diffusion and OpenAI for collaborative image generation and creative workflows.', array['PYTHON','FASTAPI','REACT'], '#', '#', 'Live', 'UI/UX'),
(4, 'Zenith Tasks', 'Minimalist productivity tool for developers with integrated GitHub issues syncing and pomodoro timer.', array['TAILWIND','ELECTRON','VUE'], '#', '#', 'In Progress', 'UI/UX');

-- Seed default skills
insert into public.skills (sort_order, category, name, description, percentage, level, icon_color) values
(0, 'Frontend', 'React / Next.js', 'Component architecture, SSR, and state management.', 92, 'Advanced', 'blue'),
(1, 'Frontend', 'Tailwind CSS', 'Utility-first styling, design systems, and responsive layouts.', 98, 'Expert', 'cyan'),
(2, 'Frontend', 'TypeScript', 'Static typing, generic interfaces, and utility types.', 88, 'Advanced', 'blue'),
(3, 'Frontend', 'GraphQL', 'Schema design, mutations, and Apollo Client integration.', 75, 'Intermediate', 'pink'),
(4, 'Frontend', 'Three.js / WebGL', '3D web experiences, shaders, and geometry rendering.', 45, 'Learning', 'slate');

-- Seed default services
insert into public.services (sort_order, title, description, icon) values
(0, 'UI/UX Design', 'User research, wireframing, high-fidelity mockups, and design systems that scale.', 'palette'),
(1, 'Frontend Development', 'React, Next.js, and modern CSS. Accessible, performant interfaces.', 'code'),
(2, 'Prototyping & Motion', 'Interactive prototypes and micro-interactions that bring ideas to life.', 'bolt'),
(3, 'Design Strategy', 'Product strategy, UX audits, and conversion-focused design decisions.', 'architecture');
