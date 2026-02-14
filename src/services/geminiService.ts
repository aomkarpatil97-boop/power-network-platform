
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getSmartRecommendation(query: string, userLocation?: { lat: number, lng: number }) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `User is asking about EV charging or servicing: ${query}`,
      config: {
        systemInstruction: "You are the powerNest AI Assistant. You help users find EV chargers, troubleshoot vehicle issues, and suggest maintenance. Always be helpful, concise, and focused on EV topics. If asked about charging locations, provide specific types (Level 2, DC Fast) and mention price trends.",
        tools: [{ googleSearch: {} }],
      },
    });

    return {
      text: response.text,
      grounding: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
    };
  } catch (error) {
    console.error("Gemini API Error:", error);
    return { text: "I'm having trouble connecting to my brain right now. Please try again later.", grounding: [] };
  }
}
