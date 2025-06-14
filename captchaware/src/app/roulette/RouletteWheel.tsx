"use client"

import React from "react"
import dynamic from "next/dynamic"
import { useState, useEffect } from "react"

const Wheel = dynamic(() => import("react-custom-roulette").then((mod) => ({ default: mod.Wheel })), { ssr: false })

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  .split("")
  .sort(() => Math.random() - 0.5)
  .join("")

export function RouletteWheel() {
  const [mustSpin, setMustSpin] = useState(false)
  const [prizeNumber, setPrizeNumber] = useState(0)
  const [stringResult, setStringResult] = useState<string | null>(null)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [pendingLetter, setPendingLetter] = useState<string | null>(null)
  const [showConfirmation, setShowConfirmation] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      setMustSpin(localStorage.getItem("mustSpin") === "true")
      setStringResult(localStorage.getItem("rouletteResult") || null)
      const storedIsCorrect = localStorage.getItem("isCorrect")
      setIsCorrect(storedIsCorrect === "true" ? true : storedIsCorrect === "false" ? false : null)
      setPendingLetter(localStorage.getItem("pendingLetter") || null)
    }
  }, [])

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("rouletteResult", stringResult || "")
      localStorage.setItem("isCorrect", isCorrect ? "true" : isCorrect === false ? "false" : "")
      localStorage.setItem("pendingLetter", pendingLetter || "")
      localStorage.setItem("mustSpin", mustSpin ? "true" : "false")
    }
  }, [stringResult, isCorrect, pendingLetter, mustSpin])

  const checkIfCorrect = (result: string) => {
    if (result === "BANANA") {
      setIsCorrect(true)
    } else if (result.length > 6) {
      setIsCorrect(false)
    } else {
      setIsCorrect(null)
    }
  }

  const handleSpinClick = () => {
    if (!mustSpin) {
      const newPrizeNumber = Math.floor(Math.random() * 26)
      setPrizeNumber(newPrizeNumber)
      setMustSpin(true)
    }
  }

  const handleAddLetter = (shouldAdd: boolean) => {
    if (shouldAdd && pendingLetter) {
      const newResult = (stringResult || "") + pendingLetter
      setStringResult(newResult)
      checkIfCorrect(newResult)
    }
    setPendingLetter(null)
    setShowConfirmation(false)
  }

  return (
    <>
      <div className="mb-4 flex w-full flex-col items-center justify-center rounded-2xl bg-zinc-900 pt-16">
        <p className="mb-8">
          Type the word <strong>BANANA</strong> to prove you are human
        </p>
        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          data={Array.from({ length: 26 }, (_, i) => ({ option: alphabet[i] }))}
          backgroundColors={["#1c1c1c", "#2c2c2c"]}
          textColors={["#FFFFFF"]}
          outerBorderColor="#7c7c7c"
          radiusLineColor="#7c7c7c"
          onStopSpinning={() => {
            setMustSpin(false)
            setPendingLetter(alphabet[prizeNumber])
            setShowConfirmation(true)
          }}
        />
        {!showConfirmation && (
          <button onClick={handleSpinClick} className="mt-4 rounded-lg bg-green-800 px-8 py-4 font-bold hover:bg-gray-400" type="button">
            Spin
          </button>
        )}
        {showConfirmation && pendingLetter && (
          <div className="mt-4 rounded-xl bg-zinc-800 px-8 py-4">
            <p className="mb-3 text-center">
              The wheel landed on <strong className="text-green-600">{pendingLetter}</strong>
            </p>
            <p className="mb-4 text-center">Do you want to add this letter to your string?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => handleAddLetter(true)}
                className="rounded-lg bg-green-800 px-6 py-2 font-semibold text-white hover:bg-green-700"
                type="button"
              >
                Yes
              </button>
              <button
                onClick={() => handleAddLetter(false)}
                className="rounded-lg bg-red-800 px-6 py-2 font-semibold text-white hover:bg-red-700"
                type="button"
              >
                No
              </button>
            </div>
          </div>
        )}
        <div className="relative mt-8 mb-4 flex w-[95%] justify-center rounded-xl bg-zinc-800 py-4">
          <p>
            <strong className="absolute left-4">Result:</strong>
            {stringResult ? stringResult : <span className="text-zinc-500 italic">No result yet</span>}
          </p>
          {isCorrect === true && <div className="absolute right-4 font-bold text-green-400">✓ Correct!</div>}
          {isCorrect === false && <div className="absolute right-4 font-bold text-red-400">✗ Womp womp, try again :)</div>}
        </div>
        <button
          className="absolute right-2 bottom-2 cursor-pointer text-zinc-800 underline"
          type="button"
          onClick={() => {
            setStringResult(null)
            setIsCorrect(null)
            setPendingLetter(null)
            setShowConfirmation(false)
            setMustSpin(false)
          }}
        >
          Reset
        </button>
      </div>
    </>
  )
}
