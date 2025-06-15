import CaptchaNavigation from "@/components/CaptchaNaviguation.tsx"
import { CreditCardForm } from "./Form.tsx"

export default function Page() {
  return (
    <div className="mx-auto flex h-screen w-full max-w-2xl flex-col items-center justify-center">
      <h1 className="mb-2 font-bold text-2xl">Credit Card Form</h1>
      <p className="mb-16 text-lg text-zinc-400">Please fill out the form below to prove that you are human.</p>
      <CreditCardForm />
      <CaptchaNavigation />
    </div>
  )
}
