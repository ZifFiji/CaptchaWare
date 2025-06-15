"use client";

import React, { useState, useEffect, useCallback } from 'react';

const WORD_LENGTH = 9;
const MAX_GUESSES = 6;

type LetterState = 'correct' | 'present' | 'absent' | 'empty';

interface Cell {
  letter: string;
  state: LetterState;
}

export default function WordleGame() {
  const targetWord = "\\_(O_O)_/";
  const [guesses, setGuesses] = useState<Cell[][]>([]);
  const [currentGuess, setCurrentGuess] = useState<string>('');
  const [currentRow, setCurrentRow] = useState<number>(0);
  const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'lost'>('playing');

  useEffect(() => {
    startGame();
  }, []);

  const startGame = () => {
    setGuesses(Array(MAX_GUESSES).fill(null).map(() => 
      Array(WORD_LENGTH).fill(null).map(() => ({ letter: '', state: 'empty' }))
    ));
    setCurrentGuess('');
    setCurrentRow(0);
    setGameStatus('playing');
  };

  const evaluateGuess = (guess: string): Cell[] => {
    const result: Cell[] = [];
    const targetLetters = targetWord.split('');
    const guessLetters = guess.split('');
    
    for (let i = 0; i < WORD_LENGTH; i++) {
      if (guessLetters[i] === targetLetters[i]) {
        result[i] = { letter: guessLetters[i], state: 'correct' };
        targetLetters[i] = '';
      } else {
        result[i] = { letter: guessLetters[i], state: 'absent' };
      }
    }
    
    for (let i = 0; i < WORD_LENGTH; i++) {
      if (result[i].state === 'absent') {
        const targetIndex = targetLetters.indexOf(guessLetters[i]);
        if (targetIndex !== -1) {
          result[i].state = 'present';
          targetLetters[targetIndex] = '';
        }
      }
    }
    
    return result;
  };

  const submitGuess = useCallback(() => {
    if (currentGuess.length !== WORD_LENGTH || gameStatus !== 'playing') return;

    const evaluatedGuess = evaluateGuess(currentGuess.toUpperCase());
    const newGuesses = [...guesses];
    newGuesses[currentRow] = evaluatedGuess;
    setGuesses(newGuesses);
    
    if (currentGuess.toUpperCase() === targetWord) {
      setGameStatus('won');
    } else if (currentRow === MAX_GUESSES - 1) {
      setGameStatus('lost');
    } else {
      setCurrentRow(currentRow + 1);
    }
    
    setCurrentGuess('');
  }, [currentGuess, currentRow, guesses, gameStatus, targetWord]);

  const handleKeyPress = useCallback((key: string, upperKey: string) => {
    if (gameStatus !== 'playing') return;

    if (upperKey === 'ENTER') {
      submitGuess();
    } else if (upperKey === 'BACKSPACE') {
      setCurrentGuess(prev => prev.slice(0, -1));
    } else if (key.length === 1 && currentGuess.length < WORD_LENGTH) {
      if (/[A-Z]/.test(upperKey))
        setCurrentGuess(prev => prev + upperKey);
      else if (/^[\\_()\/_]$/.test(key))
        setCurrentGuess(prev => prev + key);
    }
  }, [currentGuess, gameStatus, submitGuess]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key;
      const upperKey = e.key.toUpperCase();
      if (upperKey === 'ENTER' || upperKey === 'BACKSPACE' || /^[A-Z]$/.test(upperKey) || /^[\\_()\/_]$/.test(key)) {
        e.preventDefault();
        handleKeyPress(key, upperKey);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyPress]);

  const getCellStyle = (state: LetterState) => {
    switch (state) {
      case 'correct':
        return 'bg-green-500 border-green-500 text-white';
      case 'present':
        return 'bg-yellow-500 border-yellow-500 text-white';
      case 'absent':
        return 'bg-gray-500 border-gray-500 text-white';
      default:
        return 'bg-white border-gray-300 text-black';
    }
  };

  const renderGrid = () => {
    return guesses.map((row, rowIndex) => (
      <div key={rowIndex} className="flex gap-1 justify-center">
        {row.map((cell, cellIndex) => {
          const isCurrentRow = rowIndex === currentRow;
          const displayLetter = isCurrentRow && cellIndex < currentGuess.length
            ? currentGuess[cellIndex]
            : cell.letter;
          
          return (
            <div
              key={cellIndex}
              className={`
                w-14 h-14 border-2 flex items-center justify-center text-2xl font-bold text-black
                ${isCurrentRow && cellIndex < currentGuess.length 
                  ? 'border-gray-500 bg-white' 
                  : getCellStyle(cell.state)
                }
              `}
            >
              {displayLetter}
            </div>
          );
        })}
      </div>
    ));
  };

  return (
    <div>
      <div className="max-w-md mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-white-800">WORDLE</h1>
        
        <div className="text-center mb-6">
          <p>
            {currentRow >= 2 && (
              "Did you know that the word can contain special character ?"
            )}
          </p>
        </div>
        <div className="flex flex-col gap-1 mb-8">
          {renderGrid()}
        </div>

        {gameStatus !== 'playing' && (
          <div className="text-center mb-6">
            <div className={`text-2xl font-bold mb-2 ${gameStatus === 'won' ? 'text-green-600' : 'text-red-600'}`}>
              {gameStatus === 'won' ? 'Congratulations!' : 'Game Over!'}
            </div>
            <div className="text-lg text-gray-600 mb-4">
              The word was: <span className="font-bold">{targetWord}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};