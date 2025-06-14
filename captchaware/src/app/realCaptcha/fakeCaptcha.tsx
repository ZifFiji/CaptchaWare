import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function FakeCaptcha() {
  const [clicked, setClicked] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (clicked) {
      const timeout = setTimeout(() => {
        router.push("/");
      }, 800);

      return () => clearTimeout(timeout);
    }
  }, [clicked, router]);

  return (
    <div className="w-[320px] h-[80px] bg-white shadow-md rounded flex items-center px-4 space-x-3 border border-gray-300">
      <div
        className={`w-6 h-6 border-2 rounded-sm cursor-pointer flex items-center justify-center transition-all duration-200 ${clicked ? "border-green-600 bg-green-100" : "border-red-500 bg-red-100"
          }`}
        onClick={() => {
          setClicked(!clicked);
        }}
        title="You sure you're not a robot?"
      >
        {clicked && (
          <svg
            className="w-4 h-4 text-green-600"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>
      <p className="text-gray-700 text-sm select-none">I'm not a robot</p>
      <div className="ml-auto flex flex-col items-center text-gray-500 text-[10px]">
        <div className="flex items-center space-x-1">
          <svg className="w-4 h-4 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L15 8H9L12 2ZM2 12L8 15V9L2 12ZM12 22L9 16H15L12 22ZM22 12L16 9V15L22 12Z" />
          </svg>
          <span className="font-semibold text-xs">reCAPTCHA</span>
        </div>
        <div>
          <a href="#" className="hover:underline">Privacy</a> - <a href="#" className="hover:underline">Terms</a>
        </div>
      </div>
    </div>
  );
}
