"use client";

import { useState } from "react";
import Link from "next/link";

type TWordAndAudio = {
  word: string;
  audioSrc: string;
};

export default function WordTTS() {
  const [isStart, setIsStart] = useState(false);
  const [countFails, setCountFails] = useState<number>(0);
  const [textInput, setTextInput] = useState<string>("");
  const [indexWord, setIndexWord] = useState<number>(0);
  const [gameComplete, setGameComplete] = useState(false);

  const listOfHardestWord: TWordAndAudio[] = [
    { word: "Antidisestablishmentarianism", audioSrc: "/antidisesta.mp3" },
    { word: "Floccinaucinihilipilification", audioSrc: "/flocci.mp3" },
    { word: "Onomatopoeia", audioSrc: "/onoma.mp3" },
    { word: "Pneumonoultramicroscopicsilicovolcanoconiosis", audioSrc: "/pneumono.mp3" },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    const currentWord = listOfHardestWord[indexWord]?.word;
    if (!currentWord) return;

    const expectedSubstring = currentWord.substring(0, value.length);
    
    if (value !== expectedSubstring) {
      setCountFails(countFails + 1);
      setTextInput("");
    } else if (value === currentWord) {
      if (indexWord < listOfHardestWord.length - 1) {
        setIndexWord(indexWord + 1);
        setTextInput("");
      } else {
        setGameComplete(true);
      }
    } else {
      setTextInput(value);
    }
  };

  const playSound = () => {
    const audioSrc = listOfHardestWord[indexWord]?.audioSrc;
    if (audioSrc) {
      const audio = new Audio(audioSrc);
      audio.play().catch(error => {
        console.log("Audio playback failed:", error);
        alert(`Word: ${listOfHardestWord[indexWord]?.word}`);
      });
    }
  };

  return (
    <div className="h-screen w-full p-4">
      <p className="mb-4 text-center">
        You need to write every word without any spelling mistakes. Every word must start with an uppercase letter.
      </p>
      {gameComplete ? (
        <div className="flex flex-col items-center justify-center h-64 spacy-y-5">
          <p>Well done you are not a human.</p>
          <Link
            href="/"
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-lg"
          >
            Go to home
          </Link>
        </div>
      ) : (
        isStart === false ? (
          <div className="flex flex-col items-center justify-center h-64">
            <button 
              type="button" 
              onClick={() => setIsStart(true)}
              className="bg-green-500 text-white px-6 py-3 rounded text-lg hover:bg-green-600"
            >
              Are you ready?
            </button>
          </div>
        ) : (
          <div className="h-full w-full">
            <div className="text-center mb-4">
              <p className="mb-2">Word {indexWord + 1} of {listOfHardestWord.length}</p>
              <p className="mb-2">Number of fails: {countFails}</p>
              <button 
                type="button" 
                onClick={playSound}
                className="bg-blue-500 text-white px-4 py-2 rounded mr-4 hover:bg-blue-600"
              >
                🔊 Play word
              </button>
            </div>
            <div className="text-center mb-4">
              <input 
                value={textInput} 
                onChange={handleInputChange} 
                placeholder="Type the word you hear..."
                className="border-2 border-blue-300 px-4 py-2 text-lg rounded focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        )
      )}
    </div>
  );
}
