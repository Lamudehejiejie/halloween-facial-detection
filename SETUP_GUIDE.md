# Setup Guide

Follow these steps to get your facial expression detector running.

## Prerequisites

- Node.js 18+ installed
- A code editor (you're using Cursor!)
- A webcam (built-in or external)

## Step-by-Step Setup

### 1. Install Dependencies

Open terminal in this directory and run:

```bash
npm install
```

This will install all required packages including Next.js, React, face-api.js, and Tailwind CSS.

### 2. Download Face Detection Models

**Important**: The models are too large for Git, so you need to download them manually.

1. Visit: https://github.com/justadudewhohacks/face-api.js/tree/master/weights
2. Download these 6 files:
   - `tiny_face_detector_model-weights_manifest.json`
   - `tiny_face_detector_model-shard1`
   - `face_landmark_68_model-weights_manifest.json`
   - `face_landmark_68_model-shard1`
   - `face_expression_model-weights_manifest.json`
   - `face_expression_model-shard1`

3. Place all files in `public/models/` directory

**Quick tip**: Right-click each file in GitHub and select "Save link as..."

### 3. Add Your Face Mask

1. Prepare a realistic face image:
   - PNG format with transparent background
   - At least 512x512 pixels
   - Front-facing face
   - Neutral expression works best

2. Save it as `public/masks/mask1.png`

**Don't have a face mask?** You can:
- Use a placeholder temporarily (search "transparent face png")
- Create one using photo editing software
- Use AI tools to generate a face

### 4. Run Development Server

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

**Grant camera permission** when prompted!

### 5. Test the Application

1. You should see yourself on camera
2. The face mask should overlay on your face
3. Smile → percentage increases
4. Look sad → percentage decreases

## Troubleshooting

### "Failed to load models"
- Check that all 6 model files are in `public/models/`
- Verify filenames match exactly (case-sensitive)

### "Camera not accessible"
- Grant camera permissions in browser
- Check if another app is using the camera
- Try a different browser (Chrome/Edge recommended)

### Face mask not showing
- Ensure `mask1.png` exists in `public/masks/`
- Check browser console for image loading errors
- Verify the image is valid PNG format

### Low performance
- Use a lighter model (already using TinyFaceDetector)
- Reduce video resolution in `CameraView.tsx`
- Close other apps to free up resources

## Git Setup

Initialize Git repository:

```bash
git init
git add .
git commit -m "Initial commit: Facial expression detector"
```

Create a GitHub repository and push:

```bash
git remote add origin <your-github-repo-url>
git branch -M main
git push -u origin main
```

## Deploy to Vercel

### Option 1: Via Vercel Dashboard

1. Go to https://vercel.com
2. Sign in with GitHub
3. Click "New Project"
4. Import your repository
5. Click "Deploy"

### Option 2: Via CLI

```bash
npm i -g vercel
vercel login
vercel
```

Follow the prompts to deploy.

### Important for Deployment

Make sure your Git repository includes:
- ✅ All source code
- ✅ `public/models/` folder with model files
- ✅ `public/masks/` folder with mask image(s)

**Note**: Model files are large (~5-10MB total). Ensure they're committed to Git or your deployment will fail.

## Next Steps

- Customize the face mask
- Adjust expression sensitivity in `lib/expressionAnalyzer.ts`
- Change colors in `components/ExpressionMeter.tsx`
- Add multiple mask options
- Implement screenshot functionality

Enjoy building! 🚀
