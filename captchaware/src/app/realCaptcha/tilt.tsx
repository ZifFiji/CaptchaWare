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
  const [maxCounter] = useState(Math.floor(Math.random() * (100 - 10 + 1)) + 10);

  const moveRandom = () => {
    const top = Math.random() * window.innerHeight * 0.8;
    const left = Math.random() * window.innerWidth * 0.8;
    setPos({ top, left });

    const randomMsg = trollMessages[Math.floor(Math.random() * trollMessages.length)];
    setMessage(randomMsg);

    setTimeout(() => {
      setMessage("");
    }, 1000);
  };


  const incrementCounter = () => {
    console.log(maxCounter);
    console.log("Counter before increment:", counter);
    setCounter(prevCounter => prevCounter + 1);
  };


  const newAction = () => {
    moveRandom();
    incrementCounter();
  };

  const renderContent = () => {
    if (counter >= maxCounter) return (
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
          <div className="fixed top-10 left-1/2 transform -translate-x-1/2 text-lg text-white font-bold animate-pulse z-10 bg-black bg-opacity-50 px-4 py-2 rounded pointer-events-none">
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

