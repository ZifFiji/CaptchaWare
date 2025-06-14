"use client";
import MovableComponent from "./tilt";
import FakeCaptcha from "./fakeCaptcha";

export default function RealCaptcha() {
  return (
    <MovableComponent>
      <FakeCaptcha></FakeCaptcha>
    </MovableComponent>
  );
}
