"use client";

import { useState } from "react";
import CameraView from "@/components/CameraView";

export default function Home() {
  const [expressionScore, setExpressionScore] = useState<number>(0);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      });
    }
  };

  return (
    <main
      className="h-screen flex flex-col items-center justify-center p-4"
      style={{
        background: '#a8b8c8',
        fontFamily: 'MS Gothic, Courier New, monospace',
        overflow: 'hidden',
      }}
    >
      {/* Retro Windows-style Header */}
      <div
        className="mb-2 w-full max-w-7xl flex-shrink-0"
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
          <span>■ 思考行動強制システム</span>
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
              onClick={toggleFullscreen}
              style={{
                width: '24px',
                height: '24px',
                background: '#c0c0c0',
                border: '2px outset #ffffff',
                fontSize: '14px',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
              title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
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
            padding: '8px',
          }}
        >
          <p
            style={{
              fontSize: '13px',
              color: '#000000',
              marginBottom: '6px',
            }}
          >
            社長のいうことをしっかり聞いて下さい。
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
            LISTEN TO WHAT THE DIRECTORS SAY.
          </div>
        </div>
      </div>

      {/* Camera container - retro Windows style */}
      <div
        className="w-full max-w-7xl flex-grow"
        style={{
          background: '#c0c0c0',
          border: '2px outset rgb(0, 0, 0)',
          padding: '4px',
          minHeight: 0,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <CameraView onExpressionChange={setExpressionScore} />
      </div>

      {/* Footer - retro status bar style */}
      <div
        className="mt-2 w-full max-w-7xl flex-shrink-0"
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
