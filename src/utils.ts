import { SwipeableCardsStackProps, SwipeIcons, SwipeThresholds, SwipeAnimations, SwipeGestures, StackBehavior } from './types';

/**
 * Default configuration values for the SwipeableCardsStack component
 */
export const DEFAULT_SWIPE_ICONS: Required<SwipeIcons> = {
  // New simplified icon system
  leftSwipeIcon: null,
  rightSwipeIcon: null,
  upSwipeIcon: null,
  downSwipeIcon: null,
  leftSwipeIconStyle: {},
  rightSwipeIconStyle: {},
  upSwipeIconStyle: {},
  downSwipeIconStyle: {},
  
  // Legacy support (deprecated but maintained for backward compatibility)
  tickIcon: null,
  crossIcon: null,
  upIcon: null,
  downIcon: null,
  leftIcon: null,
  rightIcon: null,
  
  // Legacy show/hide controls (deprecated)
  showTickIcon: false, // Changed to false by default
  showCrossIcon: false, // Changed to false by default
  showUpIcon: false,
  showDownIcon: false,
  showLeftIcon: false,
  showRightIcon: false,
  
  // Legacy style overrides (deprecated)
  tickIconStyle: {},
  crossIconStyle: {},
  upIconStyle: {},
  downIconStyle: {},
  leftIconStyle: {},
  rightIconStyle: {},
  
  // Legacy position controls (deprecated)
  iconPosition: 'center',
  customIconPosition: {},
};

export const DEFAULT_THRESHOLDS: Required<SwipeThresholds> = {
  horizontal: 120,
  vertical: 120,
  iconDelay: 30,
  rotationThreshold: 15,
  velocity: 0.3,
};

export const DEFAULT_ANIMATIONS: Required<SwipeAnimations> = {
  duration: 300,
  easing: undefined,
  useNativeDriver: false,
  rotationEnabled: true,
  scaleEnabled: false,
  opacityEnabled: false,
};

export const DEFAULT_GESTURES: Required<SwipeGestures> = {
  swipeDirections: ['left', 'right', 'up', 'down'], // All directions enabled by default
  enableRotation: true,
  enableScale: true,
  gestureThreshold: 10,
  simultaneousGestures: false,
  allowPartialSwipe: true,
  partialSwipeReturnDuration: 300,
  partialSwipeReturnEasing: null,
};

export const DEFAULT_STACK_BEHAVIOR: Required<StackBehavior> = {
  stackSize: 2,
};

export const DEFAULT_CARD_STYLE = {
  borderRadius: 15,
};

/**
 * Merge user props with default values
 */
export const mergeWithDefaults = (props: SwipeableCardsStackProps): SwipeableCardsStackProps => {
  return {
    ...props,
    cardStyle: { ...DEFAULT_CARD_STYLE, ...props.cardStyle },
    swipeIcons: { ...DEFAULT_SWIPE_ICONS, ...props.swipeIcons },
    thresholds: { ...DEFAULT_THRESHOLDS, ...props.thresholds },
    animations: { ...DEFAULT_ANIMATIONS, ...props.animations },
    gestures: { ...DEFAULT_GESTURES, ...props.gestures },
    stackBehavior: { ...DEFAULT_STACK_BEHAVIOR, ...props.stackBehavior },
  };
};

/**
 * Utility functions for the component
 */
export const getCardId = (item: any, index: number, keyExtractor?: (item: any, index: number) => string): string => {
  if (keyExtractor) {
    return keyExtractor(item, index);
  }
  // Use index as default identifier since items can be any type (string, number, object, etc.)
  return index.toString();
};

export const calculateCardStyle = (
  relativeIndex: number,
  isActive: boolean,
  stackBehavior: StackBehavior,
  cardStyle: any,
  activeCardStyle: any,
  inactiveCardStyle: any
) => {
  const baseStyle = [cardStyle]; // cardStyle is always applied to all cards
  
  if (isActive && activeCardStyle) {
    baseStyle.push(activeCardStyle);
  } else if (!isActive && inactiveCardStyle) {
    baseStyle.push(inactiveCardStyle);
  }
  
  // Apply simple stack transformations (only basic Y offset for now)
  if (!isActive && relativeIndex > 0) {
    baseStyle.push({ 
      transform: [{ translateY: relativeIndex * 10 }],
      opacity: 1 - (relativeIndex * 0.1) // Simple opacity reduction
    });
  }
  
  return baseStyle;
};

export const getDirectionFromGesture = (dx: number, dy: number, thresholds: SwipeThresholds): 'left' | 'right' | 'up' | 'down' | null => {
  const horizontalThreshold = thresholds.horizontal || 120;
  const verticalThreshold = thresholds.vertical || 120;
  
  // Determine primary direction based on larger displacement
  if (Math.abs(dx) > Math.abs(dy)) {
    // Horizontal movement is primary
    if (Math.abs(dx) > horizontalThreshold) {
      return dx > 0 ? 'right' : 'left';
    }
  } else {
    // Vertical movement is primary
    if (Math.abs(dy) > verticalThreshold) {
      return dy > 0 ? 'down' : 'up';
    }
  }
  
  return null;
};

export const shouldShowIcon = (
  direction: 'left' | 'right' | 'up' | 'down' | null,
  displacement: number,
  iconDelay: number
): boolean => {
  if (!direction) return false;
  return Math.abs(displacement) > iconDelay;
};

export const calculateIconOpacity = (
  displacement: number,
  iconDelay: number,
  threshold: number
): number => {
  const adjustedDisplacement = Math.abs(displacement) - iconDelay;
  if (adjustedDisplacement <= 0) return 0;
  
  const maxOpacityRange = threshold - iconDelay;
  return Math.min(adjustedDisplacement / maxOpacityRange, 1);
};
