# Portfolio Website

A complete portfolio site built with **React**, **Tailwind CSS**, and **Supabase**, using the design theme from your provided HTML mockups (purple primary, dark mode, glassmorphism).

## Features

- **Public pages**: Home, About Me, Projects, Services, Skills, Contact
- **Dashboard**: Overview, project count, contact messages (read from Supabase)
- **Admin panel** (login required): Full CRUD for profile, projects, skills, education, expertise, honors, services; view/delete contact messages; image uploads for profile avatar and project images
- **Contact form**: Submits to Supabase `contact_messages` table

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Supabase

1. Create a project at [supabase.com](https://supabase.com).
2. In the **SQL Editor**, run the contents of `supabase/schema.sql` to create tables and seed data.
3. Run `supabase/admin-policies.sql` in the SQL Editor (enables authenticated admin to edit content and use Storage).
4. **Storage**: In Dashboard go to **Storage** → **New bucket** → name: `portfolio`, set **Public** to Yes.
5. **Admin user**: In **Authentication** → **Users** → **Add user** → create a user with email and password (this is your admin login).
6. In **Project Settings → API**, copy:
   - Project URL → `VITE_SUPABASE_URL`
   - anon public key → `VITE_SUPABASE_ANON_KEY`

### 3. Environment

Create a `.env` file in the project root (see `.env.example`):

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### 4. Run

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Build

```bash
npm run build
npm run preview
```

## Admin panel

1. Open **[http://localhost:5173/admin](http://localhost:5173/admin)** (or click **Admin** in the site sidebar).
2. Sign in with the email and password you created in Supabase Authentication.
3. Use the admin sidebar to manage **Profile** (with avatar upload), **Projects** (with image upload), **Skills**, **Education**, **Expertise**, **Honors**, **Services**, and **Messages** (view/delete contact form submissions).

## Design

- Primary: `#8a2ce2`
- Dark background: `#191121`
- Font: Inter
- Tailwind with custom theme in `tailwind.config.js` and global styles in `src/index.css`
