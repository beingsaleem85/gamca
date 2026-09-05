# Gamca Centre - Shared Hosting & Supabase Deployment Guide

This project is built using **Next.js 15+ (App Router)** and is optimized to run on **Shared Hosting (cPanel, Hostinger, Namecheap, GoDaddy)** as well as **Node.js Cloud Hosts (Vercel, cPanel Node Selector)**.

---

## 1. How to Deploy on Shared Hosting (cPanel / Hostinger / Namecheap)

### Option A: Static HTML + PHP Submission (Recommended for Standard Shared Hosting)
1. Open `next.config.ts` and set `output: 'export'`:
   ```ts
   const nextConfig: NextConfig = {
     output: 'export',
     images: { unoptimized: true }
   };
   ```
2. Run the build command:
   ```bash
   npm run build
   ```
3. This creates an `out` folder containing pure HTML, CSS, and JS files.
4. Upload all contents of the `out` folder into your shared hosting `public_html` directory via cPanel File Manager or FTP.
5. Upload `public/api/submit-token-request.php` to your `public_html/api/submit-token-request.php`.
6. Ensure `public_html/api/uploads/` directory has write permissions (`755` or `777`).
7. Form submissions will automatically process through PHP `mail()` and email requests to `gamcacentre9@gmail.com` with screenshot attachments!

---

### Option B: Node.js Selector on cPanel (Vercel / Node Hosting)
1. In cPanel, go to **Setup Node.js App**.
2. Select Node version 18 or 20+.
3. Upload project files, run `npm install`, and set Application Startup File to `node_modules/next/dist/bin/next` with Application Mode `production`.
4. Configure `.env.local` variables:
   ```env
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=gamcacentre9@gmail.com
   EMAIL_PASSWORD=your_app_password
   EMAIL_TO=gamcacentre9@gmail.com
   ```

---

## 2. Supabase Setup (Database Integration)

1. Log into your [Supabase Dashboard](https://app.supabase.com) and create a new project.
2. Go to the **SQL Editor** tab and paste the contents of `supabase_schema.sql` (found in project root).
3. Click **Run** to automatically generate the `medical_token_requests` table and storage bucket.
4. Copy your **Project URL** and **Anon / Service Role Key** into `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=xxxx
   SUPABASE_SERVICE_ROLE_KEY=xxxx
   ```
5. Submitted token applications will now automatically save into your Supabase database table!

---

## 3. Central Configuration (`src/config/site.ts`)

To update business contact information, payment account numbers, or bank details in one central place:
Open `src/config/site.ts` and modify:
- `contact.whatsapp`
- `contact.email`
- `paymentInfo.accountName`
- `paymentInfo.accountNumber`
- `paymentInfo.iban`
- `paymentInfo.qrImageSrc` (Replace `/public/payment-qr.png` with your QR code image)
