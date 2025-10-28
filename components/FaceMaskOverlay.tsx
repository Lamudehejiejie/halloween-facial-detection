"use client";

import { useMemo } from "react";

interface FaceBox {
  x: number;
  y: number;
  width: number;
  height: number;
  maskId: string;
  sentence: string;
  maskType: string;
}

interface FaceMaskOverlayProps {
  faceBoxes: FaceBox[];
  canvasWidth: number;
  canvasHeight: number;
}

// Available mask images - order matches the mask types
const MASK_IMAGES = [
  "/masks/mask_heng.png",  // index 0 = heng
  "/masks/mask_marc.png",  // index 1 = marc
  "/masks/mask_tomo.png",  // index 2 = tomo
];

export default function FaceMaskOverlay({
  faceBoxes,
  canvasWidth,
  canvasHeight,
}: FaceMaskOverlayProps) {
  if (!faceBoxes || faceBoxes.length === 0 || !canvasWidth || !canvasHeight) return null;

  return (
    <>
      {faceBoxes.map((faceBox, index) => {
        // Make mask slightly larger than face box
        const maskWidth = faceBox.width * 1.4;
        const maskHeight = faceBox.height * 1.4;
        const maskX = faceBox.x - (maskWidth - faceBox.width) / 2 + 10;
        const maskY = faceBox.y - (maskHeight - faceBox.height) / 2 - 90;

        // Get mask based on the maskType from the faceBox
        const maskIndex = faceBox.maskType === 'marc' ? 1 : faceBox.maskType === 'tomo' ? 2 : 0;
        const maskSrc = MASK_IMAGES[maskIndex];

        return (
          <div
            key={faceBox.maskId}
            className="absolute pointer-events-none transition-all duration-75 ease-out"
            style={{
              left: `${(maskX / canvasWidth) * 100}%`,
              top: `${(maskY / canvasHeight) * 100}%`,
              width: `${(maskWidth / canvasWidth) * 100}%`,
              height: `${(maskHeight / canvasHeight) * 100}%`,
            }}
          >
            <img
              src={maskSrc}
              alt="Face mask overlay"
              className="w-full h-full object-cover"
              style={{
                opacity: 1,
                mixBlendMode: "normal",
              }}
            />
          </div>
        );
      })}
    </>
  );
}
