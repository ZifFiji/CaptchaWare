"use client";
import { useRef, useState, useEffect } from "react";
import waldo from "@/../public/where_is_waldo.jpeg";
import waldo1 from "@/../public/where_is_waldo_1.jpg";
import waldo2 from "@/../public/where_is_waldo_2.jpg";
import Image from "next/image";
import Link from "next/link";

type WaldoZone = {
  x1: number,
  y1: number,
  x2: number,
  y2: number,
}

type WaldoArray = {
  src: string,
  zone: WaldoZone
}

const MessageFound = ({ message, setter }: { message: string, setter: any }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setter(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [setter]);

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-green-100 border-2 border-green-400 rounded-lg">
      <div className="text-center">
        <div className="text-4xl mb-4">🎉</div>
        <p className="text-xl font-bold text-green-800">{message}</p>
      </div>
    </div>
  );
};

export default function WhereIsWaldo() {
  const imageRef = useRef<HTMLImageElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [foundWaldo, setFoundWaldo] = useState(false);
  const [indexWaldoMap, setIndexWaldoMap] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);

  const whereIsWaldoArray: WaldoArray[] = [
    {
      src: waldo.src,
      zone: {
        x1: 1075,
        y1: 365,
        x2: 1090,
        y2: 413
      }
    },
    {
      src: waldo1.src,
      zone: {
        x1: 1205,
        y1: 761,
        x2: 1217,
        y2: 775
      }
    },
    {
      src: waldo2.src,
      zone: {
        x1: 177,
        y1: 833,
        x2: 187,
        y2: 845
      }
    },
  ];

  const messageFoundArray: string[] = [
    "Well done! You've found Waldo but that's not it.",
    "Congrats! You've finished the captcha...",
    "Now it's over! You completed all levels!"
  ];

  const originalWidth = 1920;
  const originalHeight = 1080;

  const handleClick = (e: React.MouseEvent<HTMLImageElement>) => {
    if (!imageRef.current || foundWaldo || gameComplete) return;

    const rect = imageRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const scaleX = originalWidth / rect.width;
    const scaleY = originalHeight / rect.height;
    
    const originalX = clickX * scaleX;
    const originalY = clickY * scaleY;

    const currentZone = whereIsWaldoArray[indexWaldoMap].zone;

    if (
      originalX >= currentZone.x1 &&
      originalX <= currentZone.x2 &&
      originalY >= currentZone.y1 &&
      originalY <= currentZone.y2
    ) {
      setFoundWaldo(true);
      
      if (indexWaldoMap >= whereIsWaldoArray.length - 1) {
        setGameComplete(true);
      }
    }
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleFoundWaldoComplete = () => {
    setFoundWaldo(false);
    
    if (!gameComplete) {
      setIndexWaldoMap(prev => prev + 1);
      setImageLoaded(false); // Reset image loading state for next image
    }
  };

  if (gameComplete && !foundWaldo) {
    return (
      <div className="space-y-4 w-full max-w-6xl mx-auto p-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">🎉 Congratulations!</h1>
          <p className="text-xl mb-6">You've completed all Waldo challenges!</p>
          <Link 
            href="/"
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-lg"
          >
            Go to home 
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 w-full max-w-6xl mx-auto p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          Find Waldo!
        </h1>
      </div>
      
      <div className="relative w-full" style={{ aspectRatio: `${originalWidth}/${originalHeight}` }}>
        {foundWaldo ? (
          <MessageFound 
            message={messageFoundArray[indexWaldoMap]} 
            setter={handleFoundWaldoComplete}
          />
        ) : (
          <>
            <Image
              ref={imageRef}
              src={whereIsWaldoArray[indexWaldoMap].src}
              alt={`Where's Waldo puzzle level ${indexWaldoMap + 1}`}
              fill
              onClick={handleClick}
              onLoad={handleImageLoad}
              style={{ 
                objectFit: "contain",
                cursor: "crosshair"
              }}
              className={`transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
              priority
            /> 
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                <div className="text-gray-500">Loading Waldo map...</div>
              </div>
            )}
          </>
        )}
      </div>
      
    </div>
  );
}
