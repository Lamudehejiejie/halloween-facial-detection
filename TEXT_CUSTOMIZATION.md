# Text Customization Guide

This guide shows you exactly where to change all the text in the application.

---

## 📱 Main Page Text

**File:** `app/page.tsx`

### Title
```typescript
// Line 11-13
<h1 className="text-4xl md:text-5xl font-bold mb-4 text-center text-white tracking-wide">
  SMILE CHALLENGE
</h1>
```
Change `SMILE CHALLENGE` to your custom title.

### Description
```typescript
// Line 15-17
<p className="mb-6 text-lg text-gray-300 text-center max-w-2xl">
  Keep smiling to reach 100%! The score drops if you stop smiling.
</p>
```
Change the description text here.

### Footer Text
```typescript
// Line 24-26
<p className="text-sm text-gray-500">
  Your video is processed locally and never leaves your device.
</p>
```
Change privacy message here.

---

## 📊 Score Display Text

**File:** `components/MeasurementOverlay.tsx`

### "SMILE LEVEL" Label
```typescript
// Line 163-169
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
```
Change `SMILE LEVEL` to your custom label like:
- `HAPPINESS`
- `JOY METER`
- `SMILE POWER`
- `EXPRESSION`

---

## 📖 Browser Tab Title & Meta

**File:** `app/layout.tsx`

### Page Title (Browser Tab)
```typescript
// Line 6-8
export const metadata: Metadata = {
  title: "Facial Expression Detector",
  description: "Real-time facial expression detection with face overlay",
};
```
Change:
- `title` - Shows in browser tab
- `description` - Used by search engines and social media

---

## 🔄 Loading Messages

**File:** `components/CameraView.tsx`

### Loading Text
```typescript
// Line 149
<p className="text-gray-300">Loading camera and models...</p>
```
Change to:
- `Getting ready...`
- `Initializing face detection...`
- `Loading...`

### Error Message
```typescript
// Line 60
"Failed to access camera. Please ensure camera permissions are granted."
```
Change to your custom error message.

---

## 📝 Quick Examples

### Example 1: Halloween Theme
```typescript
// In app/page.tsx
<h1>SPOOKY SMILE METER</h1>
<p>Show your scariest smile to reach 100%!</p>

// In MeasurementOverlay.tsx
SCARE LEVEL
```

### Example 2: Joy Theme
```typescript
// In app/page.tsx
<h1>JOY DETECTOR</h1>
<p>Spread happiness! Keep smiling to fill the joy meter!</p>

// In MeasurementOverlay.tsx
JOY LEVEL
```

### Example 3: Gaming Theme
```typescript
// In app/page.tsx
<h1>SMILE CHALLENGE</h1>
<p>Power up your smile! Don't let the meter drop!</p>

// In MeasurementOverlay.tsx
POWER LEVEL
```

---

## 🎨 Text Styling

### Change Text Size
In any component, find the `fontSize` or `className`:

```typescript
// Make title bigger
className="text-6xl"  // Instead of text-4xl

// Make score number bigger
fontSize="50"  // Instead of 40
```

### Change Text Color
```typescript
// Make text yellow
fill="yellow"

// Make text red with transparency
fill="rgba(255, 0, 0, 0.8)"

// Using Tailwind classes
className="text-yellow-500"
```

### Change Font
```typescript
// Score display
fontFamily="monospace"  // Can be: "sans-serif", "serif", "cursive"

// Title
className="font-bold"  // Can be: "font-light", "font-normal", "font-semibold"
```

---

## 📍 Complete File Reference

| Text Element | File | Approximate Line |
|-------------|------|------------------|
| Main title | `app/page.tsx` | 11-13 |
| Description | `app/page.tsx` | 15-17 |
| Privacy text | `app/page.tsx` | 24-26 |
| Score label | `components/MeasurementOverlay.tsx` | 163-169 |
| Page title | `app/layout.tsx` | 6-8 |
| Loading text | `components/CameraView.tsx` | 149 |
| Error message | `components/CameraView.tsx` | 60 |

---

## 💡 Tips

1. After changing text, save the file
2. The dev server will auto-reload (if running `npm run dev`)
3. Refresh your browser to see changes
4. For special characters, make sure to use proper encoding
5. Keep text short for mobile displays

---

## 🌐 Multi-language Support

To add multiple languages, you could:

1. Create a `translations` folder with JSON files:
```json
// translations/en.json
{
  "title": "SMILE CHALLENGE",
  "description": "Keep smiling to reach 100%!"
}

// translations/es.json
{
  "title": "DESAFÍO DE SONRISA",
  "description": "¡Sigue sonriendo para llegar al 100%!"
}
```

2. Import and use in components:
```typescript
import en from '@/translations/en.json';

<h1>{en.title}</h1>
```

This is more advanced but allows easy language switching!
