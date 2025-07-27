import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { View, Animated, Dimensions, StyleSheet } from 'react-native';
import SwipeableCard from './SwipeableCard';
import { SwipeableCardsStackProps, SwipeableCardData } from '../types';
import { mergeWithDefaults, getCardId, calculateCardStyle } from '../utils';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const SwipeableCardsStack: React.FC<SwipeableCardsStackProps> = (props) => {
  // Merge props with defaults
  const mergedProps = useMemo(() => mergeWithDefaults(props), [props]);
  
  const {
    data,
    renderCard,
    keyExtractor,
    emptyComponent,
    onEmpty,
    cardStyle,
    containerStyle,
    activeCardStyle,
    inactiveCardStyle,
    cardDimensions = { width: screenWidth - 40, height: screenHeight * 0.7 },
    swipeIcons = {},
    thresholds = {},
    animations = {},
    callbacks = {},
    gestures = {},
    stackBehavior = {},
    resetTrigger = 0,
    currentIndex: controlledIndex,
    onIndexChange,
    accessibility = {},
    // Direct icon props
    leftSwipeIcon,
    rightSwipeIcon,
    upSwipeIcon,
    downSwipeIcon,
    leftSwipeIconStyle,
    rightSwipeIconStyle,
    upSwipeIconStyle,
    downSwipeIconStyle,
    // Legacy props for backward compatibility
    onSwipe,
    onTap,
    tapActiveOpacity,
    enableUpSwipe,
    rotationEnabled,
    animationDuration,
    stackSize,
  } = mergedProps;

  // State management
  const [internalIndex, setInternalIndex] = useState(0);
  
  // Animation refs
  const animatedValue = useRef(new Animated.ValueXY()).current;

  // Use controlled or internal index
  const currentIndex = controlledIndex !== undefined ? controlledIndex : internalIndex;

  // Legacy support - convert old enableUpSwipe to new swipeDirections format
  const finalGestures = useMemo(() => {
    const baseGestures = { ...gestures };
    
    // If legacy enableUpSwipe is provided, convert to swipeDirections
    if (enableUpSwipe !== undefined) {
      const currentDirections = baseGestures.swipeDirections || ['left', 'right', 'up', 'down'];
      if (enableUpSwipe && !currentDirections.includes('up')) {
        baseGestures.swipeDirections = [...currentDirections, 'up'];
      } else if (!enableUpSwipe && currentDirections.includes('up')) {
        baseGestures.swipeDirections = currentDirections.filter(dir => dir !== 'up');
      }
    }
    
    return baseGestures;
  }, [gestures, enableUpSwipe]);

  const finalStackBehavior = useMemo(() => ({
    ...stackBehavior,
    stackSize: stackSize !== undefined ? stackSize : stackBehavior?.stackSize,
  }), [stackBehavior, stackSize]);

  const finalAnimations = useMemo(() => ({
    ...animations,
    duration: animationDuration !== undefined ? animationDuration : animations?.duration,
    rotationEnabled: rotationEnabled !== undefined ? rotationEnabled : animations?.rotationEnabled,
  }), [animations, animationDuration, rotationEnabled]);

  // Reset cards when resetTrigger changes
  useEffect(() => {
    if (resetTrigger > 0) {
      const newIndex = 0;
      if (controlledIndex === undefined) {
        setInternalIndex(newIndex);
      } else {
        onIndexChange?.(newIndex);
      }
      animatedValue.setValue({ x: 0, y: 0 });
    }
  }, [resetTrigger, animatedValue, controlledIndex, onIndexChange]);

  // Swipe handler
  const handleSwipe = useCallback((direction: 'left' | 'right' | 'up' | 'down', swipedCard: SwipeableCardData, index: number) => {
    // Call legacy callback with index
    onSwipe?.(direction, swipedCard, index);
    // Call new callbacks
    callbacks?.onSwipe?.(direction, swipedCard, index);
    
    // Check if the direction is enabled for actual card removal
    const {
      swipeDirections = ['left', 'right', 'up', 'down'], // Default to all directions
    } = finalGestures;
    
    const isDirectionEnabled = swipeDirections.includes(direction);
    
    // Only animate card off screen and remove it if the direction is enabled
    if (isDirectionEnabled) {
      let toValue;
      switch (direction) {
        case 'left':
          toValue = { x: -screenWidth, y: 0 };
          break;
        case 'right':
          toValue = { x: screenWidth, y: 0 };
          break;
        case 'up':
          toValue = { x: 0, y: -screenHeight };
          break;
        case 'down':
          toValue = { x: 0, y: screenHeight };
          break;
        default:
          toValue = { x: 0, y: 0 };
      }

      Animated.timing(animatedValue, {
        toValue,
        duration: finalAnimations.duration,
        useNativeDriver: finalAnimations.useNativeDriver || false,
      }).start(() => {
        // Reset animation and move to next card
        animatedValue.setValue({ x: 0, y: 0 });
        
        const newIndex = currentIndex + 1;
        
        // Check if stack is empty
        if (newIndex >= data.length) {
          callbacks?.onStackEmpty?.();
          onEmpty?.(); // Call direct onEmpty callback
        }
        
        // Update index
        if (controlledIndex === undefined) {
          setInternalIndex(newIndex);
        } else {
          onIndexChange?.(newIndex);
        }
        
        callbacks?.onAnimationComplete?.(direction, swipedCard);
      });
    }
    // If direction is disabled, only the callback is triggered but card stays in place
  }, [
    onSwipe, callbacks, animatedValue, finalAnimations, currentIndex, data.length, 
    controlledIndex, onIndexChange, finalGestures
  ]);

  // Render cards
  const renderCards = useCallback(() => {
    if (currentIndex >= data.length) {
      // Use custom empty component if provided, otherwise show nothing
      if (emptyComponent) {
        return emptyComponent();
      }
      
      // Return null to show nothing when no custom empty component is provided
      return null;
    }

    const cardsToRender = data.slice(currentIndex, currentIndex + (finalStackBehavior.stackSize || 2));
    
    return cardsToRender.map((card, relativeIndex) => {
      const actualIndex = currentIndex + relativeIndex;
      const isTop = relativeIndex === 0;
      const isActive = isTop;
      
      const calculatedCardStyle = calculateCardStyle(
        relativeIndex,
        isActive,
        finalStackBehavior,
        cardStyle,
        activeCardStyle,
        inactiveCardStyle
      );

      return (
        <SwipeableCard
          key={getCardId(card, actualIndex, keyExtractor)}
          card={card}
          index={actualIndex}
          isTop={isTop}
          isActive={isActive}
          onSwipe={handleSwipe}
          onTap={onTap}
          tapActiveOpacity={tapActiveOpacity}
          animatedValue={animatedValue}
          cardStyle={calculatedCardStyle}
          swipeIcons={swipeIcons}
          thresholds={thresholds}
          animations={finalAnimations}
          gestures={finalGestures}
          callbacks={callbacks}
          cardDimensions={cardDimensions}
          directIcons={{
            leftSwipeIcon,
            rightSwipeIcon,
            upSwipeIcon,
            downSwipeIcon,
            leftSwipeIconStyle,
            rightSwipeIconStyle,
            upSwipeIconStyle,
            downSwipeIconStyle,
          }}
        >
          {renderCard(card, actualIndex, isActive)}
        </SwipeableCard>
      );
    }).reverse(); // Reverse so the first card is on top
  }, [
    currentIndex, data, finalStackBehavior, renderCard, keyExtractor, cardStyle,
    activeCardStyle, inactiveCardStyle, handleSwipe, animatedValue,
    swipeIcons, thresholds, finalAnimations, finalGestures, callbacks, cardDimensions,
    emptyComponent
  ]);

  return (
    <View 
      style={[
        styles.outerContainer,
        containerStyle
      ]}
    >
      <View 
        style={[
          styles.cardsContainer, 
          {
            width: (cardDimensions?.width || screenWidth - 40) as number,
            height: (cardDimensions?.height || 400) as number,
          }
        ]}
        accessible={true}
        accessibilityLabel={accessibility.accessibilityLabel || "Swipeable cards stack"}
        accessibilityHint={accessibility.accessibilityHint || "Swipe cards left or right to navigate, swipe up for custom actions"}
        accessibilityRole={accessibility.accessibilityRole as any || "none"}
      >
        {renderCards()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
});

export default SwipeableCardsStack;
