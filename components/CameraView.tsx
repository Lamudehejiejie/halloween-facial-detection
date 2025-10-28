"use client";

import { useEffect, useRef, useState } from "react";
import { loadModels, detectFace } from "@/lib/faceDetection";
import MeasurementOverlay from "./MeasurementOverlay";
import FaceMaskOverlay from "./FaceMaskOverlay";

// Sentence pools for each mask
const SENTENCES = {
  marc: [
    "marc1",
    "marc2",
    "marc3",
    "marc4",
    "marc5",
    "marc6",
  ],
  tomo: [
    "tomo1",
    "tomo2",
    "tomo3",
    "tomo4",
    "tomo5",
    "tomo6",
  ],
  heng: [
    "heng1",
    "heng2",
    "heng3",
    "heng4",
    "heng5",
    "heng6",
  ],
};

interface CameraViewProps {
  onExpressionChange: (score: number) => void;
}

export default function CameraView({ onExpressionChange }: CameraViewProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [hasPermission, setHasPermission] = useState(false);
  const [canvasDimensions, setCanvasDimensions] = useState({ width: 0, height: 0 });
  const [faceBoxes, setFaceBoxes] = useState<Array<{ x: number; y: number; width: number; height: number; maskId: string; sentence: string; maskType: string }>>([]);
  const animationFrameRef = useRef<number>();
  const lastSwapTimeRef = useRef<number>(Date.now());
  const lastRenderTimeRef = useRef<number>(0);
  const currentFacesRef = useRef<Array<{ x: number; y: number; width: number; height: number; maskId: string; sentence: string; maskType: string }>>([]);

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
        if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
          if (video.videoWidth > 0 && video.videoHeight > 0) {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            setCanvasDimensions({ width: video.videoWidth, height: video.videoHeight });
          } else {
            // Skip this frame if video dimensions aren't ready
            animationFrameRef.current = requestAnimationFrame(detect);
            return;
          }
        }

        // Draw video frame
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Detect faces
        const detections = await detectFace(video);

        if (detections && detections.length > 0) {
          const currentTime = Date.now();
          const shouldSwap = currentTime - lastSwapTimeRef.current > 5000; // Change every 5000ms (5 seconds)

          const newFaceBoxes = detections.map((detection, index) => {
            const detectionBox = detection.detection.box;
            const maskId = `face-${index}`; // Use index to keep face stable

            // Find previous face data from ref (not state)
            const prevFace = currentFacesRef.current[index];

            let maskType: string;
            let sentence: string;

            if (shouldSwap || !prevFace) {
              // Time to swap or new face - generate random mask and sentence
              const maskTypes = ['marc', 'tomo', 'heng'];
              maskType = maskTypes[Math.floor(Math.random() * maskTypes.length)];
              const sentences = SENTENCES[maskType as keyof typeof SENTENCES];
              sentence = sentences[Math.floor(Math.random() * sentences.length)];
            } else {
              // Keep previous mask and sentence
              maskType = prevFace.maskType;
              sentence = prevFace.sentence;
            }

            return {
              x: detectionBox.x,
              y: detectionBox.y,
              width: detectionBox.width,
              height: detectionBox.height,
              maskId,
              sentence,
              maskType,
            };
          });

          // Update ref immediately (no re-render)
          currentFacesRef.current = newFaceBoxes;

          // Only update state every 100ms to reduce flickering, OR when swapping
          const shouldRender = currentTime - lastRenderTimeRef.current > 100 || shouldSwap;

          if (shouldRender) {
            setFaceBoxes(newFaceBoxes);
            lastRenderTimeRef.current = currentTime;
          }

          if (shouldSwap) {
            lastSwapTimeRef.current = currentTime;
          }
        } else {
          currentFacesRef.current = [];
          setFaceBoxes([]);
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
    };
  }, [onExpressionChange]);

  return (
    <div className="relative w-full h-full" style={{ background: '#000000', border: '2px inset #808080' }}>
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
        className="absolute inset-0 w-full h-full object-contain z-10"
        style={{ display: hasPermission ? "block" : "none" }}
      />

      {/* Face mask overlay - sits between canvas and grid */}
      {hasPermission && faceBoxes.length > 0 && (
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 15 }}>
          <FaceMaskOverlay
            faceBoxes={faceBoxes}
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
            faceBoxes={faceBoxes}
          />
        </div>
      )}
    </div>
  );
}
