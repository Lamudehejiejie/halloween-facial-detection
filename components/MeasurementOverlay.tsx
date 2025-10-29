"use client";

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

interface MeasurementOverlayProps {
  canvasWidth: number;
  canvasHeight: number;
  faceBoxes: FaceBox[];
}

export default function MeasurementOverlay({
  canvasWidth,
  canvasHeight,
  faceBoxes,
}: MeasurementOverlayProps) {
  if (!canvasWidth || !canvasHeight) return null;

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox={`0 0 ${canvasWidth} ${canvasHeight}`}
      preserveAspectRatio="none"
    >
      {/* Face rectangles with corner markers - Bold Showa style */}
      {faceBoxes.map((box) => {
        // Match mask size (2x face size) and positioning
        const maskWidth = box.width * 2;
        const maskHeight = box.height * 2;

        // Calculate position to match mask (centered around nose if landmarks available)
        let rectX: number;
        let rectY: number;

        if (box.landmarks) {
          const nose = box.landmarks.getNose();
          const noseTip = nose[3];
          rectX = noseTip.x - maskWidth / 2;
          rectY = noseTip.y - maskHeight * 0.5;
        } else {
          rectX = box.x - (maskWidth - box.width) / 2;
          rectY = box.y - (maskHeight - box.height) / 2;
        }

        const rectWidth = maskWidth;
        const rectHeight = maskHeight;

        return (
          <g key={box.maskId}>
            {/* Face rectangle - retro style */}
            <rect
              x={rectX}
              y={rectY}
              width={rectWidth}
              height={rectHeight}
              fill="none"
              stroke="#00ffff"
              strokeWidth="6"
            />

            {/* Corner markers - retro style */}
            {[
              [rectX, rectY],
              [rectX + rectWidth, rectY],
              [rectX, rectY + rectHeight],
              [rectX + rectWidth, rectY + rectHeight],
            ].map(([x, y], i) => (
              <g key={`${box.maskId}-corner-${i}`}>
                <line
                  x1={x - 50}
                  y1={y}
                  x2={x + 50}
                  y2={y}
                  stroke="#ff00ff"
                  strokeWidth="8"
                />
                <line
                  x1={x}
                  y1={y - 50}
                  x2={x}
                  y2={y + 50}
                  stroke="#ff00ff"
                  strokeWidth="8"
                />
              </g>
            ))}
          </g>
        );
      })}

      {/* Sentences at top-right corner of each measurement overlay */}
      {faceBoxes.map((box) => {
        // Match mask size (2x face size) and positioning
        const maskWidth = box.width * 2;
        const maskHeight = box.height * 2;

        // Calculate position to match mask (centered around nose if landmarks available)
        let rectX: number;
        let rectY: number;

        if (box.landmarks) {
          const nose = box.landmarks.getNose();
          const noseTip = nose[3];
          rectX = noseTip.x - maskWidth / 2;
          rectY = noseTip.y - maskHeight * 0.5;
        } else {
          rectX = box.x - (maskWidth - box.width) / 2;
          rectY = box.y - (maskHeight - box.height) / 2;
        }

        const rectWidth = maskWidth;
        const rectHeight = maskHeight;

        const boxWidth = Math.max(500, box.sentence.length * 22);
        const boxHeight = 110;
        let startX = rectX + rectWidth + 15;
        let startY = rectY;

        // Boundary checking for horizontal overflow
        // If text box goes beyond canvas width, position it on the left side of face
        if (startX + boxWidth > canvasWidth) {
          startX = rectX - boxWidth - 15;
        }
        // Ensure it doesn't go off the left edge either
        if (startX < 0) {
          startX = 10;
        }

        // Boundary checking for vertical overflow
        if (startY + boxHeight > canvasHeight) {
          startY = canvasHeight - boxHeight - 10;
        }
        if (startY < 0) {
          startY = 10;
        }

        return (
          <g
            key={`sentence-${box.maskId}`}
            transform={`scale(-1, 1) translate(${-canvasWidth}, 0)`}
          >
            {/* Retro Windows button style - outer light border */}
            <rect
              x={startX}
              y={startY}
              width={boxWidth}
              height={boxHeight}
              fill="#c0c0c0"
            />
            {/* Top-left white highlight */}
            <line
              x1={startX}
              y1={startY + boxHeight}
              x2={startX}
              y2={startY}
              stroke="#ffffff"
              strokeWidth="6"
            />
            <line
              x1={startX}
              y1={startY}
              x2={startX + boxWidth}
              y2={startY}
              stroke="#ffffff"
              strokeWidth="6"
            />
            {/* Bottom-right dark shadow */}
            <line
              x1={startX + boxWidth}
              y1={startY}
              x2={startX + boxWidth}
              y2={startY + boxHeight}
              stroke="#808080"
              strokeWidth="6"
            />
            <line
              x1={startX}
              y1={startY + boxHeight}
              x2={startX + boxWidth}
              y2={startY + boxHeight}
              stroke="#808080"
              strokeWidth="6"
            />
            {/* Text - simple black on gray */}
            <text
              x={startX + boxWidth / 2}
              y={startY + boxHeight / 2 + 12}
              textAnchor="middle"
              fill="#000000"
              fontSize="32"
              fontWeight="bold"
              fontFamily="MS Gothic, Courier New, monospace"
            >
              {box.sentence}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
