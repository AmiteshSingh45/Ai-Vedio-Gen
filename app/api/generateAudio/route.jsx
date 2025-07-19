import textToSpeech from "@google-cloud/text-to-speech";
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Setup Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// Google TTS client
const client = new textToSpeech.TextToSpeechClient();

export async function POST(req) {
  try {
    const body = await req.json();
    const { text } = body;

    const request = {
      input: { text },
      voice: { languageCode: "en-US", ssmlGender: "NEUTRAL" },
      audioConfig: { audioEncoding: "MP3" },
    };

    const [response] = await client.synthesizeSpeech(request);

    const buffer = Buffer.from(response.audioContent, "binary");
    const fileName = `audio/${Date.now()}-output.mp3`;

    // Upload to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from("audio-ouput-mp3") // double-check the spelling!
      .upload(fileName, buffer, {
        contentType: "audio/mpeg",
        upsert: true,
      });

    if (uploadError) {
      throw new Error("Supabase upload failed: " + uploadError.message);
    }

    // Get public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from("audio-ouput-mp3").getPublicUrl(fileName);

    console.log("✅ Public URL:", publicUrl); // This should now appear

    return NextResponse.json({
      result: "Success",
      message: "Audio generated and uploaded",
      url: publicUrl,
    });
  } catch (err) {
    console.error("❌ TTS Upload Error:", err);
    return NextResponse.json(
      { result: "Failure", error: err.message },
      { status: 500 }
    );
  }
}
