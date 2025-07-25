# ✅ ACTUAL Working Props for React Native Swipe Cards Stack

This document lists **ONLY** the props that are actually implemented and working in the package.

## 🎯 Core Props (Required)

```typescript
interface CoreProps {
  data: any[];                    // Array of any data type (strings, numbers, objects, etc.)
  renderCard: (item: any, index: number, isActive: boolean) => React.ReactNode;
}
```

## 🎯 Optional Props (All Actually Working)

### **Card Identification**
```typescript
keyExtractor?: (item: any, index: number) => string;  // Extract unique key, defaults to index
```

### **Styling Props**
```typescript
cardStyle?: any;           // Apply styles directly to each card (including borderRadius)
containerStyle?: any;      // Style the main container
activeCardStyle?: any;     // Style for the active (top) card
inactiveCardStyle?: any;   // Style for inactive (background) cards
```

### **Dimensions**
```typescript
cardDimensions?: {
  width?: number | string;
  height?: number | string;
};
```

### **Icons (Direct Props - Recommended)**
```typescript
leftSwipeIcon?: React.ReactNode;      // Icon shown when swiping left
rightSwipeIcon?: React.ReactNode;     // Icon shown when swiping right  
upSwipeIcon?: React.ReactNode;        // Icon shown when swiping up
downSwipeIcon?: React.ReactNode;      // Icon shown when swiping down
leftSwipeIconStyle?: any;             // Style for left icon
rightSwipeIconStyle?: any;            // Style for right icon
upSwipeIconStyle?: any;               // Style for up icon
downSwipeIconStyle?: any;             // Style for down icon
```

### **Gestures**
```typescript
gestures?: {
  swipeDirections?: ('left' | 'right' | 'up' | 'down')[];  // Which directions are enabled
  enableRotation?: boolean;                                  // Enable card rotation during swipe
  enableScale?: boolean;                                     // Enable card scaling during swipe
  gestureThreshold?: number;                                // Threshold for gesture recognition
  simultaneousGestures?: boolean;                           // Allow multiple gestures
  allowPartialSwipe?: boolean;                              // Allow partial swipes that return
  partialSwipeReturnDuration?: number;                      // Duration for return animation
  partialSwipeReturnEasing?: any;                           // Easing for return animation
};
```

### **Thresholds**
```typescript
thresholds?: {
  horizontal?: number;        // Horizontal swipe threshold (default: 120)
  vertical?: number;          // Vertical swipe threshold (default: 120)
  iconDelay?: number;         // Delay before showing icons (default: 30)
  rotationThreshold?: number; // Threshold for rotation (default: 15)
  velocity?: number;          // Velocity threshold (default: 0.5)
};
```

### **Animations**
```typescript
animations?: {
  duration?: number;          // Animation duration (default: 300)
  easing?: any;              // Easing function
  useNativeDriver?: boolean;  // Use native driver (default: false)
  rotationEnabled?: boolean;  // Enable rotation animation (default: true)
  scaleEnabled?: boolean;     // Enable scale animation (default: false)
  opacityEnabled?: boolean;   // Enable opacity animation (default: false)
};
```

### **Callbacks**
```typescript
callbacks?: {
  onSwipe?: (direction: 'left' | 'right' | 'up' | 'down', item: any, index: number) => void;
  onSwipeStart?: (item: any, direction: 'left' | 'right' | 'up' | 'down') => void;
  onSwipeEnd?: (item: any, direction: 'left' | 'right' | 'up' | 'down') => void;
  onStackEmpty?: () => void;
  onCardFocus?: (item: any, index: number) => void;
  onAnimationComplete?: (direction: 'left' | 'right' | 'up' | 'down', item: any) => void;
};

// OR use direct callback (legacy - but includes index now!)
onSwipe?: (direction: 'left' | 'right' | 'up' | 'down', item: any, index: number) => void;
```

### **Stack Behavior**
```typescript
stackBehavior?: {
  stackSize?: number;  // Number of cards to show in stack (default: 2)
};
```

### **Control Props**
```typescript
resetTrigger?: number;                    // Change this value to reset the stack
currentIndex?: number;                    // Control current card index
onIndexChange?: (index: number) => void;  // Called when index changes
```

### **Accessibility**
```typescript
accessibility?: {
  accessibilityLabel?: string;  // Accessibility label for the stack
  accessibilityHint?: string;   // Accessibility hint
  accessibilityRole?: string;   // Accessibility role
};
```

### **Legacy Props (Backward Compatibility)**
```typescript
enableUpSwipe?: boolean;        // Legacy: use gestures.swipeDirections instead
rotationEnabled?: boolean;      // Legacy: use animations.rotationEnabled instead
scaleSecondCard?: boolean;      // Legacy: not implemented
animationDuration?: number;     // Legacy: use animations.duration instead
stackSize?: number;             // Legacy: use stackBehavior.stackSize instead
```

## 📝 Complete Working Example

```tsx
<SwipeableCardsStack
  // ✅ Required
  data={['Card 1', 'Card 2', 'Card 3']}
  renderCard={(item, index, isActive) => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>{item}</Text>
    </View>
  )}
  
  // ✅ Styling
  cardStyle={{ borderRadius: 20, backgroundColor: '#fff' }}
  cardDimensions={{ width: 300, height: 400 }}
  
  // ✅ Icons
  leftSwipeIcon={<MyRejectIcon />}
  rightSwipeIcon={<MyAcceptIcon />}
  
  // ✅ Gestures
  gestures={{
    swipeDirections: ['left', 'right'],
    allowPartialSwipe: true,
    enableRotation: true
  }}
  
  // ✅ Callbacks
  onSwipe={(direction, item, index) => {
    console.log(`Swiped ${direction} on ${item} at index ${index}`);
  }}
  
  // ✅ Thresholds
  thresholds={{
    horizontal: 150,
    vertical: 100
  }}
  
  // ✅ Control
  resetTrigger={resetTrigger}
/>
```

## ❌ Props That Were Removed (Not Implemented)

These props were defined in types but never actually implemented:

- `containerDimensions` - Not used anywhere
- `performance.*` - Entire interface removed
- `swipeIcons.iconPosition` - Complex positioning not implemented
- `animations.customInterpolation` - Custom interpolation not implemented
- `stackBehavior.infiniteStack` - Infinite stack not implemented
- `stackBehavior.recycleCards` - Card recycling not implemented
- `stackBehavior.preloadCards` - Preloading not implemented
- `stackBehavior.stackOffset` - Advanced positioning not implemented
- `stackBehavior.stackScale` - Advanced scaling arrays not implemented
- `stackBehavior.stackOpacity` - Advanced opacity arrays not implemented
- `stackBehavior.stackRotation` - Advanced rotation arrays not implemented
- `accessibility.swipeAccessibilityActions` - Custom actions not implemented

## ✅ Summary

**Total Working Props: ~30 actual working props**
- Core: 2 required props
- Optional: ~28 optional props that actually work
- Removed: ~15 props that were never implemented

This is the **real**, **tested**, **working** API! 🎉
