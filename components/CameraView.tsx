"use client";

import { useEffect, useRef, useState } from "react";
import { loadModels, detectFace } from "@/lib/faceDetection";
import { ExpressionAnalyzer } from "@/lib/expressionAnalyzer";
import MeasurementOverlay from "./MeasurementOverlay";
import FaceMaskOverlay from "./FaceMaskOverlay";

interface CameraViewProps {
  onExpressionChange: (score: number) => void;
}

export default function CameraView({ onExpressionChange }: CameraViewProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [hasPermission, setHasPermission] = useState(false);
  const [currentScore, setCurrentScore] = useState(0);
  const [canvasDimensions, setCanvasDimensions] = useState({ width: 0, height: 0 });
  const [faceBox, setFaceBox] = useState<{ x: number; y: number; width: number; height: number } | undefined>();
  const analyzerRef = useRef(new ExpressionAnalyzer());
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    let stream: MediaStream;

    async function init() {
      try {
        // Load face detection models
        setIsLoading(true);
        await loadModels();

        // Request camera access
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 1280 },
            height: { ideal: 720 },
            facingMode: "user",
          },
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => {
            videoRef.current?.play();
            setHasPermission(true);
            setIsLoading(false);
            startDetection();
          };
        }
      } catch (err) {
        console.error("Error initializing:", err);
        setError(
          "Failed to access camera. Please ensure camera permissions are granted."
        );
        setIsLoading(false);
      }
    }

    function startDetection() {
      const detect = async () => {
        if (
          !videoRef.current ||
          !canvasRef.current ||
          videoRef.current.readyState !== 4
        ) {
          animationFrameRef.current = requestAnimationFrame(detect);
          return;
        }

        const video = videoRef.current;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        if (!ctx) return;

        // Set canvas size to match video
        if (canvas.width !== video.videoWidth) {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          setCanvasDimensions({ width: video.videoWidth, height: video.videoHeight });
        }

        // Draw video frame
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Detect face
        const detection = await detectFace(video);

        if (detection) {
          // Analyze expression and update score
          const score = analyzerRef.current.analyzeExpression(
            detection.expressions
          );
          setCurrentScore(score);
          onExpressionChange(score);

          // Update face box for grid overlay and mask
          const detectionBox = detection.detection.box;
          setFaceBox({
            x: detectionBox.x,
            y: detectionBox.y,
            width: detectionBox.width,
            height: detectionBox.height,
          });
        } else {
          // No face detected, still update score (it will decay)
          const score = analyzerRef.current.analyzeExpression({
            neutral: 1,
            happy: 0,
            sad: 0,
            angry: 0,
            fearful: 0,
            disgusted: 0,
            surprised: 0,
          } as any);
          setCurrentScore(score);
          onExpressionChange(score);
          setFaceBox(undefined);
        }

        animationFrameRef.current = requestAnimationFrame(detect);
      };

      detect();
    }

    init();

    // Cleanup
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
      analyzerRef.current.reset();
    };
  }, [onExpressionChange]);

  return (
    <div className="relative w-full aspect-video bg-black shadow-2xl border-4 border-gray-700">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-20 bg-black">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p className="text-gray-300">Loading camera and models...</p>
          </div>
        </div>
      )}

      {error && (
        <div className="absolute inset-0 flex items-center justify-center p-4 z-20 bg-black">
          <div className="bg-red-900/50 backdrop-blur-sm rounded-lg p-6 max-w-md">
            <p className="text-red-200">{error}</p>
          </div>
        </div>
      )}

      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        playsInline
        muted
        style={{ display: hasPermission ? "none" : "block" }}
      />

      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover z-10"
        style={{ display: hasPermission ? "block" : "none" }}
      />

      {/* Face mask overlay - sits between canvas and grid */}
      {hasPermission && faceBox && (
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 15 }}>
          <FaceMaskOverlay
            faceBox={faceBox}
            canvasWidth={canvasDimensions.width}
            canvasHeight={canvasDimensions.height}
          />
        </div>
      )}

      {/* Measurement overlay */}
      {hasPermission && (
        <div className="absolute inset-0 z-20 pointer-events-none">
          <MeasurementOverlay
            canvasWidth={canvasDimensions.width}
            canvasHeight={canvasDimensions.height}
            score={currentScore}
            faceBox={faceBox}
          />
        </div>
      )}
    </div>
  );
}
