#!/bin/bash

# TRIJOSHH Expense Tracker - Deployment Script
# This script provides automated deployment options for various platforms

set -e

echo "🚀 TRIJOSHH Expense Tracker Deployment Script"
echo "=============================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js and try again."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm and try again."
    exit 1
fi

echo "✅ Node.js and npm are available"

# Function to build the project
build_project() {
    echo "📦 Building the project..."
    npm ci
    npm run build
    echo "✅ Build completed successfully!"
}

# Function to deploy to Vercel
deploy_vercel() {
    echo "🚀 Deploying to Vercel..."
    
    if ! command -v vercel &> /dev/null; then
        echo "📥 Installing Vercel CLI..."
        npm install -g vercel
    fi
    
    echo "🎯 Starting Vercel deployment..."
    vercel --prod
    echo "✅ Vercel deployment completed!"
}

# Function to deploy to Netlify
deploy_netlify() {
    echo "🚀 Deploying to Netlify..."
    
    if ! command -v netlify &> /dev/null; then
        echo "📥 Installing Netlify CLI..."
        npm install -g netlify-cli
    fi
    
    echo "🎯 Starting Netlify deployment..."
    netlify deploy --prod --dir=dist
    echo "✅ Netlify deployment completed!"
}

# Function to deploy to Railway
deploy_railway() {
    echo "🚀 Deploying to Railway..."
    
    if ! command -v railway &> /dev/null; then
        echo "📥 Installing Railway CLI..."
        npm install -g @railway/cli
    fi
    
    echo "🎯 Starting Railway deployment..."
    railway login
    railway deploy
    echo "✅ Railway deployment completed!"
}

# Function to build Docker image
build_docker() {
    echo "🐳 Building Docker image..."
    
    if ! command -v docker &> /dev/null; then
        echo "❌ Docker is not installed. Please install Docker and try again."
        exit 1
    fi
    
    docker build -t trijoshh-expense-tracker .
    echo "✅ Docker image built successfully!"
    echo "💡 To run: docker run -p 80:80 trijoshh-expense-tracker"
}

# Function to create GitHub Pages deployment
deploy_github_pages() {
    echo "📄 Preparing for GitHub Pages deployment..."
    
    # Create gh-pages branch and copy dist files
    git checkout -b gh-pages 2>/dev/null || git checkout gh-pages
    git rm -rf . 2>/dev/null || true
    cp -r dist/* .
    git add .
    git commit -m "Deploy to GitHub Pages"
    git push origin gh-pages
    git checkout main
    
    echo "✅ GitHub Pages deployment prepared!"
    echo "💡 Enable GitHub Pages in your repository settings"
}

# Main menu
show_menu() {
    echo ""
    echo "Choose deployment option:"
    echo "1) Build project only"
    echo "2) Deploy to Vercel"
    echo "3) Deploy to Netlify"
    echo "4) Deploy to Railway"
    echo "5) Build Docker image"
    echo "6) Prepare GitHub Pages deployment"
    echo "7) Build and serve locally"
    echo "8) Exit"
    echo ""
}

# Main loop
while true; do
    show_menu
    read -p "Enter your choice (1-8): " choice
    
    case $choice in
        1)
            build_project
            ;;
        2)
            build_project
            deploy_vercel
            ;;
        3)
            build_project
            deploy_netlify
            ;;
        4)
            deploy_railway
            ;;
        5)
            build_project
            build_docker
            ;;
        6)
            build_project
            deploy_github_pages
            ;;
        7)
            build_project
            echo "🌐 Starting local server..."
            npm run preview
            ;;
        8)
            echo "👋 Goodbye!"
            exit 0
            ;;
        *)
            echo "❌ Invalid option. Please choose 1-8."
            ;;
    esac
    
    echo ""
    read -p "Press Enter to continue..."
done