import { useState } from "react";

type MovableProps = {
  children: React.ReactNode;
};

const trollMessages = [
  "Raté ! 😜",
  "Trop lent...",
  "Essaie encore 🤡",
  "Tu crois que c’est si facile ?",
  "Presque...",
  "Hé hé hé 😈",
  "Nope.",
  "Haha !",
  "Pas cette fois !",
  "Tu vas y arriver… ou pas."
];

export default function MovableComponent({ children }: MovableProps) {
  const [pos, setPos] = useState({ top: 100, left: 100 });
  const [counter, setCounter] = useState(0);
  const [message, setMessage] = useState("");

  const moveRandom = () => {
    const top = Math.random() * window.innerHeight * 0.8;
    const left = Math.random() * window.innerWidth * 0.8;
    setPos({ top, left });

    const randomMsg = trollMessages[Math.floor(Math.random() * trollMessages.length)];
    setMessage(randomMsg);
  };


  const incrementCounter = () => {
    console.log("Counter incremented:", counter);
    setCounter(prevCounter => prevCounter + 1);
  };

  const newAction = () => {
    moveRandom();
    incrementCounter();
  };

  const renderContent = () => {
    if (counter >= 10) return (
      <div>
        <div
          className="absolute transition-all duration-300 ease-in-out cursor-pointer"
          style={{ top: pos.top, left: pos.left }}
        >
          {children}
        </div>
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-lg text-white font-bold">
          Tu as réussi ! Bravo ! 🎉
        </div>
      </div>
    );
    else return (
      <div>
        <div
          className="absolute transition-all duration-300 ease-in-out cursor-pointer"
          style={{ top: pos.top, left: pos.left }}
          onMouseEnter={newAction}
        >
          {children}
        </div>
        {message && (
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-lg text-white font-bold animate-pulse">
            {message}
          </div>
        )}
      </div>
    );
  }
  return (
    renderContent()
  );
}

