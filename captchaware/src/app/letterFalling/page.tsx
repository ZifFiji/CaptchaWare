"use client";

import {useState} from "react";

type TWordAndAudio = {
  word: string,
  audioSrc: string
}

export default function FallingLetter() {
  const [isStart, setIsStart] = useState(false);

  const listOfHardestWord: TWordAndAudio[] = [
    {word: "Antidisestablishmentarianism", audioSrc: "/antidisesta.mp3"},
    {word: "Floccinaucinihilipilification", audioSrc: "/flocci.mp3"},
    {word: "Onomatopoeia", audioSrc: "/onoma.mp3"},
    {word: "Pneumonoultramicroscopicsilicovolcanoconiosis", audioSrc: "/pneumono.mp3"},
  ];

  return (
    <div>
      <p>You will need to write every words without any spelling mistakes. Every word must start with an upper case letter.</p> 
      {isStart === false 
        ?
          <button onClick={() => setIsStart(true)} />
        :
          
      }
    </div>
  )
}
