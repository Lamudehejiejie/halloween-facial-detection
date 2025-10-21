import * as faceapi from "face-api.js";
import { FaceMaskPosition } from "@/types/face.types";

export function calculateMaskPosition(
  landmarks: faceapi.FaceLandmarks68,
  videoWidth: number,
  videoHeight: number
): FaceMaskPosition {
  const positions = landmarks.positions;

  // Get key facial landmarks
  const leftEye = positions[36]; // Left eye outer corner
  const rightEye = positions[45]; // Right eye outer corner
  const noseTip = positions[30]; // Nose tip
  const chin = positions[8]; // Chin
  const topHead = positions[24]; // Top of nose bridge (approximate top of head)

  // Calculate face dimensions based on actual landmarks
  const eyeDistance = Math.sqrt(
    Math.pow(rightEye.x - leftEye.x, 2) + Math.pow(rightEye.y - leftEye.y, 2)
  );

  // Make the mask cover the full face
  const faceWidth = eyeDistance * 3.5; // Wider to cover full face
  const faceHeight = Math.abs(chin.y - topHead.y) * 1.3; // Taller to cover forehead

  // Calculate center position (between eyes and chin)
  const centerX = (leftEye.x + rightEye.x) / 2;
  const centerY = (topHead.y + chin.y) / 2;

  // Calculate rotation angle based on eyes
  const angle = Math.atan2(rightEye.y - leftEye.y, rightEye.x - leftEye.x);

  console.log('Mask position calculated:', { x: centerX - faceWidth / 2, y: centerY - faceHeight / 2, width: faceWidth, height: faceHeight });

  return {
    x: centerX - faceWidth / 2,
    y: centerY - faceHeight / 2,
    width: faceWidth,
    height: faceHeight,
    angle: angle,
  };
}

export function drawFaceMask(
  ctx: CanvasRenderingContext2D,
  maskImage: HTMLImageElement,
  position: FaceMaskPosition,
  opacity: number = 0.9
): void {
  if (!maskImage || !maskImage.complete || maskImage.naturalWidth === 0) {
    console.warn('Mask image not loaded properly', maskImage);
    return;
  }

  ctx.save();

  // SIMPLE VERSION - NO ROTATION
  // Draw debug rectangle to show mask position
  ctx.strokeStyle = 'red';
  ctx.lineWidth = 5;
  ctx.strokeRect(position.x, position.y, position.width, position.height);

  // Set opacity
  ctx.globalAlpha = opacity;

  // Draw mask directly without rotation
  try {
    ctx.drawImage(
      maskImage,
      position.x,
      position.y,
      position.width,
      position.height
    );
    console.log('Mask drawn successfully at', position.x, position.y, 'size:', position.width, 'x', position.height);
  } catch (e) {
    console.error('Error drawing mask:', e);
  }

  ctx.restore();
}
