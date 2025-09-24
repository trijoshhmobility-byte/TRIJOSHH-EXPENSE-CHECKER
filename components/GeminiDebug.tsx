import React, { useState } from 'react';
import { suggestCategory } from '../services/geminiService';
import { ExpenseCategory } from '../types';

interface GeminiDebugProps {
  isVisible: boolean;
  onClose: () => void;
}

const GeminiDebug: React.FC<GeminiDebugProps> = ({ isVisible, onClose }) => {
  const [testDescription, setTestDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string>('');

  const testExamples = [
    'Office printer paper and ink cartridges',
    'Monthly salary for John Doe', 
    'Laptop repair service',
    'Car engine spare parts',
    'Grocery shopping for office pantry'
  ];

  const handleTest = async (description: string) => {
    setIsLoading(true);
    setResult('');
    setError('');
    
    try {
      console.log(`🧪 Testing Gemini API with: "${description}"`);
      const category = await suggestCategory(description);
      
      if (category) {
        setResult(`✅ AI suggested: "${category}"`);
        console.log(`✅ Gemini API returned: ${category}`);
      } else {
        setResult('⚠️ AI returned null (API key missing or API error)');
        console.warn('⚠️ Gemini API returned null');
      }
    } catch (err: any) {
      const errorMsg = err.message || 'Unknown error';
      setError(`❌ Error: ${errorMsg}`);
      console.error('❌ Gemini API test error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCustomTest = () => {
    if (testDescription.trim()) {
      handleTest(testDescription);
    }
  };

  if (!isVisible) return null;

  const hasApiKey = !!(process.env.GEMINI_API_KEY || process.env.API_KEY);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
      <div className="bg-surface-card rounded-2xl shadow-2xl p-6 w-full max-w-2xl m-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-text-primary">🧪 Gemini API Debug Console</h2>
          <button onClick={onClose} className="text-text-tertiary hover:text-text-primary">
            ✕
          </button>
        </div>

        <div className="space-y-4">
          {/* API Key Status */}
          <div className="p-3 rounded-lg bg-surface-input">
            <h3 className="font-semibold text-text-primary mb-2">API Key Status</h3>
            <div className="flex items-center gap-2">
              {hasApiKey ? (
                <>
                  <span className="text-green-400">✅</span>
                  <span className="text-text-secondary">GEMINI_API_KEY is set</span>
                </>
              ) : (
                <>
                  <span className="text-red-400">❌</span>
                  <span className="text-text-secondary">GEMINI_API_KEY is missing</span>
                  <div className="text-sm text-text-tertiary mt-1">
                    Set GEMINI_API_KEY in your .env file
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Quick Tests */}
          <div>
            <h3 className="font-semibold text-text-primary mb-2">Quick Tests</h3>
            <div className="grid gap-2">
              {testExamples.map((example, index) => (
                <button
                  key={index}
                  onClick={() => handleTest(example)}
                  disabled={isLoading}
                  className="text-left p-3 bg-surface-input hover:bg-gray-600 rounded-lg text-text-secondary transition-colors disabled:opacity-50"
                >
                  {example}
                </button>
              ))}
            </div>
          </div>

          {/* Custom Test */}
          <div>
            <h3 className="font-semibold text-text-primary mb-2">Custom Test</h3>
            <div className="flex gap-2">
              <input
                type="text"
                value={testDescription}
                onChange={(e) => setTestDescription(e.target.value)}
                placeholder="Enter expense description..."
                className="flex-1 bg-surface-input border border-gray-600 rounded-lg px-3 py-2 text-text-primary"
                disabled={isLoading}
              />
              <button
                onClick={handleCustomTest}
                disabled={isLoading || !testDescription.trim()}
                className="bg-brand-primary hover:bg-brand-secondary text-white px-4 py-2 rounded-lg disabled:opacity-50"
              >
                {isLoading ? '⏳' : 'Test'}
              </button>
            </div>
          </div>

          {/* Results */}
          {(result || error) && (
            <div className="p-3 rounded-lg bg-surface-input">
              <h3 className="font-semibold text-text-primary mb-2">Result</h3>
              {result && <div className="text-green-400 mb-2">{result}</div>}
              {error && <div className="text-red-400 mb-2">{error}</div>}
            </div>
          )}

          {/* Instructions */}
          <div className="p-3 rounded-lg bg-surface-input text-sm">
            <h3 className="font-semibold text-text-primary mb-2">💡 Instructions</h3>
            <ul className="text-text-secondary space-y-1">
              <li>1. Make sure you have a valid GEMINI_API_KEY set</li>
              <li>2. Get your API key from <a href="https://makersuite.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">Google AI Studio</a></li>
              <li>3. Copy .env.example to .env and add your key</li>
              <li>4. Restart the development server after adding the key</li>
              <li>5. Check browser console for detailed error messages</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeminiDebug;