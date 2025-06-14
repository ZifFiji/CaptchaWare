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
    <div>
      {isYes && showVideo && (
        <div className="section" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 9999 }}>
          <video src="/screamer.mp4" autoPlay style={{ width: '100%', height: '100%', objectFit: 'cover' }} onEnded={() =>setShowVideo(false)}/>
        </div>
      )}

      {isYes && !showVideo && (
        <div className="section" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 9999 }}>
          <p>It was just to make sure you are a human.</p>
        </div>
      )}

      {!isYes && showVideo && (
        <div className="section" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 9999 }}>
          <video src="/screamer.mp4" autoPlay style={{ width: '100%', height: '100%', objectFit: 'cover' }} onEnded={() =>setShowVideo(false)}/>
        </div>
      )}

      {!isYes && !showVideo && countVideoShown === 0 && (
        <div> 
          <p>Human test</p>
          <button onClick={handleClick}>Press when you are ready</button>
        </div>
      )}

      {!isYes && !showVideo && countVideoShown > 0 && (
        <div>
          <p>{countVideoShown === 1 ? "Were you scared ?" : "WERE YOU SCARED ?"}</p>
          <button onClick={handleYes}>Yes</button>
          <button onClick={handleClick}>No</button>
        </div>
      )}
    </div>
  );
}

