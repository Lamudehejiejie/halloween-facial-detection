"use client";

interface FaceBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface FaceMaskOverlayProps {
  faceBox?: FaceBox;
  canvasWidth: number;
  canvasHeight: number;
}

export default function FaceMaskOverlay({
  faceBox,
  canvasWidth,
  canvasHeight,
}: FaceMaskOverlayProps) {
  if (!faceBox || !canvasWidth || !canvasHeight) return null;

  // Make mask slightly larger than face box
  const maskWidth = faceBox.width * 1.3;
  const maskHeight = faceBox.height * 1.3;
  const maskX = faceBox.x - (maskWidth - faceBox.width) / 2;
  const maskY = faceBox.y - (maskHeight - faceBox.height) / 2;

  return (
    <div
      className="absolute pointer-events-none transition-all duration-75 ease-out"
      style={{
        left: `${(maskX / canvasWidth) * 100}%`,
        top: `${(maskY / canvasHeight) * 100}%`,
        width: `${(maskWidth / canvasWidth) * 100}%`,
        height: `${(maskHeight / canvasHeight) * 100}%`,
      }}
    >
      <img
        src="/masks/mask1.png"
        alt="Face mask overlay"
        className="w-full h-full object-cover"
        style={{
          opacity: 0.85,
          mixBlendMode: "normal",
        }}
      />
    </div>
  );
}
