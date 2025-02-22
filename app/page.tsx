'use client'
import Messages from "@/components/Messages";
import Recorder from "@/components/Recorder";
import { SettingsIcon } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

export default function Home() {
  const fileRef = useRef<HTMLInputElement | null>(null)
  const submitButtonRef = useRef<HTMLButtonElement | null>(null)

  const  uploadAudio = (blob: Blob) => {
    const url = URL.createObjectURL(blob)

    const file = new File([blob], 'audio.webm', { type: blob.type });

    // set the file as the value of the hidden input field
    if (fileRef.current){
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      fileRef.current.files = dataTransfer.files;

    // simulate a click and submit the form
    if (submitButtonRef.current) {
      submitButtonRef.current.click();
      }
    }
  };

  return (
    <main className="bg-black h-screen overflow-y-auto">
      {/* Header */}
      <header className="flex justify-between fixed top-0 text-white w-full p-5">
        <Image 
          alt="Logo"
          src="https://i.imgur.com/MCHWJZS.png"
          width={50}
          height={50}
          className="object-contain"
        />
        <SettingsIcon 
          size={40}
          className="p-2 m-2 rounded-full cursor-pointer bg-purple-600 text-black transition-all ease-in-out duration-150 hover:bg-purple-700 hover:text-white"
        />

      </header>

      {/* Form */}
      <form className="flex flex-col bg-black">
        <div className="flex-1 bg-gradient-to-b from-purple-500 to-black">
          <Messages />
        </div>

        <input type="file" hidden ref={fileRef} name="audio"/>
        <button type="submit" hidden ref={submitButtonRef} />

        <div className="fixed bottom-0 w-full overflow-hidden bg-black rounded-t-3xl ">
          <Recorder uploadAudio={uploadAudio}/>

          <div>{/* Voice Synthesizer */}</div>
        </div>
      </form>
    </main>
  );
}
