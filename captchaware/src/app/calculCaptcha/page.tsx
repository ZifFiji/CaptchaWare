"use client";

import { useState, useEffect } from "react";

const CalculCaptchaComponent = ({response, waitTime}: {response: string, waitTime: boolean}) => {
  return (
    <div>
      <p>
        {!waitTime &&(
          "Result not quite precise. Try again!"
        )
        }
        {waitTime &&(
          "Captcha successful! You are not a robot."
        )}
      </p>
    </div>
  );

}

export default function CalculCaptcha() {
  const [response, setResponse] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [waitTime, setWaitTime] = useState(false);
  const [keysPressed, setKeysPressed] = useState(new Set<string>());

  useEffect(() => {
    const timer = setTimeout(() => {
      setWaitTime(true);
    }, 60000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (keysPressed.has(e.key)) {
        e.preventDefault();
        return;
      }
      
      setKeysPressed(prev => new Set(prev).add(e.key));
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      setKeysPressed(prev => {
        const newSet = new Set(prev);
        newSet.delete(e.key);
        return newSet;
      });
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [keysPressed]);

  const handleClick = () => {
    setSubmitted(true);
    setResponse("");
  };

  return (
    <div className="space-y-8">
      <p>Resolve this captcha</p>
      <div className="border-2 border-solid border-blue-200 w-fit p-4">
        "10 / 3 = ?"
      </div>
      <div className="space-y-4">
        <input
          type="text"
          value={response}
          onChange={(e) => setResponse(e.target.value)}
          placeholder="Enter your response"
          className="border border-gray-300 px-3 py-2 rounded w-full max-w-md"
        />
        <button onClick={handleClick}>Verify</button>
      </div>
      {submitted && (
        <div>
          <CalculCaptchaComponent response={response} waitTime={waitTime}/>
        </div>
      )}
    </div>
  );
}