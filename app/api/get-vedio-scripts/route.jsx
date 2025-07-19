// pages/api/get-vedio-scripts.js

import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(req) {
  const body = await req.json(); // get prompt from frontend
  const userPrompt = body.prompt;

  const openai = new OpenAI({
    baseURL: 'https://openrouter.ai/api/v1',
    apiKey: process.env.GEMINI_API_KEY,
  });

  try {
    const completion = await openai.chat.completions.create({
      model: 'google/gemini-2.0-flash-exp:free',
      messages: [
        {
          role: 'user',
          content: userPrompt,
        },
      ],
    });

    return NextResponse.json({
      result: completion.choices[0]?.message?.content || 'No content returned',
    });
  } catch (err) {
    console.error('Error from OpenRouter:', err);
    return NextResponse.json(
      { error: 'Something went wrong with AI generation.' },
      { status: 500 }
    );
  }
}
