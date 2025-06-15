"use client"
import MovableComponent from "./tilt"
import FakeCaptcha from "./fakeCaptcha"
import CaptchaNavigation from "@/components/CaptchaNaviguation"

export default function RealCaptcha() {
  return (
    <div>
      <MovableComponent>
        <FakeCaptcha />
      </MovableComponent>
      <CaptchaNavigation />
    </div>
  )
}
