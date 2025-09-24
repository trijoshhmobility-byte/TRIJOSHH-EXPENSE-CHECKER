# TRIJOSHH Expense Tracker

A modern, feature-rich expense tracking application built with React, TypeScript, and Vite. Track your expenses with smart categorization powered by Google's Gemini AI.

## ✨ Features

- **User Authentication**: Secure login/signup system with local storage
- **Smart Categorization**: AI-powered expense category suggestions using Gemini AI
- **Interactive Charts**: Visual expense breakdown with Recharts
- **Export Functionality**: Export expenses to CSV format
- **Responsive Design**: Beautiful dark theme with Tailwind CSS
- **Real-time Updates**: Instant expense tracking and calculations
- **Expense Management**: Add, edit, delete, and sort expenses
- **Multiple Categories**: Predefined categories for business expenses

## 🚀 Technologies Used

- **Frontend**: React 19, TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **AI Integration**: Google Gemini AI
- **Icons**: Custom SVG components

## 📦 Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd trijoshh-expense-tracker
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory:
```env
GEMINI_API_KEY=your_gemini_api_key_here
```

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173`

## 🏗️ Build & Deploy

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Serve with Static Server
```bash
npm start
```

## 🚀 Deployment Options

### 1. Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
```

### 2. Netlify
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build and deploy
npm run build
netlify deploy --prod --dir=dist
```

### 3. GitHub Pages
1. Build the project: `npm run build`
2. Push the `dist` folder to a `gh-pages` branch
3. Enable GitHub Pages in repository settings

### 4. Railway
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway deploy
```

## 🔧 Configuration

### Environment Variables
- `GEMINI_API_KEY`: Your Google Gemini AI API key for smart categorization

### Customization
- **Categories**: Edit `types.ts` and `constants.ts` to modify expense categories
- **Colors**: Update Tailwind config in `index.html` for theme customization
- **Icons**: Add new SVG icons in `components/icons/` directory

## 📱 Usage

1. **Sign Up/Login**: Create an account or log in to start tracking
2. **Add Expenses**: Click "Add Expense" to record new expenses
3. **Smart Categories**: AI automatically suggests categories based on description
4. **View Analytics**: Check the pie chart for expense breakdown
5. **Export Data**: Download your expenses as CSV for external analysis
6. **Manage Expenses**: Edit or delete existing expenses as needed

## 🛡️ Security Notes

- This is a frontend-only demo application
- User authentication uses localStorage (not suitable for production)
- For production use, implement proper backend authentication
- Never expose API keys in frontend code

## 📊 Features Overview

### Expense Categories
- Material
- Equipment
- Service
- Spare Parts
- Salary
- Stationary
- Office Equipment
- Other

### Data Export
- CSV export functionality
- Date-based filtering
- Category-wise breakdown

### User Experience
- Dark theme optimized for extended use
- Responsive design for all devices
- Loading states and error handling
- Smooth animations and transitions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Google Gemini AI for intelligent categorization
- Recharts for beautiful data visualization
- Tailwind CSS for styling framework
- React team for the amazing framework

## 📞 Support

For support, email support@trijoshh.com or create an issue in the repository.

---

**Built with ❤️ by TRIJOSHH**