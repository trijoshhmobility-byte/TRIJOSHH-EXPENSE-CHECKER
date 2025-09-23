
import { GoogleGenAI } from "@google/genai";
import { ExpenseCategory } from '../types';
import { CATEGORIES } from '../constants';

// Assume process.env.API_KEY is configured in the environment
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // This is a placeholder for a more robust error handling/logging mechanism
  console.error("Gemini API key is not set. AI features will be disabled.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const suggestCategory = async (description: string): Promise<ExpenseCategory | null> => {
  if (!API_KEY) return null;

  const validCategories = CATEGORIES.join(', ');
  const prompt = `Based on the expense description "${description}", what is the most appropriate category? Please choose one from the following list: ${validCategories}. Respond with only the category name, exactly as it appears in the list.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        // Disable thinking for faster, more direct responses
        thinkingConfig: { thinkingBudget: 0 }
      }
    });

    const suggestedCategory = response.text.trim();
    
    // Validate if the suggested category is one of our predefined enum values
    if (Object.values(ExpenseCategory).includes(suggestedCategory as ExpenseCategory)) {
      return suggestedCategory as ExpenseCategory;
    }
    console.warn(`Gemini suggested an invalid category: "${suggestedCategory}"`);
    return null;
  } catch (error) {
    console.error('Error suggesting category from Gemini API:', error);
    return null;
  }
};
