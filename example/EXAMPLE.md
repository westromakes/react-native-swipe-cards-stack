# React Native Swipe Cards Stack Example

## Quick Start

```tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { SwipeableCardsStack } from 'react-native-swipe-cards-stack';

const { width, height } = Dimensions.get('window');

const TickIcon = (props: any) => (
  // icon for right swipe
)

const CloseIcon = (props: any) => (
  // icon for left swipe
)

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

  // custom empty component
  const emptyComponent = () => (
    <View style={styles.emptyView}>
      <Text style={styles.emptyText}>No more cards</Text>
    </View>
  );

  const handleSwipe = (direction, card, index) => {
    console.log(`Swiped ${index} card on direction ${direction}:`, card.name);
  };

  return (
    <View style={styles.container}>
      <SwipeableCardsStack
        data={cards}
        renderCard={renderCard}
        onSwipe={handleSwipe}
        cardDimensions={{
            width: width * 0.8,
            height: height * 0.5,
        }}
        gestures={{
            swipeDirections: ['left', 'right'], // Only allow left and right swipes
            allowPartialSwipe: true,
        }}
        rightSwipeIcon={<TickIcon width={70} height={70} />}
        leftSwipeIcon={<CloseIcon width={70} height={70} />}
        emptyComponent={emptyComponent}
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
  emptyView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#888',
  },
});

export default Example;
```

## Key Changes

✅ **Added `onTap` Callback**: Clean callback for tap gesture
✅ **Backward Compatible**: Legacy props still supported
✅ **Type Safe**: Full TypeScript support maintained
