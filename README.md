# Bahite's Bites – Vercel + Neon Deployment Guide

## One-time setup

### 1. Install Vercel CLI
```
npm install -g vercel
```

### 2. Inside this folder, run:
```
vercel
```
Follow the prompts:
- Set up and deploy? **Y**
- Which scope? (pick your account)
- Link to existing project? **N**
- Project name: `bahites-bites` (or anything)
- Directory: `.` (just press Enter)
- Override settings? **N**

### 3. Add your Neon connection string as an environment variable

After the first deploy, run:
```
vercel env add DATABASE_URL
```
When prompted, paste your Neon connection string:
```
postgresql://neondb_owner:npg_x1XkwuQHWt2P@ep-odd-heart-a1cvnfiw-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
```
Select: **Production**, **Preview**, **Development** (all three)

### 4. Redeploy to apply the env variable
```
vercel --prod
```

Your site is live! The first order placed will automatically create the `orders` table in Neon.

---

## Local development (optional)

Create a `.env.local` file in this folder:
```
DATABASE_URL=postgresql://neondb_owner:npg_x1XkwuQHWt2P@ep-odd-heart-a1cvnfiw-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
```

Then run:
```
vercel dev
```

This runs everything locally at `http://localhost:3000`.
