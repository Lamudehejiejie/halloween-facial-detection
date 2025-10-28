"use client";

import { useState } from "react";
import CameraView from "@/components/CameraView";

export default function Home() {
  const [expressionScore, setExpressionScore] = useState<number>(0);

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center p-8"
      style={{
        background: '#a8b8c8',
        fontFamily: 'MS Gothic, Courier New, monospace',
      }}
    >
      {/* Retro Windows-style Header */}
      <div
        className="mb-4 w-full max-w-7xl"
        style={{
          background: '#c0c0c0',
          border: '2px outset #ffffff',
          padding: '4px',
        }}
      >
        <div
          style={{
            background: '#000080',
            padding: '8px 12px',
            color: '#ffffff',
            fontSize: '18px',
            fontWeight: 'bold',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span>■ 勤務時間識別システム</span>
          <div style={{ display: 'flex', gap: '4px' }}>
            <button
              style={{
                width: '24px',
                height: '24px',
                background: '#c0c0c0',
                border: '2px outset #ffffff',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
            >
              _
            </button>
            <button
              style={{
                width: '24px',
                height: '24px',
                background: '#c0c0c0',
                border: '2px outset #ffffff',
                fontSize: '14px',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
            >
              □
            </button>
            <button
              style={{
                width: '24px',
                height: '24px',
                background: '#c0c0c0',
                border: '2px outset #ffffff',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
            >
              ×
            </button>
          </div>
        </div>
        <div
          style={{
            background: '#c0c0c0',
            padding: '12px',
          }}
        >
          <p
            style={{
              fontSize: '14px',
              color: '#000000',
              marginBottom: '8px',
            }}
          >
            社長の言う質問をしっかり聞いて下さい。
          </p>
          <div
            style={{
              background: '#ffffff',
              border: '2px inset #808080',
              padding: '4px 8px',
              fontSize: '16px',
              color: '#000000',
            }}
          >
            TELL ME YOUR BILLABLE HOURS.
          </div>
        </div>
      </div>

      {/* Camera container - retro Windows style */}
      <div
        className="w-full max-w-7xl aspect-video"
        style={{
          background: '#c0c0c0',
          border: '2px outsetrgb(0, 0, 0)',
          padding: '4px',
        }}
      >
        <CameraView onExpressionChange={setExpressionScore} />
      </div>

      {/* Footer - retro status bar style */}
      <div
        className="mt-4 w-full max-w-7xl"
        style={{
          background: '#c0c0c0',
          border: '2px inset #808080',
          padding: '4px 8px',
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '12px',
        }}
      >
        <span style={{ color: '#000000' }}>準備完了</span>
        <span style={{ color: '#000000' }}>Ver 5.12.38</span>
      </div>
    </main>
  );
}
