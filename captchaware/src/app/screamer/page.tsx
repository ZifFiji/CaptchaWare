'use client';

import { useState } from 'react';

export default function Screamer() {
  const [showVideo, setShowVideo] = useState(false);
  const [countVideoShown, setCountVideoShown] = useState(0);
  const [isYes, setIsYes] = useState(false);

  const handleClick = () => {
    setShowVideo(true);
    setCountVideoShown(countVideoShown + 1);
  }

  const handleYes = () => {
    handleClick();
    setIsYes(true);
  }

  return (
    <div className="mb-4 flex h-screen flex-col items-center justify-center">
      {isYes && showVideo && (
        <div className="mb-4 flex items-center justify-center" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 9999 }}>
          <video src="/screamer.mp4" autoPlay style={{ width: '100%', height: '100%', objectFit: 'cover' }} onEnded={() =>setShowVideo(false)}/>
        </div>
      )}

      {isYes && !showVideo && (
        <div className="mb-4 flex items-center justify-center" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 9999 }}>
          <p className="mb-4 flex items-center justify-center">It was just to make sure you are a human.</p>
        </div>
      )}

      {!isYes && showVideo && (
        <div className="section" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 9999 }}>
          <video src="/screamer.mp4" autoPlay style={{ width: '100%', height: '100%', objectFit: 'cover' }} onEnded={() =>setShowVideo(false)}/>
        </div>
      )}

      {!isYes && !showVideo && countVideoShown === 0 && (
        <div> 
          <p className="mb-4 flex items-center justify-center">Human test</p>
          <button className="mb-4 flex cursor-pointer items-center justify-center rounded-lg bg-zinc-800 px-8 py-4 hover:bg-zinc-700" type="button" onClick={handleClick}>Press when you are ready</button>
        </div>
      )}

      {!isYes && !showVideo && countVideoShown > 0 && (
        <div>
          <h1 className="mb-4 flex items-center justify-center text-align">{countVideoShown === 1 ? "Were you scared ?" : "WERE YOU SCARED ?"}</h1>
          <div className="flex gap-4">
            <button type="button" className="mb-4 flex cursor-pointer items-center justify-center rounded-lg bg-red-800 px-4 py-2 hover:bg-red-700" onClick={handleYes}>Yes</button>
            <button type="button" className="mb-4 flex cursor-pointer items-center justify-center rounded-lg bg-green-800 px-4 py-2 hover:bg-green-700" onClick={handleClick}>No</button>
          </div>
        </div>
      )}
    </div>
  );
}

