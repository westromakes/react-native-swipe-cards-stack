import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { SwipeableCardsStack } from 'react-native-swipeable-cards-stack';

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
    } else if (direction === 'up') {
      console.log(`Super liked ${profile.name}`);
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

  return (
    <SwipeableCardsStack
      data={profiles}
      renderCard={renderProfile}
      callbacks={{
        onSwipe: handleSwipe,
        onSwipeStart: (profile, direction) => console.log(`Started swiping ${direction} on ${profile.name}`),
        onStackEmpty: () => console.log('No more profiles!'),
      }}
      swipeIcons={{
        tickIcon: customHeartIcon,
        crossIcon: customXIcon,
        showTickIcon: true,
        showCrossIcon: true,
        iconPosition: 'center',
      }}
      animations={{
        duration: 300,
        rotationEnabled: true,
        scaleEnabled: true,
      }}
      thresholds={{
        horizontal: 120,
        vertical: 150,
        iconDelay: 30,
      }}
      cardDimensions={{
        width: 300,
        height: 500,
      }}
    />
  );
};

// Example 2: Shopping App Style
export const ShoppingAppExample = () => {
  const [products] = useState([
    { id: 1, name: 'Wireless Headphones', price: '$99', image: 'headphones.jpg', rating: 4.5 },
    { id: 2, name: 'Smart Watch', price: '$199', image: 'watch.jpg', rating: 4.8 },
    { id: 3, name: 'Laptop Stand', price: '$49', image: 'stand.jpg', rating: 4.2 },
  ]);

  const renderProduct = (product, index, isActive) => (
    <View style={styles.productCard}>
      <View style={styles.productImageContainer}>
        <Text style={styles.productImagePlaceholder}>📱</Text>
      </View>
      <View style={styles.productDetails}>
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.productPrice}>{product.price}</Text>
        <Text style={styles.productRating}>⭐ {product.rating}</Text>
      </View>
    </View>
  );

  const customModalRender = (product, hideModal, index) => (
    <View style={styles.productModal}>
      <TouchableOpacity style={styles.closeButton} onPress={hideModal}>
        <Text style={styles.closeText}>×</Text>
      </TouchableOpacity>
      
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>{product.name}</Text>
        <Text style={styles.modalPrice}>{product.price}</Text>
        <Text style={styles.modalDescription}>
          Detailed product information would go here. This is a great product with amazing features.
        </Text>
        
        <TouchableOpacity style={styles.addToCartButton}>
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SwipeableCardsStack
      data={products}
      renderCard={renderProduct}
      renderModal={customModalRender}
      callbacks={{
        onSwipe: (direction, product) => {
          if (direction === 'right') {
            console.log(`Added ${product.name} to wishlist`);
          } else if (direction === 'left') {
            console.log(`Dismissed ${product.name}`);
          }
        },
        onShowModal: (product) => console.log(`Viewing details for ${product.name}`),
      }}
      swipeIcons={{
        showTickIcon: true,
        showCrossIcon: true,
        iconPosition: 'bottom',
      }}
      gestures={{
        enableUpSwipe: true,
        enableDownSwipe: false,
      }}
      modal={{
        enableModal: true,
        modalTrigger: 'upSwipe',
        modalAnimation: 'slide',
        modalPosition: 'bottom',
      }}
      stackBehavior={{
        stackSize: 3,
        stackOffset: { x: 0, y: -10 },
        stackScale: [1, 0.95, 0.9],
      }}
    />
  );
};

// Example 3: Minimal Configuration
export const MinimalExample = () => {
  const [cards] = useState([
    { id: 1, title: 'Card 1', content: 'Simple content' },
    { id: 2, title: 'Card 2', content: 'Another card' },
    { id: 3, title: 'Card 3', content: 'Last card' },
  ]);

  const renderCard = (card) => (
    <View style={styles.simpleCard}>
      <Text style={styles.simpleTitle}>{card.title}</Text>
      <Text style={styles.simpleContent}>{card.content}</Text>
    </View>
  );

  return (
    <SwipeableCardsStack
      data={cards}
      renderCard={renderCard}
      onSwipe={(direction, card) => console.log(`Swiped ${direction}:`, card.title)}
    />
  );
};

const styles = StyleSheet.create({
  // Dating App Styles
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

  // Shopping App Styles
  productCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    justifyContent: 'space-between',
  },
  productImageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
  },
  productImagePlaceholder: {
    fontSize: 60,
  },
  productDetails: {
    marginTop: 20,
  },
  productName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  productPrice: {
    fontSize: 18,
    color: '#007AFF',
    fontWeight: '600',
    marginBottom: 5,
  },
  productRating: {
    fontSize: 16,
    color: '#666',
  },
  productModal: {
    flex: 1,
    backgroundColor: '#fff',
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  closeText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  modalContent: {
    flex: 1,
    padding: 20,
    paddingTop: 100,
    justifyContent: 'center',
  },
  modalTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  modalPrice: {
    fontSize: 24,
    color: '#007AFF',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalDescription: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 40,
    color: '#666',
  },
  addToCartButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignSelf: 'center',
  },
  addToCartText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  // Simple Example Styles
  simpleCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  simpleTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  simpleContent: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
  },
});
