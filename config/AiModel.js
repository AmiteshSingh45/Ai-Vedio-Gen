// config/AiModel.js

// Install dependencies:
// npm install @google/genai mime

import { GoogleGenerativeAI } from '@google/genai';

const ai = new GoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function generateVideoScript(userInput = 'INSERT_INPUT_HERE') {
  const tools = [
    {
      googleSearch: {},
    },
  ];

  const config = {
    thinkingConfig: {
      thinkingBudget: -1,
    },
    tools,
    responseMimeType: 'text/plain',
  };

  const model = 'gemini-2.5-pro';

  const contents = [
    {
      role: 'user',
      parts: [
        {
          text: `write a script to generate 30 seconds video on topic : interesting historical story along with Ai image prompt in Realistic Format for each scene and give me result in JSON format with imagePrompt and ContentText as field ,NO plain text`,
        },
      ],
    },
    {
      role: 'model',
      parts: [
        {
          text: `**Discovering a Narrative** ... [TRUNCATED for brevity]`,
        },
        {
          text: `\`\`\`json
[ ... your full JSON here ... ]
\`\`\``,
        },
      ],
    },
    {
      role: 'user',
      parts: [
        {
          text: userInput,
        },
      ],
    },
  ];

  try {
    const response = await ai.models.generateContentStream({
      model,
      config,
      contents,
    });

    let fullResponse = '';

    for await (const chunk of response) {
      process.stdout.write(chunk.text);
      fullResponse += chunk.text;
    }

    return fullResponse;
  } catch (error) {
    console.error('Gemini API Error:', error);
    throw error;
  }
}
