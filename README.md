# Facial Expression Detector

A real-time web application that detects facial expressions and overlays a realistic face mask. Built with Next.js, TypeScript, and face-api.js.

## Features

- Real-time facial detection using webcam
- Expression analysis (smile/sad detection)
- Dynamic percentage meter (0-100%)
- Realistic face overlay with blending
- Works on mobile and desktop
- Privacy-focused: all processing happens in the browser

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Download Face Detection Models

Download the face-api.js models and place them in the `public/models` directory:

- [Download models](https://github.com/justadudewhohacks/face-api.js/tree/master/weights)

Required models:
- `tiny_face_detector_model-weights_manifest.json`
- `tiny_face_detector_model-shard1`
- `face_landmark_68_model-weights_manifest.json`
- `face_landmark_68_model-shard1`
- `face_expression_model-weights_manifest.json`
- `face_expression_model-shard1`

### 3. Add Face Mask Image

Add your realistic face mask PNG image to `public/masks/mask1.png`

The image should:
- Be a transparent PNG
- Show a realistic face (front-facing)
- Have good resolution (at least 512x512px)
- Include transparency around the face edges for blending

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for Production

```bash
npm run build
npm start
```

## Deploy to Vercel

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Deploy!

## How It Works

1. **Camera Access**: Requests webcam permission
2. **Face Detection**: Uses TinyFaceDetector for fast detection
3. **Landmark Detection**: Identifies 68 facial landmarks
4. **Expression Analysis**: Detects smile (increases %) and sadness (decreases %)
5. **Face Overlay**: Positions and blends mask over detected face
6. **Real-time Updates**: Runs at 30-60 FPS

## Architecture

```
app/
  ├── page.tsx              # Main page component
  ├── layout.tsx            # Root layout
  └── globals.css           # Global styles

components/
  ├── CameraView.tsx        # Camera & face detection
  └── ExpressionMeter.tsx   # Score display

lib/
  ├── faceDetection.ts      # Face-api.js wrapper
  ├── expressionAnalyzer.ts # Expression scoring logic
  └── faceBlending.ts       # Mask positioning & rendering

types/
  └── face.types.ts         # TypeScript interfaces
```

## Customization

### Adjust Expression Sensitivity

Edit `lib/expressionAnalyzer.ts`:
- `SCORE_CHANGE_RATE`: How fast the score changes (default: 2)
- Expression thresholds: Change detection sensitivity

### Change Face Mask

Replace `public/masks/mask1.png` with your own image.

### Modify Colors

Edit `components/ExpressionMeter.tsx` to change color scheme.

## Browser Compatibility

- Chrome/Edge: Full support
- Safari: iOS 11+, macOS 11+
- Firefox: Full support

Requires WebRTC and WebGL support.

## License

MIT
