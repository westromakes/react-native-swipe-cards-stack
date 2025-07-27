import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { SwipeableCardsStack } from 'react-native-swipeable-cards-stack';

const { width, height } = Dimensions.get('window');

// Example 1: Dating App Style
export const DatingAppExample = () => {
  const [profiles] = useState([
    { id: 1, name: 'Alice', age: 25, photo: 'https://example.com/alice.jpg', bio: 'Loves hiking and coffee' },
    { id: 2, name: 'Bob', age: 30, photo: 'https://example.com/bob.jpg', bio: 'Photographer and traveler' },
    { id: 3, name: 'Charlie', age: 28, photo: 'https://example.com/charlie.jpg', bio: 'Musician and food lover' },
  ]);

  const renderProfile = (profile, index, isActive) => (
    <View style={styles.profileCard}>
      <Image source={{ uri: profile.photo }} style={styles.profilePhoto} />
      <View style={styles.profileInfo}>
        <Text style={styles.profileName}>{profile.name}, {profile.age}</Text>
        <Text style={styles.profileBio}>{profile.bio}</Text>
      </View>
    </View>
  );

  const handleSwipe = (direction, profile, index) => {
    if (direction === 'right') {
      console.log(`Liked ${profile.name}`);
    } else if (direction === 'left') {
      console.log(`Passed on ${profile.name}`);
    }
  };

  const customHeartIcon = (
    <View style={styles.heartIcon}>
      <Text style={styles.heartText}>❤️</Text>
    </View>
  );

  const customXIcon = (
    <View style={styles.xIcon}>
      <Text style={styles.xText}>❌</Text>
    </View>
  );

    // custom empty component
  const emptyComponent = () => (
    <View style={styles.emptyView}>
      <Text style={styles.emptyText}>No more cards</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <SwipeableCardsStack
        data={profiles}
        renderCard={renderProfile}
        callbacks={{
          onSwipe: handleSwipe,
          onSwipeStart: (profile, direction) => console.log(`Started swiping ${direction} on ${profile.name}`),
          onStackEmpty: () => console.log('No more profiles!'),
        }}
        cardDimensions={{
            width: width * 0.8,
            height: height * 0.5,
        }}
        gestures={{
            swipeDirections: ['left', 'right'], // Only allow left and right swipes
            allowPartialSwipe: true,
        }}
        rightSwipeIcon={customHeartIcon}
        leftSwipeIcon={customXIcon}
        emptyComponent={emptyComponent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 20,
    overflow: 'hidden',
  },
  profilePhoto: {
    width: '100%',
    height: '70%',
    backgroundColor: '#f0f0f0',
  },
  profileInfo: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  profileBio: {
    fontSize: 16,
    color: '#666',
  },
  heartIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heartText: {
    fontSize: 30,
  },
  xIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  xText: {
    fontSize: 25,
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
