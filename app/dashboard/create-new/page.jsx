'use client';

import React, { useState } from 'react';
import SelectTopic from './_components/SelectTopic';
import SelectStyle from './_components/SelectStyle';
import SelectDuration from './_components/SelectDuration';
import { Button } from '../../../@/components/ui/button.jsx';
import axios from 'axios';
import CustomLoading from './_components/CustomLoading';
import { v4 as uuidv4 } from 'uuid';


const scriptData = "A young, nervous-looking girl, Sakura, stands under a cherry blossom tree, clutching a small gift. Her face is flushed. She takes a deep breath. Close-up on Sakura's face; her expression is a mix of fear and determination. A handsome boy, Hiro, appears in front of her, looking slightly surprised. \"Hiro...\" \"I... I have something to tell you.\" Hiro looks at her with a kind, encouraging expression. Sakura slowly opens the gift, revealing a handmade chocolate heart. \"I... I really like you, Hiro!\" Hiro's eyes widen slightly, then a soft smile spreads across his face. Sakura and Hiro stand facing each other, the cherry blossom petals swirling around them.";

const FILEURL='https://onoqupswmbsylcbxibzl.supabase.co/storage/v1/object/public/audio-ouput-mp3/audio/1752907725213-output.mp3';
function CreateNew() {
  const [formData, setFormData] = useState({});

  const [loading,setloading]= useState(false);

  const [videoscript,setvideoscript]= useState();

  const [audiofileUrl,setaudiofileUrl]=useState();

  const [captions,setcaptions]=useState();

  const onHandleInputChange = (fieldName, fieldValue) => {
    console.log(fieldName, fieldValue);
    setFormData((prev) => ({
      ...prev,
      [fieldName]: fieldValue
    }));
  };

  const onCreateClickhandler =()=>{
    // getVideoScript();
    // generateAudioFile(scriptData);
    generateCaption(FILEURL);
  }
  // get vedio scriptf
  const getVideoScript= async() =>{
      setloading(true);
     const prompt = `Generate a video script of ${formData.duration} seconds on the topic "${formData.topic}".
Break it into short scenes. For each scene, return:
1. "imagePrompt": an AI image prompt in ${formData.imageStyle} style.
2. "ContentText": simple narration or spoken dialogue, without sound effects or brackets.

Avoid using (SFX:...), speaker names, or parentheses.
Return ONLY valid JSON like:
[
  {
    "imagePrompt": "string",
    "ContentText": "string"
  }
]`;


      console.log(prompt)
      await axios.post('/api/get-vedio-scripts', {
        prompt
      }).then(resp => {
        console.log(resp.data.result);
        setvideoscript(resp.data.result);
        generateAudioFile(resp.data.result);
      });

      setloading(false);
  }

//getAudio file 
const generateAudioFile = async (scriptData) => {
  const id = uuidv4();
  // let videoScriptData = videoScriptDataRaw;

  // if (typeof videoScriptData === 'string') {
  //   const cleaned = videoScriptData
  //     .replace(/```json/g, '')
  //     .replace(/```/g, '')
  //     .trim();

  //   try {
  //     videoScriptData = JSON.parse(cleaned);
  //   } catch (err) {
  //     console.error('❌ Failed to parse cleaned video script JSON:', err);
  //     return;
  //   }
  // }

  // let script = '';
  // videoScriptData.forEach(item => {
  //   script += item.ContentText + ' ';
  // });

  // console.log("✅ Final Script:", script);
  setloading(true);
  await axios.post('/api/generateAudio',{
    text:scriptData,
    id:id
  }).then(resp=>{
    console.log(resp.data)
    setaudiofileUrl(resp.data.url)
  })
  setloading(false)
};


//get the caption 

const generateCaption = async (fileUrl) =>{
    setloading(true)
    await axios.post('/api/generateCaption',{
      audiofileUrl:fileUrl
    }).then(resp=>{
      console.log(resp.data.result)
      setcaptions(resp?.data?.result)
    })
    setloading(false)
}

 
  return (
    <div className='md:px-20'>
      <h2 className='font-bold text-4xl text-primary text-center'>Create New</h2>

      <div className='mt-10 shadow-md p-10'>
        {/* Select Topic */}
        <SelectTopic onUserSelect={onHandleInputChange} />

        {/* Select Style */}
        <SelectStyle onUserSelect={onHandleInputChange} />

        {/* Select Duration */}
        <SelectDuration onUserSelect={onHandleInputChange} />

        {/* Create Button */}
        <Button className="mt-10 w-full" onClick={onCreateClickhandler}>
          Create Short Video
        </Button>
      </div>
      <CustomLoading loading={loading}/>
    </div>
  );
}

export default CreateNew;
