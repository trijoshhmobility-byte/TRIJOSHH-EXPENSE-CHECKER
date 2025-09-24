#!/usr/bin/env node
/**
 * TRIJOSHH Expense Tracker - Gemini API Test Script
 * This script tests the Gemini API integration
 * 
 * Usage: node test-gemini.js
 * Make sure to set GEMINI_API_KEY environment variable first
 */

import { GoogleGenAI } from "@google/genai";
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const API_KEY = process.env.GEMINI_API_KEY || process.env.API_KEY;

console.log('🧪 TRIJOSHH Expense Tracker - Gemini API Test');
console.log('==============================================');

if (!API_KEY) {
  console.error('❌ GEMINI_API_KEY not found in environment variables');
  console.log('💡 Please set GEMINI_API_KEY in your .env file or environment');
  console.log('📝 Copy .env.example to .env and add your API key');
  process.exit(1);
}

console.log('✅ API Key found');
console.log('🔑 API Key:', API_KEY.substring(0, 10) + '...' + API_KEY.substring(API_KEY.length - 4));

const ai = new GoogleGenAI({ apiKey: API_KEY });

const categories = [
  'Material', 'Equipment', 'Service', 'Spare Parts', 
  'Salary', 'Stationary', 'Office Equipment', 'Other'
];

const testDescriptions = [
  'Office printer paper and ink cartridges',
  'Monthly salary for John Doe',
  'Laptop repair service',
  'Car engine spare parts',
  'Grocery shopping for office pantry'
];

async function testGeminiAPI() {
  console.log('\n🚀 Testing Gemini API...');
  
  for (const description of testDescriptions) {
    console.log(`\n📝 Testing: "${description}"`);
    
    const validCategories = categories.join(', ');
    const prompt = `Based on the expense description "${description}", what is the most appropriate category? Please choose one from the following list: ${validCategories}. Respond with only the category name, exactly as it appears in the list.`;
    
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-1.5-flash',
        contents: [{ role: 'user', parts: [{ text: prompt }] }]
      });

      const suggestedCategory = response.text?.trim();
      
      if (suggestedCategory) {
        if (categories.includes(suggestedCategory)) {
          console.log(`✅ AI Response: "${suggestedCategory}" (Valid)`);
        } else {
          console.log(`⚠️  AI Response: "${suggestedCategory}" (Invalid - not in categories list)`);
        }
      } else {
        console.log('❌ Empty response from AI');
      }
      
    } catch (error) {
      console.error('❌ Error:', error.message);
      
      if (error.message.includes('API_KEY')) {
        console.error('🔑 API Key issue - please verify your GEMINI_API_KEY');
      } else if (error.message.includes('quota')) {
        console.error('📊 API quota exceeded');
      } else if (error.message.includes('permission')) {
        console.error('🚫 Permission denied - check API key permissions');
      }
    }
    
    // Small delay between requests
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
}

async function main() {
  try {
    await testGeminiAPI();
    console.log('\n✅ Gemini API test completed!');
    console.log('💡 If you see valid responses above, your API integration is working correctly.');
  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    process.exit(1);
  }
}

main();