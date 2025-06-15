"use client";

import pizza from "@/../public/pizza.png"
import pineapple from "@/../public/pinneapple_piece.png"
import Image from "next/image";
import Link from "next/link";
import { Rnd } from "react-rnd";
import { useState, useRef, useEffect } from "react"

type Pineapple = {
  width: number
  height: number
  x: number
  y: number
  id: number
}

export default function PineapplePizza() {
  const pizzaRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [pineapples, setPineapples] = useState<Pineapple[]>([]);
  const [gameFinished, setGameFinished] = useState(false);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!initialized) {
      const containerWidth = 800;
      const containerHeight = 600;
      
      const initialPineapples: Pineapple[] = Array.from({length: 5}, (_, i) => ({
        id: i,
        width: 50,
        height: 50,
        x: Math.floor(Math.random() * (containerWidth - 50)),
        y: Math.floor(Math.random() * (containerHeight - 50)),
      }));
      
      setPineapples(initialPineapples);
      setInitialized(true);
    }
  }, [initialized]);

  const isPineappleOnPizza = (pineapplePos: {x: number, y: number}) => {
    if (!pizzaRef.current) return false;
    
    const pizzaRect = pizzaRef.current.getBoundingClientRect();
    const containerRect = containerRef.current?.getBoundingClientRect();
    
    if (!containerRect) return false;
    
    const pizzaX = pizzaRect.left - containerRect.left;
    const pizzaY = pizzaRect.top - containerRect.top;
    
    const pineappleCenterX = pineapplePos.x + 25;
    const pineappleCenterY = pineapplePos.y + 25;
    
    const margin = 30;
    
    return (
      pineappleCenterX >= pizzaX + margin &&
      pineappleCenterX <= pizzaX + pizzaRect.width - margin &&
      pineappleCenterY >= pizzaY + margin &&
      pineappleCenterY <= pizzaY + pizzaRect.height - margin
    );
  };

  const handleDragStop = (id: number, position: {x: number, y: number}) => {
    setPineapples(prev => 
      prev.map(p => 
        p.id === id 
          ? { ...p, x: position.x, y: position.y }
          : p
      )
    );

    const updatedPineapples = pineapples.map(p => 
      p.id === id ? { ...p, x: position.x, y: position.y } : p
    );
    
    const allOnPizza = updatedPineapples.every(p => 
      isPineappleOnPizza({ x: p.x, y: p.y })
    );

    if (!allOnPizza && updatedPineapples.length === 5) {
      setGameFinished(false);
    }
    
    if (allOnPizza && updatedPineapples.length === 5) {
      setGameFinished(true);
    }
  };

  if (!initialized) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-black">
      {gameFinished && (
        <div className="text-center">
          <h2 className="text-2xl font-bold text-green-600 mb-2">
            Congratulations! You are a robot! Who puts pineapples on their pizza...?
          </h2>
          <p>
            You probably need to search more.
          </p>
        </div>
      )}
      
      <div className="text-center mb-4">
        <p className="text-lg">
          Drag all pineapples onto the pizza! 
          ({pineapples.filter(p => isPineappleOnPizza({x: p.x, y: p.y})).length}/5 on pizza)
        </p>
      </div>

      <div 
        ref={containerRef}
        className="relative w-[800px] h-[600px] border-2 border-gray-300 rounded"
      >
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 select-none">
          <Image 
            ref={pizzaRef}
            src={pizza} 
            alt="pizza" 
            width={300} 
            height={300}
          />
        </div>
        {pineapples.map((pineappleItem) => (
          <Rnd 
            key={pineappleItem.id}
            size={{ width: pineappleItem.width, height: pineappleItem.height }}
            position={{ x: pineappleItem.x, y: pineappleItem.y }}
            onDragStop={(_, d) => handleDragStop(pineappleItem.id, { x: d.x, y: d.y })}
            bounds="parent"
            enableResizing={false}
          >
            <Image 
              src={pineapple} 
              alt="pineapple" 
              width={pineappleItem.width}
              height={pineappleItem.height}
              className="select-none"
              draggable={false}
            />
          </Rnd>
        ))}
        
      </div>
      <Link href="/" className="text-black">
        How the fuck put pineapple on a pizza ?
      </Link>
    </div>
  );
}
