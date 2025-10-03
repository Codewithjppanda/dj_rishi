# Admin Panel Setup Guide

## 🎯 What You Get

- **Password-protected admin panel** at `/admin`
- **Upload multiple images** at once
- **Manage gallery** (view, delete images)
- **Cloud storage** using Uploadthing (free tier: 2GB storage, 500MB/month bandwidth)
- **Dynamic gallery** that updates automatically

## 🚀 Setup Instructions

### 1. Get Uploadthing API Keys

1. Go to [https://uploadthing.com](https://uploadthing.com)
2. Sign up for a free account
3. Create a new app
4. Copy your **App ID** and **Secret Key**

### 2. Configure Environment Variables

1. Create a `.env.local` file in your project root:
   ```bash
   cp .env.example .env.local
   ```

2. Add your Uploadthing keys to `.env.local`:
   ```env
   UPLOADTHING_SECRET=your_secret_key_here
   UPLOADTHING_APP_ID=your_app_id_here
   ```

### 3. Set Admin Password

Edit `app/admin/page.tsx` and change the password:

```typescript
const ADMIN_PASSWORD = 'djrishi2024'; // Change this to your desired password
```

### 4. Deploy to Vercel

1. Add environment variables in Vercel dashboard:
   - Go to your project settings
   - Navigate to Environment Variables
   - Add `UPLOADTHING_SECRET` and `UPLOADTHING_APP_ID`

2. Redeploy your site

## 📱 How to Use

### Accessing Admin Panel

1. Go to `https://yourdomain.com/admin`
2. Enter your password
3. You're in!

### Uploading Images

1. Enter image title
2. Select category (Festivals, Live, Studio, Promo, Branding)
3. Click to select images (up to 10 at once, max 4MB each)
4. Click "Upload Images"
5. Images appear in gallery automatically!

### Managing Images

- Hover over any image to see title and category
- Click "Delete" to remove an image
- Images are stored in the cloud and won't disappear

### Giving Access to Others

Simply share:
- URL: `https://yourdomain.com/admin`
- Password: (the one you set in step 3)

## 🔒 Security Notes

- Current setup uses simple password protection
- For production with multiple users, consider:
  - Adding user accounts with NextAuth.js
  - Different permission levels
  - Activity logging

## 💡 Features

- ✅ Drag & drop file upload
- ✅ Multiple file upload
- ✅ Image preview before upload
- ✅ Category filtering
- ✅ Delete images
- ✅ Responsive design
- ✅ Cloud storage (images persist even after redeployment)

## 🆓 Free Tier Limits

Uploadthing free tier includes:
- 2GB total storage
- 500MB bandwidth/month
- Unlimited uploads
- Perfect for a DJ portfolio!

## 🎨 Customization

To add more categories, edit both files:
- `app/admin/page.tsx` - Admin panel dropdown
- `app/gallery/page.tsx` - Gallery filter buttons

