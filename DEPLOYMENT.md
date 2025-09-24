# 🚀 TRIJOSHH Expense Tracker - Quick Deployment Guide

## Prerequisites
- Node.js 18+ installed
- Git repository (for version control)
- Environment variable: `GEMINI_API_KEY`

## One-Click Deployment Options

### 1. **Vercel** (Recommended - Free & Easy)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone)

**Manual Steps:**
```bash
npm install -g vercel
npm run build
vercel --prod
```

### 2. **Netlify** (Great Alternative)
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy)

**Manual Steps:**
```bash
npm install -g netlify-cli
npm run build
netlify deploy --prod --dir=dist
```

### 3. **Railway** (Full-Stack Platform)
```bash
npm install -g @railway/cli
railway login
railway deploy
```

## Quick Deployment Script

We've included an interactive deployment script:

```bash
./deploy.sh
```

This script provides options for:
- Building the project
- Deploying to Vercel, Netlify, or Railway
- Building Docker images
- Preparing GitHub Pages deployment

## Environment Variables Setup

### Vercel
1. Go to your Vercel dashboard
2. Select your project → Settings → Environment Variables
3. Add: `GEMINI_API_KEY` = `your_api_key_here`

### Netlify
1. Go to Site settings → Environment variables
2. Add: `GEMINI_API_KEY` = `your_api_key_here`

### Railway
1. Go to your project dashboard
2. Variables tab → Add variable
3. Add: `GEMINI_API_KEY` = `your_api_key_here`

## Domain Setup

### Custom Domain on Vercel
```bash
vercel domains add yourdomain.com
vercel domains verify yourdomain.com
```

### Custom Domain on Netlify
1. Go to Domain settings in Netlify dashboard
2. Add custom domain
3. Configure DNS records as instructed

## Docker Deployment

### Build and Run Locally
```bash
docker build -t trijoshh-expense-tracker .
docker run -p 80:80 -e GEMINI_API_KEY=your_key trijoshh-expense-tracker
```

### Deploy to Docker Hub
```bash
docker tag trijoshh-expense-tracker your-username/trijoshh-expense-tracker
docker push your-username/trijoshh-expense-tracker
```

## GitHub Pages

1. Build: `npm run build`
2. Create `gh-pages` branch: `git checkout -b gh-pages`
3. Copy dist files to root
4. Push: `git push origin gh-pages`
5. Enable GitHub Pages in repository settings

## SSL & Security

All modern deployment platforms (Vercel, Netlify, Railway) provide:
- ✅ Free SSL certificates
- ✅ CDN (Content Delivery Network)
- ✅ DDoS protection
- ✅ Automatic deployments from Git

## Performance Optimization

The app is optimized with:
- ✅ Code splitting
- ✅ Asset compression
- ✅ Caching headers
- ✅ Minified bundles

## Monitoring & Analytics

Consider adding:
- Google Analytics
- Sentry for error tracking
- LogRocket for user sessions

## Backup Strategy

- Repository: Git version control
- User data: Local storage (frontend-only)
- For production: Implement database backup

---

**Need help?** Check the main README.md or create an issue in the repository.