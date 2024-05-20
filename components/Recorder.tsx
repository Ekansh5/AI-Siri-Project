'use client'

import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import activeAssistantIcon from "@/img/active.gif"
import notActiveAssistantIcon from "@/img/notactive.png"

function Recorder({ uploadAudio }: { uploadAudio: (blob: Blob) => void }) {
  const mediaRecorder = useRef<MediaRecorder | null>(null)
  const [permission, setPermission] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null)

  useEffect(() => {
    getMicrophonePermission()
  }, []);

const getMicrophonePermission = async() => {
  if ("MediaRecorder" in window){
    try {
      const streamData =  await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false,
      });
      setPermission(true);
      setStream(streamData)
    } catch (err: any) {
      alert(err.message)
    } 
  } else {
    alert("The MediaRecorder API is not supported in your browser.")
  }
}
  const startRecording = async () => {
    if (mediaRecorder === null || stream === null) return;
  }

  return (
    <div className='flex items-center justify-center text-white'>
        {!permission && (
          <button className="p-2 text-2xl" onClick={getMicrophonePermission}>Give Microphone Access</button>
        )}
        
        <Image 
            src={activeAssistantIcon}
            height={350}
            width={350}
            priority
            alt='Recording'
        />
    </div>
  )
}

export default Recorder