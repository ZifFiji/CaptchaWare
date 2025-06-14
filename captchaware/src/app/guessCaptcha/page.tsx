"use client";

import { useState, useEffect } from "react";

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
    if (response.toLowerCase() === result.toLowerCase())
      setIsCorrect(true);
    setSubmitted(true);
  };

  return (
    <div className="space-y-8">
      <p>To which animal does this fart belong ?</p>
      <div className="border-2 border-solid border-blue-200 w-fit p-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={() => playSound(17, 10)}>
          Play Sound
        </button>
      </div>
      <div className="space-y-4">
        <li className="list-disc pl-5">
          <ul>- Hippo</ul>
          <ul>- Elephant</ul>
          <ul>- Donkey</ul>
          <ul>- Human</ul>
        </li>
        <input
          type="text"
          placeholder="Enter your guess"
          className="border border-gray-300 px-3 py-2 rounded w-full max-w-md"
          onChange={(e) => setResponse(e.target.value)}
        />
        <button onClick={handleClick} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Submit
        </button>
        </div>
      {submitted && (
        <div className="mt-4">
          <GuessCaptchaComponent isCorrect={isCorrect} />
        </div>
      )}
    </div>
  );
}
