"use client";

import { useState, useEffect } from "react";

const BinaryCaptchaComponent = ({isCorrect, isSkipped}: {isCorrect: boolean, isSkipped: boolean}) => {
  const [waitTime, setWaitTime] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setWaitTime(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <p>
        {isCorrect && !waitTime &&(
          "Correct translation."
        )
        }
        {!isCorrect && !isSkipped &&(
          "Incorrect translation. Try again!"
        )}
        {isCorrect && waitTime &&(
          "Captcha failed. Only robots understand binary."
        )}
        {isSkipped && (
          "Captcha skipped."
        )}
      </p>
    </div>
  );

}

export default function BinaryCaptcha() {
  const [response, setResponse] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [isSkipped, setIsSkipped] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const String = "I am a Robot";
  const binarySring = "01001001 00100000 01100001 01101101 00100000 01100001 00100000 01010010 01101111 01100010 01101111 01110100";

  const handleClick = () => {
    setSubmitted(true);
    setIsCorrect(response.trim().toLowerCase() === String.toLowerCase());
  };

  const handleSkip = () => {
    setIsSkipped(true);
    setSubmitted(true);
    setIsCorrect(false);
  };

  return (
    <div className="space-y-8">
      <p>Translate this binary if your not a robot.</p>
      <div className="border-2 border-solid border-blue-200 w-fit p-4">
        {binarySring}
      </div>
      <div className="space-y-4">
        <input
          type="text"
          value={response}
          onChange={(e) => setResponse(e.target.value)}
          placeholder="Enter your translation"
          className="border border-gray-300 px-3 py-2 rounded w-full max-w-md"
        />
        <button onClick={handleClick}>Verify</button>
      </div>
      {submitted && (
        <div>
          <BinaryCaptchaComponent isCorrect={isCorrect} isSkipped={isSkipped}/>
        </div>
      )}
      <div className="absolute right-0 bottom-0 text-black">
        <p onClick={handleSkip}>Skip</p>
      </div>
    </div>
  );
}