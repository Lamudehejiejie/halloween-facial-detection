# Customization Guide

## 🎭 Face Mask Settings

**File:** `components/FaceMaskOverlay.tsx`

### Adjust Mask Size
```typescript
// Line 24-25: Make mask bigger or smaller
const maskWidth = faceBox.width * 1.3;  // Change 1.3 to make wider/narrower
const maskHeight = faceBox.height * 1.3; // Change 1.3 to make taller/shorter
```

### Adjust Mask Opacity
```typescript
// Line 44: Change transparency (0 = invisible, 1 = fully visible)
opacity: 0.85,  // Change to 0.5 for more transparent, 0.95 for more solid
```

### Adjust Blend Mode
```typescript
// Line 45: Change how mask blends with video
mixBlendMode: "normal",  // Try: "multiply", "screen", "overlay", "soft-light"
```

---

## 📏 Grid Lines Settings

**File:** `components/MeasurementOverlay.tsx`

### Grid Line Colors & Thickness
```typescript
// Vertical center line (Line 43-51)
stroke="rgba(255, 255, 255, 0.6)"  // White at 60% opacity
strokeWidth="2"                     // Line thickness

// Horizontal guide lines (Line 55-107)
stroke="rgba(255, 255, 255, 0.4)"  // White at 40% opacity
strokeWidth="1"                     // Thinner lines

// Face rectangle (Line 110-117)
stroke="rgba(255, 255, 255, 0.6)"  // Border color
strokeWidth="2"                     // Border thickness
```

### Corner Markers
```typescript
// Line 120-145: Change corner crosshair style
stroke="white"      // Color
strokeWidth="2"     // Thickness
x1={x - 15}         // Change 15 to adjust size
```

### Grid Line Positions
```typescript
// Line 66-96: Adjust which facial features the lines align to
y1={box.y + box.height * 0.3}   // Eyes level (30% down)
y1={box.y + box.height * 0.5}   // Nose level (50% down)
y1={box.y + box.height * 0.7}   // Mouth level (70% down)
```

---

## 📊 Score Display Settings

**File:** `components/MeasurementOverlay.tsx`

### Score Box Position & Size
```typescript
// Line 148-181: Score display in top right
x={canvasWidth - 200}  // Distance from right edge
y="20"                 // Distance from top
width="180"            // Box width
height="80"            // Box height
```

### Score Box Colors
```typescript
// Background box (Line 149-154)
fill="rgba(0, 0, 0, 0.7)"    // Black background at 70% opacity
stroke="white"                // Border color
strokeWidth="2"               // Border thickness
```

### Score Text
```typescript
// Percentage number (Line 155-162)
fontSize="40"           // Number size
fontWeight="bold"       // Text weight
fill="white"            // Text color
fontFamily="monospace"  // Font style

// "SMILE LEVEL" label (Line 163-169)
fontSize="16"           // Label size
fill="rgba(255, 255, 255, 0.8)"  // Label color (white at 80%)
```

---

## ⚙️ Expression Detection Settings

**File:** `lib/expressionAnalyzer.ts`

### Score Behavior
```typescript
// Line 4-7: Adjust how fast score changes
private readonly SMOOTHING_FACTOR = 0.15;    // Lower = smoother (0.1-0.3)
private readonly SMILE_INCREASE_RATE = 3;    // Higher = faster increase
private readonly DECAY_RATE = 2.5;           // Higher = faster decay
```

### Smile Sensitivity
```typescript
// Line 16: Adjust when smile is detected
if (happy > 0.3) {  // Change 0.3 to make more/less sensitive (0.1-0.5)
```

---

## 🎨 Color Reference

Common colors you might want to use:

**Transparency Levels:**
- `0.3` = 30% visible (very transparent)
- `0.5` = 50% visible (semi-transparent)
- `0.7` = 70% visible (mostly visible)
- `0.9` = 90% visible (almost solid)
- `1.0` = 100% visible (fully solid)

**Common Colors (RGBA format):**
- White: `rgba(255, 255, 255, 0.6)`
- Black: `rgba(0, 0, 0, 0.7)`
- Red: `rgba(255, 0, 0, 0.5)`
- Green: `rgba(0, 255, 0, 0.5)`
- Blue: `rgba(0, 0, 255, 0.5)`
- Yellow: `rgba(255, 255, 0, 0.5)`
- Cyan: `rgba(0, 255, 255, 0.5)`
- Magenta: `rgba(255, 0, 255, 0.5)`

**Blend Modes:**
- `"normal"` - Standard overlay
- `"multiply"` - Darkens
- `"screen"` - Lightens
- `"overlay"` - Contrast blend
- `"soft-light"` - Subtle blend

---

## 🚀 Quick Customization Examples

### Make grid lines thicker and brighter
```typescript
// In MeasurementOverlay.tsx
strokeWidth="3"                      // Thicker
stroke="rgba(255, 255, 255, 0.9)"   // Brighter
```

### Make mask more transparent
```typescript
// In FaceMaskOverlay.tsx, line 44
opacity: 0.5,  // More see-through
```

### Make score drop slower
```typescript
// In expressionAnalyzer.ts, line 7
private readonly DECAY_RATE = 1.0;  // Slower decay
```

### Change score box to bottom left
```typescript
// In MeasurementOverlay.tsx, line 148-149
x="20"                     // Left side
y={canvasHeight - 100}     // Bottom
```

---

## 📝 Tips

1. After making changes, the dev server will auto-reload
2. Refresh the browser to see changes
3. Use browser DevTools (F12) to inspect elements
4. Test on both desktop and mobile for best results
5. Keep backup copies before making big changes!
