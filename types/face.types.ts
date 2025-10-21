import * as faceapi from "face-api.js";

export interface FaceDetectionResult {
  detection: faceapi.FaceDetection;
  landmarks: faceapi.FaceLandmarks68;
  expressions: faceapi.FaceExpressions;
}

export interface ExpressionScores {
  happy: number;
  sad: number;
  neutral: number;
  angry: number;
  surprised: number;
  disgusted: number;
  fearful: number;
}

export interface FaceMaskPosition {
  x: number;
  y: number;
  width: number;
  height: number;
  angle: number;
}
