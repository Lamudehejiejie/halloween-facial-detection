"use client";

import { useEffect, useState } from "react";

export default function TestMask() {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState("");
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      console.log("Image loaded successfully!");
      console.log("Natural dimensions:", img.naturalWidth, "x", img.naturalHeight);
      setImageLoaded(true);
      setImageDimensions({ width: img.naturalWidth, height: img.naturalHeight });
    };
    img.onerror = (e) => {
      console.error("Image failed to load:", e);
      setImageError("Failed to load image");
    };
    img.src = "/masks/mask1.png";
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-bold mb-4">Mask Image Test</h1>

      <div className="mb-4">
        <p>Image Status: {imageLoaded ? "✅ Loaded" : imageError || "Loading..."}</p>
        {imageLoaded && (
          <p>Dimensions: {imageDimensions.width} x {imageDimensions.height}</p>
        )}
      </div>

      <div className="border border-white p-4">
        <h2 className="text-xl mb-2">Direct Image Tag:</h2>
        <img
          src="/masks/mask1.png"
          alt="Mask"
          style={{ maxWidth: "500px", border: "2px solid red" }}
          onLoad={() => console.log("img tag loaded")}
          onError={() => console.log("img tag error")}
        />
      </div>

      <div className="border border-white p-4 mt-4">
        <h2 className="text-xl mb-2">Canvas Drawing Test:</h2>
        <canvas
          ref={(canvas) => {
            if (canvas && imageLoaded) {
              const ctx = canvas.getContext("2d");
              const img = new Image();
              img.onload = () => {
                canvas.width = 500;
                canvas.height = 500;
                if (ctx) {
                  ctx.fillStyle = "blue";
                  ctx.fillRect(0, 0, 500, 500);
                  ctx.globalAlpha = 0.9;
                  ctx.drawImage(img, 50, 50, 400, 400);
                  console.log("Canvas draw complete");
                }
              };
              img.src = "/masks/mask1.png";
            }
          }}
          style={{ border: "2px solid green", maxWidth: "500px" }}
        />
      </div>
    </div>
  );
}
