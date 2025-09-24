# 🚀 Vercel Deployment Guide - TRIJOSHH Expense Tracker

## Quick Fix for "Secret does not exist" Error

If you're seeing the error: `Environment Variable "GEMINI_API_KEY" references Secret "gemini_api_key", which does not exist.`

Follow these steps to fix it immediately:

## 🔧 Solution 1: Set Environment Variable in Vercel Dashboard (Recommended)

### Step 1: Access Vercel Dashboard
1. Go to [vercel.com](https://vercel.com) and log in
2. Navigate to your project: `TRIJOSHH-EXPENSE-CHECKER`
3. Click on **Settings** tab

### Step 2: Add Environment Variable
1. In the left sidebar, click **Environment Variables**
2. Click **Add New** button
3. Fill in the details:
   ```
   Name: GEMINI_API_KEY
   Value: [paste your actual Gemini API key here]
   Environments: ☑️ Production ☑️ Preview ☑️ Development
   ```
4. Click **Save**

### Step 3: Redeploy
1. Go to **Deployments** tab
2. Find the latest deployment
3. Click the **⋯** menu and select **Redeploy**
4. Or trigger a new deployment by pushing to GitHub

## 🔧 Solution 2: Using Vercel CLI

```bash
# Install Vercel CLI (if not already installed)
npm i -g vercel

# Set environment variable
vercel env add GEMINI_API_KEY

# When prompted:
# - Enter your Gemini API key
# - Select all environments (Production, Preview, Development)

# Pull environment variables to verify
vercel env pull

# Redeploy
vercel --prod
```

## 🔧 Solution 3: Using GitHub Integration

### Auto-Deploy from GitHub:
1. **Connect Repository** to Vercel:
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your GitHub repository: `trijoshhmobility-byte/TRIJOSHH-EXPENSE-CHECKER`
   - Follow the import wizard

2. **Configure Environment Variables**:
   - During import, or later in Project Settings
   - Add `GEMINI_API_KEY` with your API key

3. **Automatic Deployments**:
   - Every push to `main` branch triggers deployment
   - Preview deployments for pull requests

## 📋 Complete Deployment Checklist

### ✅ Prerequisites
- [ ] GitHub repository with latest code
- [ ] Valid Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
- [ ] Vercel account connected to GitHub

### ✅ Environment Setup
- [ ] `GEMINI_API_KEY` set in Vercel dashboard
- [ ] Environment variable applied to all environments
- [ ] No references to secrets in `vercel.json`

### ✅ Build Configuration
- [ ] `package.json` has correct build script
- [ ] `vercel.json` configured for static build
- [ ] `dist` directory specified as output

### ✅ Deployment Verification
- [ ] Build completes successfully
- [ ] App loads without errors
- [ ] Gemini AI categorization works (test with expense form)
- [ ] All routes work correctly

## 🐛 Troubleshooting Common Issues

### Error: "Build failed"
```bash
# Check build logs in Vercel dashboard
# Common fixes:
1. Ensure all dependencies are in package.json
2. Check TypeScript errors
3. Verify environment variables are set
```

### Error: "Function execution timeout"
```bash
# For Vite static builds, this shouldn't happen
# If it does, contact Vercel support
```

### Error: "GEMINI_API_KEY is not defined"
```bash
# Check environment variables in Vercel dashboard
# Ensure the variable name matches exactly: GEMINI_API_KEY
# Redeploy after adding the variable
```

### Error: "API quota exceeded"
```bash
# Check Google AI Studio quota
# Monitor API usage in Google Cloud Console
```

## 🌐 Custom Domain Setup

### Add Custom Domain:
1. **In Vercel Dashboard**:
   - Go to Project Settings → Domains
   - Add your domain: `yourdomain.com`
   - Follow DNS configuration instructions

2. **DNS Configuration**:
   ```
   Type: CNAME
   Name: www (or @)
   Value: cname.vercel-dns.com
   ```

3. **SSL Certificate**:
   - Automatically provided by Vercel
   - Usually active within 24 hours

## 📊 Performance Optimization

### Automatic Optimizations by Vercel:
- ✅ CDN (Content Delivery Network)
- ✅ Gzip compression
- ✅ Image optimization
- ✅ Edge caching
- ✅ SSL/TLS encryption

### Build Optimizations:
- ✅ Tree shaking (unused code removal)
- ✅ Code splitting
- ✅ Asset minification
- ✅ Modern JS for modern browsers

## 🔄 CI/CD Pipeline

### Automatic Workflow:
```
GitHub Push → Vercel Build → Deploy → Live Site
```

### Branch Strategy:
- `main` branch → Production deployment
- Other branches → Preview deployments
- Pull requests → Preview with comments

## 📱 Monitoring & Analytics

### Built-in Vercel Analytics:
1. Go to Project → Analytics
2. View page views, performance metrics
3. Monitor Core Web Vitals

### Optional: Add Google Analytics
```html
<!-- Add to index.html if needed -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
```

## 🆘 Need Help?

### Resources:
- [Vercel Documentation](https://vercel.com/docs)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html#vercel)
- [React on Vercel](https://vercel.com/guides/deploying-react-with-vercel)

### Support:
- Vercel Community: [github.com/vercel/vercel/discussions](https://github.com/vercel/vercel/discussions)
- Project Issues: Create issue in GitHub repository

---

## 🎉 Success!

After following this guide, your TRIJOSHH Expense Tracker should be:
- ✅ Successfully deployed on Vercel
- ✅ Accessible via your Vercel URL
- ✅ Working with Gemini AI categorization
- ✅ Automatically deploying on Git pushes

**Your app will be available at**: `https://your-project-name.vercel.app`

## 🔗 Quick Links

- **Vercel Dashboard**: [vercel.com/dashboard](https://vercel.com/dashboard)
- **GitHub Repository**: [github.com/trijoshhmobility-byte/TRIJOSHH-EXPENSE-CHECKER](https://github.com/trijoshhmobility-byte/TRIJOSHH-EXPENSE-CHECKER)
- **Google AI Studio**: [makersuite.google.com](https://makersuite.google.com/app/apikey)