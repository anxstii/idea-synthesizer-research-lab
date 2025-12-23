
import { GoogleGenAI, Type } from "@google/genai";
import { GenerationParams, ResearchIdea } from "../types";

// Always use the API_KEY directly from process.env.API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateResearchIdeas = async (params: GenerationParams): Promise<ResearchIdea[]> => {
  const { fields_of_interest, idea_count, creativity_level, activeFrameworks } = params;
  
  let temperature = 0.5;
  let thinkingBudget = 0;

  if (creativity_level === 'conservative') {
    temperature = 0.3;
  } else if (creativity_level === 'balanced') {
    temperature = 0.7;
    // Set a moderate thinking budget for balanced results
    thinkingBudget = 4000;
  } else {
    temperature = 1.0;
    // Maximize thinking for radical, complex synthesis
    thinkingBudget = 16000;
  }

  const frameworksInstruction = activeFrameworks && activeFrameworks.length > 0 
    ? `Apply the following intellectual frameworks/lenses to the generation: ${activeFrameworks.join(', ')}.`
    : "";

  const systemInstruction = `
    You are a world-class Interdisciplinary Research Architect. 
    Your task is to generate novel, academic research ideas that integrate multiple disparate fields.
    
    GUIDELINES:
    1. Integration: Each idea MUST synthesize elements from ALL provided fields.
    2. Focus: Ideas must be research-oriented (e.g., investigating a phenomenon), not just commercial product ideas.
    3. Novelty: Avoid the obvious. Look for deep patterns, unexpected metaphors, and future-facing methodologies.
    4. Plausibility: While radical, the ideas must be intellectually rigorous and academically defensible.
    5. Tone: Intellectual, playful, curious, and exploratory.
    ${frameworksInstruction}
  `;

  const prompt = `
    Generate ${idea_count} unique interdisciplinary research ideas based on these fields: ${fields_of_interest.join(', ')}.
    
    The creativity level is set to: ${creativity_level}. 
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction,
        temperature,
        thinkingConfig: { thinkingBudget },
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            research_ideas: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  core_question: { type: Type.STRING },
                  concept_overview: { type: Type.STRING },
                  why_it_matters: { type: Type.STRING },
                  possible_methods: { 
                    type: Type.ARRAY, 
                    items: { type: Type.STRING } 
                  },
                  related_disciplines: { 
                    type: Type.ARRAY, 
                    items: { type: Type.STRING } 
                  },
                },
                required: ["title", "core_question", "concept_overview", "why_it_matters", "possible_methods", "related_disciplines"]
              }
            }
          }
        },
      },
    });

    // Use .text property directly as per guidelines
    const text = response.text || '';
    const result = JSON.parse(text);
    
    // Add IDs and timestamps
    return (result.research_ideas || []).map((idea: any) => ({
      ...idea,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: Date.now()
    }));
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to generate research ideas.");
  }
};
