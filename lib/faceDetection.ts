import * as faceapi from "face-api.js";

let modelsLoaded = false;

export async function loadModels(): Promise<void> {
  if (modelsLoaded) return;

  const MODEL_URL = "/models";

  await Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
    faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
    faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
  ]);

  modelsLoaded = true;
}

export async function detectFace(
  input: HTMLVideoElement | HTMLImageElement
): Promise<faceapi.WithFaceExpressions<{
  detection: faceapi.FaceDetection;
  landmarks: faceapi.FaceLandmarks68;
}> | undefined> {
  const detection = await faceapi
    .detectSingleFace(input, new faceapi.TinyFaceDetectorOptions())
    .withFaceLandmarks()
    .withFaceExpressions();

  return detection;
}

export function areFaceModelsLoaded(): boolean {
  return modelsLoaded;
}
