# React Native Swipe Cards Stack

<div align="center">

[![NPM Version](https://img.shields.io/npm/v/react-native-swipe-cards-stack.svg)](https://www.npmjs.com/package/react-native-swipe-cards-stack)
[![License](https://img.shields.io/npm/l/react-native-swipe-cards-stack.svg)](https://github.com/westromakes/react-native-swipe-cards-stack/blob/main/LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

A highly customizable, performant swipeable cards stack component for React Native with Tinder-like animations.

</div>

## ✨ Features

- 🚀 **High Performance** - Built with React Native's Animated API and optimized for 60fps
- 🎨 **Fully Customizable** - Every aspect can be customized to match your design
- 📱 **Multi-directional Swiping** - Support for left, right, up, and down swipe gestures
- 🎭 **Rich Animations** - Smooth rotation, scaling, and opacity animations
- 🎯 **TypeScript Ready** - Complete type definitions included
- 🔧 **Zero Dependencies** - Built with React Native core components only
- ♿ **Accessibility Support** - Full accessibility features included
- 🔄 **Backward Compatible** - Easy migration from simple implementations
- 📦 **Small Bundle Size** - Lightweight with no external dependencies

## 🚀 Installation

```bash
npm install react-native-swipe-cards-stack
# or
yarn add react-native-swipe-cards-stack
```

## 📱 Quick Start

```tsx
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { SwipeableCardsStack } from 'react-native-swipe-cards-stack';

const App = () => {
  // Data can be any type - strings, numbers, objects, etc.
  const [cards] = useState([
    { name: 'John', age: 25, city: 'New York' },
    { name: 'Jane', age: 30, city: 'London' },
    { name: 'Bob', age: 28, city: 'Tokyo' },
  ]);

  const renderCard = (item, index) => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{item.name}</Text>
      <Text style={{ fontSize: 18 }}>Age: {item.age}</Text>
      <Text style={{ fontSize: 16, color: 'gray' }}>{item.city}</Text>
    </View>
  );

  return (
    <SwipeableCardsStack
      data={cards}
      renderCard={renderCard}
      onSwipe={(direction, item, index) => console.log(`Swiped ${direction} on item at index ${index}:`, item)}
    />
  );
};
```

### 🔑 Card Data Flexibility

The component accepts **any data type** - your array can contain strings, numbers, objects, or any other type:

```tsx
// ✅ Simple strings
const stringCards = ['Card 1', 'Card 2', 'Card 3'];

// ✅ Numbers
const numberCards = [1, 2, 3, 4, 5];

// ✅ Simple objects (no specific structure required)
const objectCards = [
  { title: 'Card 1', content: 'Any data structure' },
  { title: 'Card 2', content: 'Works perfectly' },
];

// ✅ Complex objects
const complexCards = [
  { id: 'abc', name: 'John', age: 25, hobbies: ['reading', 'coding'] },
  { id: 'def', name: 'Jane', age: 30, location: { city: 'NY', country: 'USA' } },
];

// ✅ Mixed types (though not recommended for consistency)
const mixedCards = ['string', 42, { name: 'object' }, [1, 2, 3]];

// Use with any data type
<SwipeableCardsStack
  data={stringCards}
  renderCard={(item, index) => (
    <Text>{typeof item === 'string' ? item : JSON.stringify(item)}</Text>
  )}
  onSwipe={(direction, item, index) => 
    console.log(`Swiped ${direction} on item at index ${index}:`, item)
  }
/>

// Use keyExtractor for custom unique identifiers when needed
<SwipeableCardsStack
  data={complexCards}
  keyExtractor={(item, index) => 
    typeof item === 'object' && item.id ? item.id : index.toString()
  }
  renderCard={(item, index) => <YourCardComponent data={item} />}
  onSwipe={(direction, item, index) => 
    console.log(`Swiped ${direction} on ${typeof item} at index ${index}`)
  }
/>

// Or let it use index automatically (default behavior)
<SwipeableCardsStack
  data={numberCards}
  renderCard={(item, index) => <Text>Number: {item}</Text>}
  onSwipe={(direction, item, index) => 
    console.log(`Number ${item} at position ${index} swiped ${direction}`)
  }
/>
```

## 🎯 Advanced Usage

### Custom Icons and Animations

```tsx
import { SwipeableCardsStack } from 'react-native-swipeable-cards-stack';

const CustomCard = () => {
  const customTickIcon = (
    <View style={{ width: 60, height: 60, backgroundColor: 'green', borderRadius: 30 }}>
      <Text style={{ fontSize: 30, textAlign: 'center' }}>❤️</Text>
    </View>
  );

  return (
    <SwipeableCardsStack
      data={cardData}
      renderCard={renderCard}
      swipeIcons={{
        tickIcon: customTickIcon,
        showTickIcon: true,
        iconPosition: 'top',
      }}
      animations={{
        duration: 250,
        rotationEnabled: true,
        scaleEnabled: true,
      }}
      thresholds={{
        horizontal: 100,
        vertical: 150,
        iconDelay: 20,
      }}
  onSwipe={(direction, card, index) => {
    console.log(`Swiped ${direction}:`, card);
    if (direction === 'up') {
      // Handle up swipe - navigate to detail screen, show modal, etc.
      console.log('Up swipe detected:', card);
    }
  }}
/>
```

### Custom Up Swipe Handler

```tsx
const MyCardsWithDetails = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const handleSwipe = (direction, card, index) => {
    if (direction === 'up') {
      setSelectedCard(card);
      setShowDetails(true);
      // Or navigate to a detail screen
      // navigation.navigate('CardDetails', { card });
    } else {
      console.log(`Swiped ${direction}:`, card.name);
    }
  };

  return (
    <>
      <SwipeableCardsStack
        data={cardData}
        renderCard={renderCard}
        onSwipe={handleSwipe}
      />
      
      {/* Your custom modal/overlay */}
      {showDetails && (
        <CustomModal
          card={selectedCard}
          onClose={() => setShowDetails(false)}
        />
      )}
    </>
  );
};
```

### Advanced Callbacks

```tsx
<SwipeableCardsStack
  data={cardData}
  renderCard={renderCard}
  callbacks={{
    onSwipe: (direction, card, index) => {
      console.log(`Card ${index} swiped ${direction}`);
    },
    onSwipeStart: (card, direction) => {
      console.log(`Started swiping ${direction}`);
    },
    onSwipeEnd: (card, direction) => {
      console.log(`Ended swiping ${direction}`);
    },
    onStackEmpty: () => {
      console.log('No more cards!');
    },
    onCardFocus: (card, index) => {
      console.log(`Card ${index} is now focused`);
    },
  }}
/>
```

## 📚 API Reference

> 🎯 **For the complete, accurate, and tested API reference, see [ACTUAL_PROPS.md](./ACTUAL_PROPS.md)**

This package has been cleaned up to only include props that actually work. The complete API includes:

- **Core Props**: `data`, `renderCard`, `keyExtractor`
- **Styling**: `cardStyle`, `containerStyle`, `activeCardStyle`, `inactiveCardStyle`, `cardDimensions`
- **Icons**: `leftSwipeIcon`, `rightSwipeIcon`, `upSwipeIcon`, `downSwipeIcon` + styles
- **Gestures**: `swipeDirections`, `allowPartialSwipe`, `enableRotation`, etc.
- **Callbacks**: `onSwipe`, `onSwipeStart`, `onSwipeEnd`, `onStackEmpty`, etc.
- **Control**: `resetTrigger`, `currentIndex`, `onIndexChange`
- **Configuration**: `thresholds`, `animations`, `stackBehavior`, `accessibility`

### Core Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `SwipeableCardData[]` | **Required** | Array of card data |
| `renderCard` | `(card, index, isActive) => ReactNode` | **Required** | Function to render each card |
| `keyExtractor` | `(card, index) => string` | `card.id` | Extract unique key for each card |

### Styling Props

| Prop | Type | Description |
|------|------|-------------|
| `cardStyle` | `StyleProp<ViewStyle>` | Additional styles for all cards |
| `activeCardStyle` | `StyleProp<ViewStyle>` | Styles for the active (top) card |
| `inactiveCardStyle` | `StyleProp<ViewStyle>` | Styles for inactive cards |
| `containerStyle` | `StyleProp<ViewStyle>` | Container styles |

### Swipe Icons Configuration

```tsx
interface SwipeIcons {
  tickIcon?: React.ReactNode;           // Custom right swipe icon
  crossIcon?: React.ReactNode;          // Custom left swipe icon
  upIcon?: React.ReactNode;             // Custom up swipe icon
  showTickIcon?: boolean;               // Show tick on right swipe
  showCrossIcon?: boolean;              // Show cross on left swipe
  showUpIcon?: boolean;                 // Show icon on up swipe
  iconPosition?: 'center' | 'top' | 'bottom' | 'custom';
  customIconPosition?: {                // Custom positioning
    top?: number | string;
    left?: number | string;
    right?: number | string;
    bottom?: number | string;
  };
}
```

### Gesture Configuration

```tsx
interface SwipeGestures {
  // Primary API - specify allowed directions
  swipeDirections?: Array<'left' | 'right' | 'up' | 'down'>;  // Default: all directions
  
  // Animation and visual controls
  enableRotation?: boolean;             // Enable card rotation
  enableScale?: boolean;               // Enable scale animation
  
  // Advanced gesture settings
  gestureThreshold?: number;            // Minimum movement to trigger gesture
  simultaneousGestures?: boolean;       // Allow multiple gestures
  allowPartialSwipe?: boolean;          // Allow partial swipes with spring-back
  partialSwipeReturnDuration?: number;  // Spring-back animation duration
}
```

#### Direction Control Examples

```tsx
// Only horizontal swipes
<SwipeableCardsStack
  gestures={{ swipeDirections: ['left', 'right'] }}
/>

// Only vertical swipes  
<SwipeableCardsStack
  gestures={{ swipeDirections: ['up', 'down'] }}
/>

// Single direction only
<SwipeableCardsStack
  gestures={{ swipeDirections: ['right'] }}
/>

// All directions (default)
<SwipeableCardsStack
  gestures={{ swipeDirections: ['left', 'right', 'up', 'down'] }}
/>
```
```

### Animation Configuration

```tsx
interface SwipeAnimations {
  duration?: number;                    // Animation duration in ms
  rotationEnabled?: boolean;            // Enable rotation animation
  scaleEnabled?: boolean;               // Enable scale animation
  opacityEnabled?: boolean;             // Enable opacity animation
  useNativeDriver?: boolean;            // Use native driver for animations
}
```

### Stack Behavior

```tsx
interface StackBehavior {
  stackSize?: number;                   // Number of visible cards
  infiniteStack?: boolean;              // Loop cards infinitely
  stackOffset?: { x?: number; y?: number }; // Offset for stacked cards
  stackScale?: number[];                // Scale values for each card
  stackOpacity?: number[];              // Opacity values for each card
}
```

### Callback Configuration

```tsx
interface SwipeCallbacks {
  onSwipe?: (direction, card, index) => void;
  onSwipeStart?: (card, direction) => void;
  onSwipeEnd?: (card, direction) => void;
  onStackEmpty?: () => void;
  onCardFocus?: (card, index) => void;
  onAnimationComplete?: (direction, card) => void;
}
```

## 🎨 Customization Examples

### Dating App Style

```tsx
<SwipeableCardsStack
  data={profiles}
  renderCard={renderProfile}
  swipeIcons={{
    tickIcon: <HeartIcon />,
    crossIcon: <XIcon />,
    showTickIcon: true,
    showCrossIcon: true,
    iconPosition: 'center',
  }}
  animations={{
    duration: 300,
    rotationEnabled: true,
  }}
  gestures={{
    enableLeftSwipe: true,
    enableRightSwipe: true,
    enableUpSwipe: true,
  }}
/>
```

### Card Game Style

```tsx
<SwipeableCardsStack
  data={cards}
  renderCard={renderGameCard}
  stackBehavior={{
    stackSize: 3,
    stackOffset: { x: 0, y: -20 },
    stackScale: [1, 0.95, 0.9],
    stackOpacity: [1, 0.8, 0.6],
  }}
  animations={{
    rotationEnabled: false,
    scaleEnabled: true,
  }}
/>
```

### Shopping App Style

```tsx
<SwipeableCardsStack
  data={products}
  renderCard={renderProduct}
  swipeIcons={{
    tickIcon: <CartIcon />,
    crossIcon: <TrashIcon />,
    upIcon: <InfoIcon />,
    iconPosition: 'bottom',
  }}
  gestures={{
    enableDownSwipe: true, // Remove from cart
  }}
  onSwipe={(direction, product, index) => {
    if (direction === 'up') {
      // Navigate to product details
      navigation.navigate('ProductDetails', { product });
    }
  }}
/>
```

## 🔧 Migration Guide

### From Simple Implementation

If you're migrating from a simple swipeable cards implementation:

```tsx
// Before
<SwipeableCards
  cards={data}
  onSwipeLeft={handleLeft}
  onSwipeRight={handleRight}
/>

// After
<SwipeableCardsStack
  data={data}
  renderCard={renderCard}
  callbacks={{
    onSwipe: (direction, card) => {
      if (direction === 'left') handleLeft(card);
      if (direction === 'right') handleRight(card);
    }
  }}
/>
```

## 🎯 Performance Tips

1. **Use `keyExtractor`** for better list performance
2. **Memoize your `renderCard` function** to prevent unnecessary re-renders
3. **Enable `useNativeDriver`** for smoother animations
4. **Limit `stackSize`** to 2-3 cards for better performance
5. **Use `removeClippedSubviews`** for large datasets

## 🐛 Troubleshooting

### Common Issues

**Cards not responding to gestures:**
- Ensure the container has proper dimensions
- Check if `gestures.gestureThreshold` is too high

**Icons not showing:**
- Verify `swipeIcons.showTickIcon` is `true`
- Check if `thresholds.iconDelay` is appropriate

**Up swipe callback not firing:**
- Ensure `gestures.enableUpSwipe` is `true`
- Check if `thresholds.vertical` is appropriate for your use case
- Handle up swipe in the main `onSwipe` callback: `if (direction === 'up') { ... }`

**Performance issues:**
- Reduce `stackSize`
- Enable `animations.useNativeDriver`
- Optimize your `renderCard` function

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details.

## 📄 License

MIT © [Westromakes](https://github.com/westromakes)

## 🙏 Acknowledgments

- Inspired by Tinder's card stack interface
- Built with React Native's powerful Animated API
- Community feedback and contributions

---

<div align="center">

**[⭐ Star this repo](https://github.com/westromakes/react-native-swipe-cards-stack)** if you find it useful!

Made with ❤️ for the React Native community

</div>
