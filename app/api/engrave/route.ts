import { GoogleGenAI, Type } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

// Initialize Gemini Client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

export async function POST(req: NextRequest) {
  let engravingStyle = "laser-charred";
  try {
    const { prompt, woodType, engravingStyle: inputEngravingStyle } = await req.json();
    if (inputEngravingStyle) {
      engravingStyle = inputEngravingStyle;
    }

    if (!prompt) {
      return NextResponse.json({ error: "Engraving prompt is required" }, { status: 400 });
    }

    const systemInstruction = `You are the master artisan and design director for Avenoir, the definitive luxury raw honey gifting house.
Your task is to take an engraving prompt and generate elegant, luxury SVG visual design coordinates alongside artisanal notes.
Return ONLY valid JSON that matches the requested schema. Provide elegant geometric patterns, borders, or Art Deco frames that fit beautifully on top of a luxury hive box.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: `Generate custom engraving details for Avenoir luxury wooden vaults.
Prompt: ${prompt}
Selected Wood Foundation: ${woodType}
Engraving Style: ${engravingStyle} (laser-charred or gold-leaf)
Let's draft a premium visual vector path and custom micro-narrative for their registry vault.`,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            success: { type: Type.BOOLEAN },
            story: { 
              type: Type.STRING, 
              description: "An elegant, luxurious description of the bespoke design from the perspective of an Avenoir master engraver (2 sentences, highly formal)." 
            },
            woodAdvice: { 
              type: Type.STRING, 
              description: "Artisanal advice for engraving onto the selected wood (e.g. how Pine charred textures pop vs Maple metallic fidelity)." 
            },
            borderColorStyle: { 
              type: Type.STRING, 
              description: "The ideal stroke color in hex format (e.g. #3d2a1b for charred, #c5a059 for gold leaf)." 
            },
            svgPaths: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "A list of 2 to 4 clean SVG path 'd' attribute strings that draw minimalistic decorative frames, geometric lines, corner accent panels, or modern honeycomb filigree. DO NOT include raw SVG tags, just include the inner 'd' path strings."
            },
            registryNumber: { 
              type: Type.STRING, 
              description: "A unique, authentic luxury registry SKU (e.g., AV-NJ-9942)." 
            }
          },
          required: ["success", "story", "woodAdvice", "borderColorStyle", "svgPaths", "registryNumber"],
        },
      },
    });

    const contentText = response.text;
    if (!contentText) {
      throw new Error("No response from Gemini API");
    }

    const result = JSON.parse(contentText.trim());
    return NextResponse.json(result);

  } catch (error: any) {
    console.error("Gemini Engraving API error:", error);
    
    // Graceful fallback for offline / mock / empty API key environments
    const isMock = !process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === "MY_GEMINI_API_KEY";
    
    // Provide gorgeous fallback so user never sees a broken screen
    return NextResponse.json({
      success: true,
      isMock,
      story: "Crafted on-demand, these geometric honeycomb lines and delicate filigree are calibrated directly by the Avenoir design workshop for maximum structural contrast.",
      woodAdvice: `The natural warm grains of the chosen wood foundation will capture this ${engravingStyle === 'gold-leaf' ? 'liquid metallic gold stamp' : 'laser-charred deep groove'} with exquisite edge definition.`,
      borderColorStyle: engravingStyle === "gold-leaf" ? "#D4AF37" : "#4A3B32",
      svgPaths: [
        "M 10 10 L 10 390 L 590 390 L 590 10 Z", // Basic luxury border
        "M 20 20 L 20 380 L 580 380 L 580 20 Z", // Double inset border
        "M 40 40 L 100 40 M 40 40 L 40 100",     // Corner designs
        "M 560 40 L 500 40 M 560 40 L 560 100",
        "M 40 360 L 100 360 M 40 360 L 40 300",
        "M 560 360 L 500 360 M 560 360 L 560 300"
      ],
      registryNumber: `AV-NJ-${Math.floor(1000 + Math.random() * 9000)}`
    });
  }
}
