import React, { useCallback, useMemo } from 'react';
import { Animated, PanResponder, StyleSheet, Dimensions } from 'react-native';
import { SwipeableCardData, SwipeIcons, SwipeThresholds, SwipeAnimations, SwipeGestures, SwipeCallbacks } from '../types';
import { getDirectionFromGesture } from '../utils';
import SwipeIconsRenderer from './SwipeIconsRenderer';

const { width: screenWidth } = Dimensions.get('window');

export interface SwipeableCardProps {
  card: SwipeableCardData;
  index: number;
  isTop: boolean;
  isActive: boolean;
  onSwipe: (direction: 'left' | 'right' | 'up' | 'down', card: SwipeableCardData, index: number) => void;
  animatedValue: Animated.ValueXY;
  cardStyle?: any;
  swipeIcons?: SwipeIcons;
  thresholds?: SwipeThresholds;
  animations?: SwipeAnimations;
  gestures?: SwipeGestures;
  callbacks?: SwipeCallbacks;
  cardDimensions?: { width?: number | string; height?: number | string };
  children: React.ReactNode;
  // Direct icon props
  directIcons?: {
    leftSwipeIcon?: React.ReactNode;
    rightSwipeIcon?: React.ReactNode;
    upSwipeIcon?: React.ReactNode;
    downSwipeIcon?: React.ReactNode;
    leftSwipeIconStyle?: any;
    rightSwipeIconStyle?: any;
    upSwipeIconStyle?: any;
    downSwipeIconStyle?: any;
  };
}

