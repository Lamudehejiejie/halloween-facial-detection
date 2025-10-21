"use client";

import { useState } from "react";
import CameraView from "@/components/CameraView";

export default function Home() {
  const [expressionScore, setExpressionScore] = useState<number>(0);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center text-white tracking-wide">
        SMILE CHALLENGE
      </h1>

      <p className="mb-6 text-lg text-gray-300 text-center max-w-2xl">
        Keep smiling to reach 100%! The score drops if you stop smiling.
      </p>

      <div className="w-full max-w-5xl">
        <CameraView onExpressionChange={setExpressionScore} />
      </div>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-500">
          Your video is processed locally and never leaves your device.
        </p>
      </div>
    </main>
  );
}
