"use client";

interface FaceBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface MeasurementOverlayProps {
  canvasWidth: number;
  canvasHeight: number;
  score: number;
  faceBox?: FaceBox;
}

export default function MeasurementOverlay({
  canvasWidth,
  canvasHeight,
  score,
  faceBox,
}: MeasurementOverlayProps) {
  if (!canvasWidth || !canvasHeight) return null;

  // Use detected face position or fallback to center
  const box = faceBox || {
    x: canvasWidth * 0.3,
    y: canvasHeight * 0.15,
    width: canvasWidth * 0.4,
    height: canvasHeight * 0.7,
  };

  // Calculate center X of the face for vertical line
  const faceCenterX = box.x + box.width / 2;

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox={`0 0 ${canvasWidth} ${canvasHeight}`}
      preserveAspectRatio="none"
    >
      {/* Vertical center line through face */}
      <line
        x1={faceCenterX}
        y1={box.y}
        x2={faceCenterX}
        y2={box.y + box.height}
        stroke="rgba(255, 255, 255, 0.6)"
        strokeWidth="2"
        strokeDasharray="10,10"
      />

      {/* Horizontal guide lines aligned with face */}
      {/* Top of head */}
      <line
        x1={box.x - 20}
        y1={box.y}
        x2={box.x + box.width + 20}
        y2={box.y}
        stroke="rgba(255, 255, 255, 0.5)"
        strokeWidth="2"
        strokeDasharray="5,5"
      />

      {/* Eyes level */}
      <line
        x1={box.x - 20}
        y1={box.y + box.height * 0.3}
        x2={box.x + box.width + 20}
        y2={box.y + box.height * 0.3}
        stroke="rgba(255, 255, 255, 0.4)"
        strokeWidth="1"
        strokeDasharray="5,5"
      />

      {/* Nose level */}
      <line
        x1={box.x - 20}
        y1={box.y + box.height * 0.5}
        x2={box.x + box.width + 20}
        y2={box.y + box.height * 0.5}
        stroke="rgba(255, 255, 255, 0.4)"
        strokeWidth="1"
        strokeDasharray="5,5"
      />

      {/* Mouth level */}
      <line
        x1={box.x - 20}
        y1={box.y + box.height * 0.7}
        x2={box.x + box.width + 20}
        y2={box.y + box.height * 0.7}
        stroke="rgba(255, 255, 255, 0.4)"
        strokeWidth="1"
        strokeDasharray="5,5"
      />

      {/* Chin */}
      <line
        x1={box.x - 20}
        y1={box.y + box.height}
        x2={box.x + box.width + 20}
        y2={box.y + box.height}
        stroke="rgba(255, 255, 255, 0.5)"
        strokeWidth="2"
        strokeDasharray="5,5"
      />

      {/* Face measurement rectangle */}
      <rect
        x={box.x}
        y={box.y}
        width={box.width}
        height={box.height}
        fill="none"
        stroke="rgba(255, 255, 255, 0.6)"
        strokeWidth="2"
      />

      {/* Corner markers */}
      {[
        [box.x, box.y],
        [box.x + box.width, box.y],
        [box.x, box.y + box.height],
        [box.x + box.width, box.y + box.height],
      ].map(([x, y], i) => (
        <g key={i}>
          <line
            x1={x - 15}
            y1={y}
            x2={x + 15}
            y2={y}
            stroke="white"
            strokeWidth="2"
          />
          <line
            x1={x}
            y1={y - 15}
            x2={x}
            y2={y + 15}
            stroke="white"
            strokeWidth="2"
          />
        </g>
      ))}

      {/* Score display in top right */}
      <g>
        <rect
          x={canvasWidth - 200}
          y="20"
          width="180"
          height="80"
          fill="rgba(0, 0, 0, 0.7)"
          stroke="white"
          strokeWidth="2"
        />
        <text
          x={canvasWidth - 110}
          y="55"
          textAnchor="middle"
          fill="white"
          fontSize="40"
          fontWeight="bold"
          fontFamily="monospace"
        >
          {score}%
        </text>
        <text
          x={canvasWidth - 110}
          y="85"
          textAnchor="middle"
          fill="rgba(255, 255, 255, 0.8)"
          fontSize="16"
          fontFamily="monospace"
        >
          SMILE LEVEL
        </text>
      </g>
    </svg>
  );
}
