# 🎨 Customization Summary

## What's New in the Enhanced NPM Package

### 🚀 Core Improvements

1. **TypeScript First**: Complete type definitions for all props and configurations
2. **Animation Optimized**: Built with React Native's Animated API for smooth 60fps performance
3. **Accessibility Ready**: Full ARIA support and screen reader compatibility
4. **Modular Architecture**: Separate components for better maintainability

### 🎯 New Customization Options

#### 1. Advanced Swipe Icons
```tsx
// Direct icon props (new simplified API)
leftSwipeIcon?: React.ReactNode;         // Custom left swipe icon
rightSwipeIcon?: React.ReactNode;        // Custom right swipe icon
upSwipeIcon?: React.ReactNode;           // Custom up swipe icon
downSwipeIcon?: React.ReactNode;         // Custom down swipe icon
leftSwipeIconStyle?: any;                // Style for left icon
rightSwipeIconStyle?: any;               // Style for right icon
upSwipeIconStyle?: any;                  // Style for up icon
downSwipeIconStyle?: any;                // Style for down icon

// Example usage
<SwipeableCardsStack
  leftSwipeIcon={<CustomRejectIcon />}
  rightSwipeIcon={<CustomAcceptIcon />}
  upSwipeIcon={<CustomSuperLikeIcon />}
  leftSwipeIconStyle={{ backgroundColor: 'red' }}
  rightSwipeIconStyle={{ backgroundColor: 'green' }}
  upSwipeIconStyle={{ backgroundColor: 'blue' }}
  // ... other props
/>
```

#### 2. Gesture Configuration
```tsx
gestures={{
  // Primary direction control (new simplified API)
  swipeDirections: ['left', 'right', 'up', 'down'], // Which directions are enabled
  
  // Animation and visual controls
  enableRotation: true,                    // Enable card rotation during swipe
  enableScale: true,                       // Enable card scaling during swipe
  
  // Advanced gesture settings
  gestureThreshold: 10,                    // Minimum movement to trigger gesture
  simultaneousGestures: false,             // Allow multiple gestures at once
  
  // Partial swipe behavior
  allowPartialSwipe: true,                 // Allow partial swipes that spring back
  partialSwipeReturnDuration: 300,         // Duration for spring-back animation
  partialSwipeReturnEasing: Easing.back(), // Easing for spring-back
}}

// Example usage
<SwipeableCardsStack
  gestures={{
    swipeDirections: ['left', 'right'],     // Only horizontal swipes
    enableRotation: true,
    allowPartialSwipe: true,
  }}
  // ... other props
/>
```

#### 3. Advanced Animations
```tsx
animations={{
  duration: 300,
  easing: Easing.bezier(0.25, 0.46, 0.45, 0.94), // NEW: Custom easing
  useNativeDriver: true,                   // NEW: Native driver support
  rotationEnabled: true,
  scaleEnabled: true,
  opacityEnabled: true,                    // NEW: Opacity control
  customInterpolation: {                   // NEW: Custom interpolation
    inputRange: [-200, -100, 0, 100, 200],
    outputRange: ['-45deg', '-15deg', '0deg', '15deg', '45deg'],
  },
}}
```

#### 4. Stack Behavior
```tsx
stackBehavior={{
  stackSize: 3,
  infiniteStack: true,                     // NEW: Infinite loop
  recycleCards: true,                      // NEW: Card recycling
  preloadCards: 2,                         // NEW: Preloading
  stackOffset: { x: 5, y: -15 },          // NEW: Stack positioning
  stackScale: [1, 0.95, 0.9, 0.85],      // NEW: Multi-card scaling
  stackOpacity: [1, 0.9, 0.7, 0.5],      // NEW: Multi-card opacity
  stackRotation: [0, 2, -1, 3],           // NEW: Stack rotation
}}
```

#### 5. Enhanced Callbacks
```tsx
callbacks={{
  onSwipe: (direction, card, index) => {},         // Card swiped in direction
  onSwipeStart: (card, direction) => {},           // Swipe gesture started
  onSwipeEnd: (card, direction) => {},             // Swipe gesture ended
  onStackEmpty: () => {},                          // All cards swiped
  onCardFocus: (card, index) => {},                // Card became active
  onAnimationComplete: (direction, card) => {},    // Swipe animation finished
  onTap: (card, index) => {},                      // NEW: Card was tapped
  onEmpty: () => {},                               // NEW: Alias for onStackEmpty
}}

// OR use direct callbacks
<SwipeableCardsStack
  onSwipe={(direction, card, index) => {
    console.log(`Swiped ${direction} on card ${index}`);
  }}
  onTap={(card, index) => {
    console.log(`Tapped on card ${index}`);
    // Navigate to detail view, show modal, etc.
  }}
  tapActiveOpacity={0.8}                           // Visual feedback on tap
  // ... other props
/>
```

