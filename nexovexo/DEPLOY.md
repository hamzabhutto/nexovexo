# Deploying NexoVexo

The site is a Next.js app backed by a hosted PostgreSQL database.
Recommended hosting: **Supabase** (database) + **Vercel** (app).

---

## 1. Create the database (Supabase)

1. Go to https://supabase.com and sign up (free tier is fine).
2. **New project** → name it `nexovexo`, set a **database password** (save it),
   pick a region close to you. Wait ~2 min for provisioning.
3. Click **Connect** (top bar). You need two connection strings:
   - **Transaction pooler** (port **6543**) → this is `DATABASE_URL`.
   - **Session / Direct** (port **5432**) → this is `DIRECT_URL`.
4. In each string, replace `PASSWORD` with the database password from step 2.
   Keep `?pgbouncer=true` on the pooled (6543) one.

Put both into your local `.env` (see `.env.example`).

Bonus: Supabase's **Table Editor** lets you view/edit rows (services, projects,
and incoming contact/consultation submissions) directly in its dashboard —
handy now that the separate admin app is gone.

## 2. Push the schema + seed (run locally, once)

```bash
cd nexovexo
npm install
npm run db:push     # creates the tables in Neon
npm run db:seed     # loads the services / projects / testimonials
```

Verify in the Neon dashboard (Tables) that data is present.

## 3. Push the code to GitHub

```bash
# from the repo root (/Users/mac/Desktop/NexoVexo)
gh auth login                       # one-time, interactive
gh repo create nexovexo --private --source=. --remote=origin --push
```

## 4. Deploy to Vercel

1. Go to https://vercel.com and sign in with GitHub.
2. **Add New → Project**, import the `nexovexo` repo.
3. **Root Directory:** set to `nexovexo` (the app lives in that subfolder).
4. Framework preset: **Next.js** (auto-detected).
5. **Environment Variables** — add:
   - `DATABASE_URL` = your Neon **pooled** string
   - `DIRECT_URL` = your Neon **direct** string
6. Click **Deploy**.

That's it — Vercel runs `npm install` (which runs `prisma generate`) and `next build`.

## 5. After first deploy

- Visit the generated `*.vercel.app` URL to confirm it works.
- Custom domain: Vercel → Project → **Settings → Domains** → add your domain,
  then add the DNS records it shows at your registrar.

## Notes

- `DATABASE_URL` must be the **pooled** connection on Vercel (serverless opens
  many short-lived connections; the pooler prevents exhausting Postgres).
- Re-seeding is safe to re-run; it upserts by slug and won't duplicate.
- To change site content, edit `prisma/seed.ts` and run `npm run db:seed`
  against the Neon database.
