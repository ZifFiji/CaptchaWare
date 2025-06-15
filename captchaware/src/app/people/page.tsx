"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import CaptchaNavigation from "@/components/CaptchaNaviguation";

const PeopleCaptchaComponent = ({ isCorrect }: { isCorrect: boolean }) => {
  return (
    <div>
      <p>
        {isCorrect && "Correct."}
        {!isCorrect && "Incorrect. Try again!"}
      </p>
    </div>
  )
}

export default function PeopleCaptcha() {
  const [response, setResponse] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const result = "4000";

  const handleClick = () => {
    setSubmitted(true);
    setIsCorrect(response.trim() === result);
  }

  return (
    <div className="mb-4 flex h-screen flex-col items-center justify-center">
      <p className="mb-4">How many people did you see on this photo ?</p>
      <div className="mb-4 flex w-fit items-center justify-center border-2 border-blue-200 border-solid p-4">
        <Image
          src="/photo.jpg"
          alt="People photo"
          width={800}
          height={800}
          className="rounded-lg"
        />
      </div>
      <div className="mb-4 flex flex-col items-center justify-center space-y-4">
        <input
          type="text"
          value={response}
          onChange={(e) => setResponse(e.target.value)}
          placeholder="Enter your response"
          className="mb-4 w-full max-w-md rounded border border-gray-300 px-3 py-2"
        />
        <button type="button" onClick={handleClick} className="cursor-pointer rounded-lg bg-zinc-800 px-8 py-4 font-bold hover:bg-zinc-700">Verify</button>
      </div>
      {submitted && (
        <div>
          <PeopleCaptchaComponent isCorrect={isCorrect} />
        </div>
      )}
      <CaptchaNavigation />
    </div>
  );
}
