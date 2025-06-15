"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { type ChangeEvent, useState } from "react"

export function CreditCardForm() {
  const [ccNumber, setCcNumber] = useState("")
  const [expirationDate, setExpirationDate] = useState("")
  const [cvv, setCvv] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const formatCcNumber = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s/g, "").replace(/\D/g, "")

    if (value.length <= 16) {
      const formatted = value.replace(/(\d{4})(?=\d)/g, "$1 ")
      setCcNumber(formatted)
    }
  }

  const formatExpirationDate = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "")
    if (value.length <= 4) {
      if (value.length < 2) {
        setExpirationDate(value)
        return
      }
      const month = value.slice(0, 2)
      const year = value.slice(2, 4)
      const monthNum = Number.parseInt(month, 10)
      const validMonth = monthNum > 12 ? "12" : monthNum === 0 ? "01" : month
      const formatted = year ? `${validMonth}/${year}` : validMonth
      setExpirationDate(formatted)
    }
  }

  const formatCvv = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "")
    if (value.length <= 3) {
      setCvv(value)
    }
  }

  const isValidCcNumber = () => ccNumber.replace(/\s/g, "").length === 16
  const isValidExpirationDate = () => expirationDate.length === 5 && expirationDate.includes("/")
  const isValidCvv = () => cvv.length === 3
  
  const handleSubmit = () => {
    setIsSubmitted(true)
    if (isValidCcNumber() && isValidExpirationDate() && isValidCvv()) {
      setShowSuccess(true)
    }
  }

  if (showSuccess) {
    return (
      <div className="flex w-72 flex-col items-center gap-4 rounded-lg bg-green-900 p-6 shadow-lg">
        <div className="text-2xl text-green-400">✅</div>
        <h3 className="font-semibold text-green-100 text-lg">Payment Successful!</h3>
        <p className="text-center text-green-200 text-sm">
          Your credit card information has been submitted successfully. You are not a robot!
        </p>
        <Button 
          className="mt-2 cursor-pointer bg-green-700 hover:bg-green-600"
          onClick={() => {
            setShowSuccess(false)
            setIsSubmitted(false)
            setCcNumber("")
            setExpirationDate("")
            setCvv("")
          }}
        >
          Continue
        </Button>
      </div>
    )
  }

  return (
    <div className="flex w-72 flex-col gap-2 rounded-lg bg-zinc-900 p-4 shadow-lg">
      <Input 
        type="text" 
        placeholder="1234 5678 9012 3456" 
        className={`border-2 ${isSubmitted && !isValidCcNumber() ? 'border-red-500' : 'border-zinc-500'}`}
        value={ccNumber} 
        onChange={formatCcNumber} 
        maxLength={19} 
      />
      <div className="flex gap-2">
        <Input 
          type="text" 
          placeholder="MM/YY" 
          className={`border-2 ${isSubmitted && !isValidExpirationDate() ? 'border-red-500' : 'border-zinc-500'}`}
          value={expirationDate} 
          onChange={formatExpirationDate} 
          maxLength={5} 
        />
        <Input 
          type="text" 
          placeholder="123" 
          className={`w-1/2 border-2 ${isSubmitted && !isValidCvv() ? 'border-red-500' : 'border-zinc-500'}`}
          value={cvv} 
          onChange={formatCvv} 
          maxLength={3} 
        />
      </div>
      
      {isSubmitted && (!isValidCcNumber() || !isValidExpirationDate() || !isValidCvv()) && (
        <div className="mt-2 text-red-400 text-sm">
          Please fill in all fields correctly:
          {!isValidCcNumber() && <div>• Credit card number must be 16 digits</div>}
          {!isValidExpirationDate() && <div>• Expiration date must be in MM/YY format</div>}
          {!isValidCvv() && <div>• CVV must be 3 digits</div>}
        </div>
      )}
      
      <Button 
        className="mt-4 cursor-pointer bg-green-800 hover:bg-green-700"
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </div>
  )
}
