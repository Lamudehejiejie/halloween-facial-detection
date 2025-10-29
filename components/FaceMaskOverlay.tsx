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
  landmarks?: any;
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
        // Calculate mask size - proportional to face size
        const maskWidth = faceBox.width * 1.5;
        const maskHeight = faceBox.height * 1.5;

        // Calculate mask position
        let maskX: number;
        let maskY: number;

        if (faceBox.landmarks) {
          // Use landmarks for accurate positioning
          // Get nose position (landmark point 30 is nose tip)
          const nose = faceBox.landmarks.getNose();
          const noseTip = nose[3]; // Middle point of nose

          // Position mask centered on nose, shifted up
          maskX = noseTip.x - maskWidth / 2;
          maskY = noseTip.y - maskHeight * 0.65; // Position above nose
        } else {
          // Fallback: center on face box, shifted up proportionally
          maskX = faceBox.x - (maskWidth - faceBox.width) / 2;
          maskY = faceBox.y - (maskHeight - faceBox.height) / 2 - faceBox.height * 0.3;
        }

        // Boundary checking to prevent cropping
        // Add padding to ensure mask stays visible
        const padding = 20;
        maskX = Math.max(padding, Math.min(maskX, canvasWidth - maskWidth - padding));
        maskY = Math.max(padding, Math.min(maskY, canvasHeight - maskHeight - padding));

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