const SwipeableCard: React.FC<SwipeableCardProps> = ({
  card,
  index,
  isTop,
  isActive,
  onSwipe,
  animatedValue,
  cardStyle,
  swipeIcons,
  thresholds,
  animations,
  gestures,
  callbacks,
  cardDimensions,
  children,
  directIcons,
}) => {
  const {
    horizontal: horizontalThreshold = 120,
    vertical: verticalThreshold = 120,
    iconDelay = 80,
    velocity: velocityThreshold = 0.3,
  } = thresholds || {};

  const {
    rotationEnabled = true,
    useNativeDriver = false,
  } = animations || {};

  const {
    // New swipeDirections-based logic
    swipeDirections = ['left', 'right', 'up', 'down'], // Default to all directions
    enableRotation = true,
    allowPartialSwipe = true,
    partialSwipeReturnDuration = 300,
    partialSwipeReturnEasing,
  } = gestures || {};

  // Derive individual direction enables from swipeDirections
  const enableLeftSwipe = swipeDirections.includes('left');
  const enableRightSwipe = swipeDirections.includes('right');
  const enableUpSwipe = swipeDirections.includes('up');
  const enableDownSwipe = swipeDirections.includes('down');

  // Memoized pan responder for performance
  const panResponder = useMemo(() => PanResponder.create({
    onMoveShouldSetPanResponder: (_, gestureState) => {
      if (!isTop) return false;
      
      const { dx, dy } = gestureState;
      const threshold = gestures?.gestureThreshold || 10;
      
      return Math.abs(dx) > threshold || Math.abs(dy) > threshold;
    },
    
    onPanResponderGrant: () => {
      if (!isTop) return;
      
      animatedValue.setOffset({
        x: (animatedValue.x as any)._value,
        y: (animatedValue.y as any)._value,
      });
      
      callbacks?.onSwipeStart?.(card, 'up'); // Default direction, will be updated
    },
    
    onPanResponderMove: (event, gestureState) => {
      if (!isTop) return;
      
      const { dx, dy } = gestureState;
      
      // Allow partial movement in all directions, but limit disabled directions
      let finalDx = dx;
      let finalDy = dy;
      
      if (allowPartialSwipe) {
        // Allow small movements in disabled directions (for spring-back effect)
        const partialLimit = 50; // Maximum partial movement
        
        // Left swipe = dx < 0 (negative), Right swipe = dx > 0 (positive)
        if (!enableLeftSwipe && dx < 0) {
          finalDx = Math.max(dx, -partialLimit); // Limit leftward movement
        }
        if (!enableRightSwipe && dx > 0) {
          finalDx = Math.min(dx, partialLimit); // Limit rightward movement
        }
        if (!enableUpSwipe && dy < 0) {
          finalDy = Math.max(dy, -partialLimit); // Limit upward movement
        }
        if (!enableDownSwipe && dy > 0) {
          finalDy = Math.min(dy, partialLimit); // Limit downward movement
        }
      } else {
        // Completely block movement in disabled directions
        if (!enableLeftSwipe && dx < 0) finalDx = 0;  // Block leftward movement
        if (!enableRightSwipe && dx > 0) finalDx = 0; // Block rightward movement
        if (!enableUpSwipe && dy < 0) finalDy = 0;    // Block upward movement
        if (!enableDownSwipe && dy > 0) finalDy = 0;  // Block downward movement
      }
      
      animatedValue.setValue({ x: finalDx, y: finalDy });
    },
    
    onPanResponderRelease: (event, gestureState) => {
      if (!isTop) return;
      
      animatedValue.flattenOffset();
      
      const { dx, dy, vx, vy } = gestureState;
      const velocitySwipe = Math.abs(vx) > velocityThreshold || Math.abs(vy) > velocityThreshold;
      
      const direction = getDirectionFromGesture(dx, dy, thresholds || {});
      
      // Check if the direction is enabled
      const isDirectionEnabled = 
        (direction === 'left' && enableLeftSwipe) ||
        (direction === 'right' && enableRightSwipe) ||
        (direction === 'up' && enableUpSwipe) ||
        (direction === 'down' && enableDownSwipe);
      
      // Check for partial swipe in disabled direction (only if allowPartialSwipe is true)
      const isPartialSwipeInDisabledDirection = allowPartialSwipe && direction && !isDirectionEnabled && 
        (Math.abs(dx) > 30 || Math.abs(dy) > 30); // Minimum movement to consider as partial swipe intent
      
      if (direction && isDirectionEnabled && (Math.abs(dx) > horizontalThreshold || Math.abs(dy) > verticalThreshold || velocitySwipe)) {
        // Trigger swipe callback for enabled directions
        callbacks?.onSwipeEnd?.(card, direction);
        onSwipe(direction, card, index);
      } else {
        // Check if this is a partial swipe in disabled direction
        if (isPartialSwipeInDisabledDirection) {
          // Trigger callback for partial swipe in disabled direction (spring-back moment)
          onSwipe(direction, card, index);
        }
        
        // Return to center with spring animation
        const springConfig = {
          toValue: { x: 0, y: 0 },
          useNativeDriver,
          tension: 100,
          friction: 8,
        };
        
        if (partialSwipeReturnEasing) {
          Animated.timing(animatedValue, {
            ...springConfig,
            duration: partialSwipeReturnDuration,
            easing: partialSwipeReturnEasing,
          }).start();
        } else {
          Animated.spring(animatedValue, springConfig).start();
        }
      }
    },
  }), [
    isTop, card, index, animatedValue, onSwipe, thresholds, gestures,
    callbacks, horizontalThreshold, verticalThreshold, velocityThreshold,
    enableLeftSwipe, enableRightSwipe, enableUpSwipe, enableDownSwipe,
    allowPartialSwipe, partialSwipeReturnDuration, partialSwipeReturnEasing,
    useNativeDriver
  ]);

  // Icon opacity calculations for all directions
  const iconOpacities = useMemo(() => {
    // Check if we have direct icons OR legacy icons
    const hasRightIcon = directIcons?.rightSwipeIcon || swipeIcons?.rightSwipeIcon || swipeIcons?.tickIcon || (swipeIcons?.showRightIcon || swipeIcons?.showTickIcon);
    const hasLeftIcon = directIcons?.leftSwipeIcon || swipeIcons?.leftSwipeIcon || swipeIcons?.crossIcon || (swipeIcons?.showLeftIcon || swipeIcons?.showCrossIcon);
    const hasUpIcon = directIcons?.upSwipeIcon || swipeIcons?.upSwipeIcon || swipeIcons?.upIcon || swipeIcons?.showUpIcon;
    const hasDownIcon = directIcons?.downSwipeIcon || swipeIcons?.downSwipeIcon || swipeIcons?.downIcon || swipeIcons?.showDownIcon;

    const rightOpacity = isTop && hasRightIcon && enableRightSwipe ? animatedValue.x.interpolate({
      inputRange: [-horizontalThreshold, -iconDelay, 0, iconDelay, horizontalThreshold],
      outputRange: [0, 0, 0, 0, 1],
      extrapolate: 'clamp',
    }) : new Animated.Value(0);

    const leftOpacity = isTop && hasLeftIcon && enableLeftSwipe ? animatedValue.x.interpolate({
      inputRange: [-horizontalThreshold, -iconDelay, 0, iconDelay, horizontalThreshold],
      outputRange: [1, 0, 0, 0, 0],
      extrapolate: 'clamp',
    }) : new Animated.Value(0);

    const upOpacity = isTop && hasUpIcon && enableUpSwipe ? animatedValue.y.interpolate({
      inputRange: [-verticalThreshold, -iconDelay, 0, iconDelay, verticalThreshold],
      outputRange: [1, 0, 0, 0, 0],
      extrapolate: 'clamp',
    }) : new Animated.Value(0);

    const downOpacity = isTop && hasDownIcon && enableDownSwipe ? animatedValue.y.interpolate({
      inputRange: [-verticalThreshold, -iconDelay, 0, iconDelay, verticalThreshold],
      outputRange: [0, 0, 0, 0, 1],
      extrapolate: 'clamp',
    }) : new Animated.Value(0);

    // Legacy support
    const tickOpacity = rightOpacity;
    const crossOpacity = leftOpacity;

    return { 
      rightOpacity, 
      leftOpacity, 
      upOpacity, 
      downOpacity,
      tickOpacity, 
      crossOpacity 
    };
  }, [
    isTop, animatedValue, swipeIcons, directIcons, iconDelay, 
    horizontalThreshold, verticalThreshold,
    enableRightSwipe, enableLeftSwipe, enableUpSwipe, enableDownSwipe
  ]);

  // Handle card focus callback
  const handleCardFocus = useCallback(() => {
    if (isActive && callbacks?.onCardFocus) {
      callbacks.onCardFocus(card, index);
    }
  }, [isActive, callbacks, card, index]);

  React.useEffect(() => {
    handleCardFocus();
  }, [handleCardFocus]);

  const cardStyles = [
    styles.card,
    cardStyle,
    {
      width: cardDimensions?.width || screenWidth - 40,
      height: cardDimensions?.height || 300,
      transform: isTop ? [
        { translateX: animatedValue.x },
        { translateY: animatedValue.y },
        {
          rotate: rotationEnabled && enableRotation
            ? animatedValue.x.interpolate({
                inputRange: [-200, 0, 200],
                outputRange: ['-10deg', '0deg', '10deg'],
                extrapolate: 'clamp',
              })
            : '0deg',
        },
      ] : [],
    },
  ];

  return (
    <Animated.View
      style={cardStyles}
      {...(isTop ? panResponder.panHandlers : {})}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={`Card ${index + 1}`}
      accessibilityHint="Swipe left or right to navigate, swipe up for details"
    >
      {children}
      
      {/* Render swipe icons */}
      {isTop && (
        <SwipeIconsRenderer
          swipeIcons={swipeIcons || {}}
          iconOpacities={iconOpacities}
          _animatedValue={animatedValue}
          enabledDirections={{
            left: enableLeftSwipe,
            right: enableRightSwipe,
            up: enableUpSwipe,
            down: enableDownSwipe,
          }}
          directIcons={directIcons}
        />
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    position: 'absolute',
    // borderRadius removed - let user control it via cardStyle or cardContainerStyle
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default SwipeableCard;
