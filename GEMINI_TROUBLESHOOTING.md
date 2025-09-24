# 🔧 Gemini API Troubleshooting Guide

## Quick Fix Checklist ✅

### 1. **Get Your API Key** 
- Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
- Sign in with your Google account
- Click "Create API Key"
- Copy the generated key

### 2. **Set Environment Variable**
```bash
# Create .env file from template
cp .env.example .env

# Edit .env file and add your key:
GEMINI_API_KEY=your_actual_api_key_here
```

### 3. **Restart Development Server**
```bash
# Stop current server (Ctrl+C)
# Then restart:
npm run dev
```

## Common Issues & Solutions 🔍

### ❌ "Gemini API key is not set"
**Problem**: Environment variable not loaded
**Solutions**:
- ✅ Check if `.env` file exists in project root
- ✅ Verify `GEMINI_API_KEY=your_key` is in `.env`
- ✅ Restart development server after adding key
- ✅ Make sure `.env` is not in `.gitignore` locally

### ❌ "API_KEY_INVALID" Error
**Problem**: Invalid or expired API key
**Solutions**:
- ✅ Generate new API key from Google AI Studio
- ✅ Check for extra spaces/characters in `.env` file
- ✅ Ensure no quotes around the key value

### ❌ "QUOTA_EXCEEDED" Error
**Problem**: API usage limit reached
**Solutions**:
- ✅ Check your [quota usage](https://console.cloud.google.com/apis/api/generativelanguage.googleapis.com/quotas)
- ✅ Wait for quota reset (usually daily)
- ✅ Request quota increase if needed

### ❌ "PERMISSION_DENIED" Error
**Problem**: API key lacks permissions
**Solutions**:
- ✅ Ensure Generative AI API is enabled in Google Cloud Console
- ✅ Create a new API key with proper permissions
- ✅ Check if your Google account has access

### ❌ Empty AI Responses
**Problem**: API returns null/empty responses
**Solutions**:
- ✅ Check console for detailed error messages
- ✅ Verify API key is working with test script
- ✅ Try different expense descriptions

## Testing Tools 🧪

### 1. **Debug Console (Development Mode)**
- Run `npm run dev`
- Look for "🧪 Debug AI" button in the app
- Test different expense descriptions
- View real-time API responses

### 2. **Command Line Test**
```bash
# Test Gemini API directly
npm run test-gemini
```

### 3. **Browser Console**
- Open Developer Tools (F12)
- Check Console tab for error messages
- Look for detailed API error information

## Environment Setup Examples 📝

### Local Development (.env)
```env
GEMINI_API_KEY=AIzaSyD-9tSrke72PoupkJOSkQ...
```

### Vercel Deployment
```bash
# Via Vercel CLI
vercel env add GEMINI_API_KEY

# Or in Vercel Dashboard:
# Project Settings → Environment Variables
```

### Netlify Deployment
```bash
# Via Netlify CLI
netlify env:set GEMINI_API_KEY your_key_here

# Or in Netlify Dashboard:
# Site Settings → Environment Variables
```

### Railway Deployment
```bash
# Via Railway CLI
railway variables set GEMINI_API_KEY=your_key_here

# Or in Railway Dashboard:
# Project → Variables
```

## Verification Steps 🔍

### 1. **Check API Key Format**
```javascript
// Valid format (starts with AIza):
GEMINI_API_KEY=AIzaSyD-9tSrke72PoupkJOSkQ_example_key

// Invalid formats:
GEMINI_API_KEY="AIzaSy..."  // Remove quotes
GEMINI_API_KEY= AIzaSy...   // Remove space
```

### 2. **Test Environment Loading**
```bash
# In terminal:
node -e "require('dotenv').config(); console.log(process.env.GEMINI_API_KEY ? 'Found' : 'Missing')"
```

### 3. **Check Browser Network Tab**
- Open Developer Tools → Network
- Add an expense with description
- Look for requests to `generativelanguage.googleapis.com`
- Check response status and errors

## Fallback Options 🔄

If AI categorization isn't working:
- ✅ App continues to work normally
- ✅ Manual category selection available
- ✅ All other features unaffected
- ✅ Categories default to "Other"

## Need More Help? 💬

1. **Check Console Logs**: Detailed errors appear in browser console
2. **Review Network Requests**: See actual API calls in Network tab
3. **Test Different Descriptions**: Try various expense descriptions
4. **Verify API Status**: Check [Google AI Studio status](https://status.cloud.google.com/)

## API Documentation 📚

- [Google AI Gemini API Docs](https://ai.google.dev/docs)
- [API Key Management](https://console.cloud.google.com/apis/credentials)
- [Quota & Billing](https://console.cloud.google.com/apis/api/generativelanguage.googleapis.com/quotas)

---

**💡 Pro Tip**: Use the debug console in development mode to quickly test and troubleshoot API issues!