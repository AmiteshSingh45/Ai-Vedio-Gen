// Install the assemblyai package by executing the command "npm install assemblyai"

import { AssemblyAI } from "assemblyai";
import { NextResponse } from "next/server";

export async function POST(req){
 try{
           
            const client = new AssemblyAI({
            apiKey: process.env.NEXT_PUBLIC_ASSEMBLYAI_API_KEY,
            });

            const {audiofileUrl} = await req.json(); 

            const params = {
            audio: audiofileUrl,
            speech_model: "universal",
            };


            const transcript = await client.transcripts.transcribe(params);

            console.log(transcript.words);

            return NextResponse.json({'result':transcript.words})
 }
 
 catch(err){
     return NextResponse.json({'error':err})
 }

}