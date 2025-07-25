// Main exports
export { default as SwipeableCardsStack } from './components/SwipeableCardsStack';
export { default as SwipeableCard } from './components/SwipeableCard';
export { default as SwipeIconsRenderer } from './components/SwipeIconsRenderer';

// Type exports
export type {
  SwipeableCardData,
  SwipeIcons,
  SwipeThresholds,
  SwipeAnimations,
  SwipeCallbacks,
  SwipeGestures,
  StackBehavior,
  AccessibilityOptions,
  SwipeableCardsStackProps,
} from './types';

// Utility exports
export {
  DEFAULT_SWIPE_ICONS,
  DEFAULT_THRESHOLDS,
  DEFAULT_ANIMATIONS,
  DEFAULT_GESTURES,
  DEFAULT_STACK_BEHAVIOR,
  mergeWithDefaults,
  getCardId,
  calculateCardStyle,
  getDirectionFromGesture,
  shouldShowIcon,
  calculateIconOpacity,
} from './utils';

// Version
export const VERSION = '1.0.0';

// Package name
export const PACKAGE_NAME = 'react-native-swipe-cards-stack';
