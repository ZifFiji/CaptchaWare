"use client";

import CaptchaNavigation from "@/components/CaptchaNaviguation";
import { useState } from "react";

const GuessCaptchaComponent = ({isCorrect}: {isCorrect: boolean}) => {
  return (
    <div>
      <p>
        {!isCorrect &&(
          "Captcha failed. Try again!"
        )
        }
        {isCorrect &&(
          "Captcha successful! You are not a robot."
        )}
      </p>
    </div>
  );
}

export default function GuessCaptcha() {
  const sound = "hippo.mp3";
  const [response, setResponse] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const result = "Hippo";

  const playSound = (startTime: number, duration: number) => {
    const audio = new Audio(sound);
    audio.currentTime = startTime;
    audio.play();

    setTimeout(() => {
      audio.pause();
    }, duration * 1000);
  };

  const handleClick = () => {
    if (response.toLowerCase() === result.toLowerCase()) {
      setIsCorrect(true);
    }
    setSubmitted(true);
  };

  return (
    <div className="mb-4 flex h-screen flex-col items-center justify-center">
      <p className="mb-4">To which animal does this fart belong ?</p>
      <div className="mb-4 w-fit p-4">
        <button type="button" className="cursor-pointer rounded-lg bg-zinc-800 px-8 py-4 hover:bg-zinc-700" onClick={() => playSound(17, 10)}>
          Play Sound
        </button>
      </div>
      <div className="mb-4 justify-center space-y-4 ">
        <li className="flex list-none flex-col items-center justify-center font-bold text-lg">
          <ul>- Hippo</ul>
          <ul>- Elephant</ul>
          <ul>- Donkey</ul>
          <ul>- Human</ul>
        </li>
        <input
          type="text"
          placeholder="Enter your guess"
          className="w-full max-w-md rounded border border-gray-300 px-3 py-2"
          onChange={(e) => setResponse(e.target.value)}
        />
        <button type="button" onClick={handleClick} className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
          Submit
        </button>
        </div>
      {submitted && (
        <div className="mt-4">
          <GuessCaptchaComponent isCorrect={isCorrect} />
        </div>
      )}
      <CaptchaNavigation />
    </div>
  );
}
