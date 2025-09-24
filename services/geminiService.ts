
import { GoogleGenAI } from "@google/genai";
import { ExpenseCategory } from '../types';
import { CATEGORIES } from '../constants';

// Get Gemini API key from environment variables
const API_KEY = process.env.GEMINI_API_KEY || process.env.API_KEY;

if (!API_KEY) {
  console.warn("⚠️ Gemini API key is not set. AI categorization features will be disabled.");
  console.log("💡 To enable AI features, set GEMINI_API_KEY environment variable.");
}

const ai = API_KEY ? new GoogleGenAI({ apiKey: API_KEY }) : null;

export const suggestCategory = async (description: string): Promise<ExpenseCategory | null> => {
  if (!API_KEY || !ai) {
    console.warn('⚠️ Gemini API not available. Using default category.');
    return null;
  }

  const validCategories = CATEGORIES.join(', ');
  const prompt = `Based on the expense description "${description}", what is the most appropriate category? Please choose one from the following list: ${validCategories}. Respond with only the category name, exactly as it appears in the list.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: [{ role: 'user', parts: [{ text: prompt }] }]
    });

    const suggestedCategory = response.text?.trim();
    
    if (!suggestedCategory) {
      console.warn('⚠️ Gemini returned empty response.');
      return null;
    }
    
    // Validate if the suggested category is one of our predefined enum values
    if (Object.values(ExpenseCategory).includes(suggestedCategory as ExpenseCategory)) {
      console.log(`🤖 AI suggested category: ${suggestedCategory}`);
      return suggestedCategory as ExpenseCategory;
    }
    
    console.warn(`⚠️ Gemini suggested an invalid category: "${suggestedCategory}". Available categories: ${validCategories}`);
    return null;
  } catch (error) {
    console.error('❌ Error calling Gemini API:', error);
    
    // Provide more specific error information
    if (error instanceof Error) {
      if (error.message.includes('API_KEY')) {
        console.error('🔑 Please check your GEMINI_API_KEY environment variable.');
      } else if (error.message.includes('quota')) {
        console.error('📊 API quota exceeded. Please check your Gemini API usage.');
      } else if (error.message.includes('permission')) {
        console.error('🙅 Permission denied. Please verify your API key has proper permissions.');
      }
    }
    
    return null;
  }
};
