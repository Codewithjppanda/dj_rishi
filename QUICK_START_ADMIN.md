# 🎛️ Admin Panel Quick Start

## ⚡ In 3 Steps:

### 1️⃣ Get Uploadthing Keys (2 minutes)
```
1. Go to https://uploadthing.com
2. Sign up (free)
3. Create new app
4. Copy App ID & Secret
```

### 2️⃣ Add Environment Variables

Create `.env.local` file in project root:
```env
UPLOADTHING_SECRET=your_secret_key_here
UPLOADTHING_APP_ID=your_app_id_here
```

### 3️⃣ Access Admin Panel

**Local Development:**
```bash
npm run dev
```
Then visit: `http://localhost:3000/admin`

**Password:** `djrishi2024` (change in `app/admin/page.tsx`)

---

## 🎯 Features

✅ Upload multiple images at once  
✅ Organize by categories  
✅ Delete images  
✅ Cloud storage (images persist)  
✅ Auto-updates gallery  
✅ Password protected  

---

## 📤 Uploading Images

1. Login to `/admin`
2. Enter image title
3. Select category
4. Click to choose files
5. Upload!

Images appear on `/gallery` instantly!

---

## 🚀 Deploy to Vercel

**Important:** Add environment variables in Vercel:

1. Go to Vercel Dashboard → Your Project → Settings
2. Click "Environment Variables"
3. Add both:
   - `UPLOADTHING_SECRET`
   - `UPLOADTHING_APP_ID`
4. Redeploy

**Note:** File-based storage won't persist on Vercel deployments. For production, consider upgrading to a database solution (see ADMIN_SETUP.md for details).

---

## 🔐 Changing Admin Password

Edit `app/admin/page.tsx` line 23:
```typescript
const ADMIN_PASSWORD = 'your_new_password_here';
```

---

## 🎨 Adding Categories

Edit dropdown in `app/admin/page.tsx`:
```typescript
<option>Your New Category</option>
```

Also update `app/gallery/page.tsx` filters.

---

## 💰 Free Tier Limits

- 2GB storage
- 500MB bandwidth/month
- Unlimited uploads
- Perfect for portfolios!

---

## 🆘 Troubleshooting

**Can't upload?**
- Check environment variables are set
- Verify Uploadthing keys are correct
- Check browser console for errors

**Images not showing?**
- Clear browser cache
- Check `/data/gallery.json` exists
- Verify file permissions

**Password not working?**
- Clear browser localStorage
- Check password in code matches

---

## 📞 Need Help?

Check the detailed guide: `ADMIN_SETUP.md`

