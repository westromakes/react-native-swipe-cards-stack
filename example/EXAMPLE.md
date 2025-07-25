# React Native Swipe Cards Stack Example

## Quick Start

```tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SwipeableCardsStack } from 'react-native-swipe-cards-stack';

const Example = () => {
  const [cards] = useState([
    { id: 1, name: 'John', age: 25, bio: 'Software Engineer' },
    { id: 2, name: 'Jane', age: 30, bio: 'Designer' },
    { id: 3, name: 'Bob', age: 28, bio: 'Product Manager' },
  ]);

  const renderCard = (card, index, isActive) => (
    <View style={styles.card}>
      <Text style={styles.name}>{card.name}</Text>
      <Text style={styles.age}>Age: {card.age}</Text>
      <Text style={styles.bio}>{card.bio}</Text>
    </View>
  );

  const handleSwipe = (direction, card, index) => {
    console.log(`Swiped ${direction}:`, card.name);
    if (direction === 'up') {
      console.log('Up swipe detected for:', card.name);
      // Navigate to detail screen, show modal, or any custom action
      // navigation.navigate('UserProfile', { user: card });
    }
  };

  return (
    <View style={styles.container}>
      <SwipeableCardsStack
        data={cards}
        renderCard={renderCard}
        onSwipe={handleSwipe}
        cardDimensions={{
          width: 300,
          height: 400,
        }}
        swipeIcons={{
          showTickIcon: true,
          showCrossIcon: true,
          showUpIcon: true,
        }}
        gestures={{
          enableUpSwipe: true,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  card: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  age: {
    fontSize: 18,
    color: '#666',
    marginBottom: 10,
  },
  bio: {
    fontSize: 16,
    textAlign: 'center',
    color: '#888',
  },
});

export default Example;
```

## Key Changes

✅ **Removed Modal Functionality**: No more built-in modal system
✅ **Added `onUpSwipe` Callback**: Clean callback for up swipe gestures
✅ **Improved Flexibility**: Users implement their own modals/navigation
✅ **Backward Compatible**: Legacy props still supported
✅ **Type Safe**: Full TypeScript support maintained

## Migration

If you were using the modal functionality:

**Before:**
```tsx
<SwipeableCardsStack
  data={cards}
  renderCard={renderCard}
  modal={{ enableModal: true }}
  renderModal={myModalRender}
/>
```

**After:**
```tsx
const [showModal, setShowModal] = useState(false);
const [selectedCard, setSelectedCard] = useState(null);

<SwipeableCardsStack
  data={cards}
  renderCard={renderCard}
  onSwipe={(direction, card, index) => {
    if (direction === 'up') {
      setSelectedCard(card);
      setShowModal(true);
    }
  }}
/>

{/* Your custom modal implementation */}
{showModal && (
  <CustomModal 
    card={selectedCard}
    onClose={() => setShowModal(false)}
  />
)}
```
