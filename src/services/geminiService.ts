// Gemini API Service for intelligent chat responses
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
  }>;
}

export const geminiService = {
  async generateResponse(userMessage: string, context: string): Promise<string | null> {
    if (!GEMINI_API_KEY) {
      console.warn('Gemini API key not found. Using fallback responses.');
      return null;
    }

    try {
      const prompt = `
You are a helpful campus assistant for Pagbilao National High School. Your role is to help students, parents, and visitors navigate the school and find information about faculty, facilities, and services.

CONTEXT ABOUT THE SCHOOL:
${context}

SCHOOL DATA:
- Principal: ELMER C. RAVINA (Principal II)
- Location: Pagbilao, Quezon Province
- Operating Hours: Monday-Friday 7:00 AM - 5:00 PM, Saturday 7:00 AM - 12:00 PM, Sunday Closed
- Main Buildings: DepEd Building 4, Covered Court, Open Court, Car Park, Gulayan Area
- Faculty Available: Principal, Math Head, Science Teacher, English Teacher, PE Teacher, Filipino Teacher, ICT Coordinator, Guidance Counselor

GUIDELINES:
1. Be friendly, helpful, and professional
2. Provide accurate information based on the context provided
3. If you don't know something, admit it and suggest alternatives
4. Keep responses concise but informative
5. Use emojis to make responses more engaging
6. If asked about faculty not in the context, suggest asking about available faculty
7. For directions, guide users to use the directions form for specific routes
8. Always maintain a helpful and encouraging tone

USER MESSAGE: "${userMessage}"

Provide a helpful response based on the context and guidelines above:
`;

      const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 500,
          }
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: GeminiResponse = await response.json();
      
      if (data.candidates && data.candidates.length > 0) {
        return data.candidates[0].content.parts[0].text;
      }
      
      return null;
    } catch (error) {
      console.error('Gemini API error:', error);
      return null;
    }
  },

  isConfigured(): boolean {
    return !!GEMINI_API_KEY;
  }
};