#### 6. Modal Configuration
```tsx
modal={{
  enableModal: true,
  modalTrigger: 'upSwipe' | 'tap' | 'longPress' | 'doubleTab', // NEW: Multiple triggers
  modalAnimation: 'slide' | 'fade' | 'scale' | 'none', // NEW: Animation types
  modalPosition: 'bottom' | 'top' | 'center' | 'fullscreen', // NEW: Positioning
  modalBackdrop: true,                     // NEW: Backdrop control
  modalBackdropColor: 'rgba(0,0,0,0.5)',  // NEW: Custom backdrop
  modalBackdropOpacity: 0.5,               // NEW: Backdrop opacity
  closeOnBackdropPress: true,              // NEW: Backdrop dismiss
  keyboardAvoidingView: false,             // NEW: Keyboard handling
}}
```

#### 7. Accessibility Features
```tsx
accessibility={{
  accessibilityLabel: "Swipeable cards",  // NEW: Custom labels
  accessibilityHint: "Swipe to navigate", // NEW: Custom hints
  accessibilityRole: "group",             // NEW: Role definition
  swipeAccessibilityActions: [            // NEW: Custom actions
    { name: 'like', label: 'Like this card' },
    { name: 'pass', label: 'Pass on this card' },
  ],
}}
```

#### 8. Advanced Styling
```tsx
// Multiple style props for different states
cardStyle={{}}                           // Base card style
activeCardStyle={{}}                     // NEW: Active card only
inactiveCardStyle={{}}                   // NEW: Inactive cards only
containerStyle={{}}                      // Container style
cardContainerStyle={{}}                  // NEW: Card container

// Dynamic styling based on card state
renderCard={(card, index, isActive) => (
  <View style={isActive ? activeStyle : inactiveStyle}>
    {/* Card content */}
  </View>
)}
```

#### 10. Controlled Component Support
```tsx
// Full control over card stack state
const [currentIndex, setCurrentIndex] = useState(0);

<SwipeableCardsStack
  currentIndex={currentIndex}             // NEW: Controlled index
  onIndexChange={setCurrentIndex}         // NEW: Index change handler
  // ... other props
/>
```

### 🎮 Usage Patterns

#### Dating App Pattern
```tsx
<SwipeableCardsStack
  data={profiles}
  renderCard={renderProfile}
  leftSwipeIcon={<XIcon />}
  rightSwipeIcon={<HeartIcon />}
  upSwipeIcon={<StarIcon />}
  leftSwipeIconStyle={{ backgroundColor: 'red' }}
  rightSwipeIconStyle={{ backgroundColor: 'green' }}
  upSwipeIconStyle={{ backgroundColor: 'blue' }}
  gestures={{
    swipeDirections: ['left', 'right', 'up'], // Left: pass, Right: like, Up: super like
    enableRotation: true,
  }}
  animations={{
    rotationEnabled: true,
    duration: 250,
  }}
  onSwipe={(direction, profile, index) => {
    if (direction === 'right') console.log('Liked:', profile.name);
    if (direction === 'left') console.log('Passed:', profile.name);
    if (direction === 'up') console.log('Super liked:', profile.name);
  }}
  onTap={(profile, index) => {
    // Show profile details
    navigation.navigate('ProfileDetails', { profile });
  }}
/>
```

#### Shopping App Pattern
```tsx
<SwipeableCardsStack
  data={products}
  renderCard={renderProduct}
  leftSwipeIcon={<TrashIcon />}
  rightSwipeIcon={<CartIcon />}
  upSwipeIcon={<InfoIcon />}
  gestures={{
    swipeDirections: ['left', 'right', 'up'], // Left: remove, Right: add to cart, Up: details
  }}
  stackBehavior={{
    stackSize: 3,
  }}
  onSwipe={(direction, product, index) => {
    if (direction === 'right') addToCart(product);
    if (direction === 'left') removeFromWishlist(product);
  }}
  onTap={(product, index) => {
    // Show product details
    navigation.navigate('ProductDetails', { product });
  }}
/>
```

#### Card Game Pattern
```tsx
<SwipeableCardsStack
  data={gameCards}
  renderCard={renderGameCard}
  gestures={{
    swipeDirections: ['left', 'right'], // Only horizontal swipes for card games
    enableRotation: false,
    enableScale: true,
  }}
  animations={{
    rotationEnabled: false,
    scaleEnabled: true,
  }}
  stackBehavior={{
    stackSize: 5,
  }}
  onSwipe={(direction, card, index) => {
    if (direction === 'right') playCard(card);
    if (direction === 'left') discardCard(card);
  }}
/>
```

### 📦 Migration Benefits

1. **Backward Compatibility**: All existing props still work
2. **Gradual Migration**: Add new features incrementally
3. **Type Safety**: Catch errors at compile time
4. **Performance**: Significantly improved rendering performance
5. **Accessibility**: Built-in screen reader support
6. **Customization**: Unlimited styling and behavior options

### 🚀 Getting Started

1. Install the package:
   ```bash
   npm install react-native-swipeable-cards-stack
   ```

2. Basic usage (same as before):
   ```tsx
   import { SwipeableCardsStack } from 'react-native-swipeable-cards-stack';
   ```

3. Add advanced features as needed:
   ```tsx
   <SwipeableCardsStack
     data={cards}
     renderCard={renderCard}
     // Add new features gradually
     animations={{ duration: 200 }}
     gestures={{ enableDownSwipe: true }}
   />
   ```

This enhanced version provides professional-grade customization while maintaining simplicity for basic use cases.
