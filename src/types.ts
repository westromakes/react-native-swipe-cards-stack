export type SwipeableCardData = any;

export interface SwipeIcons {
  // New simplified icon system
  leftSwipeIcon?: React.ReactNode;
  rightSwipeIcon?: React.ReactNode;
  upSwipeIcon?: React.ReactNode;
  downSwipeIcon?: React.ReactNode;
  
  // Style containers for positioning
  leftSwipeIconStyle?: any;
  rightSwipeIconStyle?: any;
  upSwipeIconStyle?: any;
  downSwipeIconStyle?: any;
  
  // Legacy support (deprecated but maintained for backward compatibility)
  tickIcon?: React.ReactNode;
  crossIcon?: React.ReactNode;
  upIcon?: React.ReactNode;
  downIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  
  // Legacy show/hide controls (deprecated)
  showTickIcon?: boolean;
  showCrossIcon?: boolean;
  showUpIcon?: boolean;
  showDownIcon?: boolean;
  showLeftIcon?: boolean;
  showRightIcon?: boolean;
  
  // Legacy style overrides (deprecated)
  tickIconStyle?: any;
  crossIconStyle?: any;
  upIconStyle?: any;
  downIconStyle?: any;
  leftIconStyle?: any;
  rightIconStyle?: any;
  
  // Legacy position controls (deprecated)
  iconPosition?: 'center' | 'top' | 'bottom' | 'custom';
  customIconPosition?: {
    top?: number | string;
    left?: number | string;
    right?: number | string;
    bottom?: number | string;
  };
}

export interface SwipeThresholds {
  horizontal?: number;
  vertical?: number;
  iconDelay?: number;
  rotationThreshold?: number;
  velocity?: number;
}

export interface SwipeAnimations {
  duration?: number;
  easing?: any;
  useNativeDriver?: boolean;
  rotationEnabled?: boolean;
  scaleEnabled?: boolean;
  opacityEnabled?: boolean;
}

export interface SwipeCallbacks {
  onSwipe?: (direction: 'left' | 'right' | 'up' | 'down', item: SwipeableCardData, index: number) => void;
  onSwipeStart?: (item: SwipeableCardData, direction: 'left' | 'right' | 'up' | 'down') => void;
  onSwipeEnd?: (item: SwipeableCardData, direction: 'left' | 'right' | 'up' | 'down') => void;
  onStackEmpty?: () => void;
  onCardFocus?: (item: SwipeableCardData, index: number) => void;
  onAnimationComplete?: (direction: 'left' | 'right' | 'up' | 'down', item: SwipeableCardData) => void;
  onTap?: (item: SwipeableCardData, index: number) => void;
  onEmpty?: () => void;
}

export interface SwipeGestures {
  // Primary direction control (new simplified API)
  swipeDirections?: ('left' | 'right' | 'up' | 'down')[];
  
  // Animation and visual controls
  enableRotation?: boolean;
  enableScale?: boolean;
  
  // Advanced gesture settings
  gestureThreshold?: number;
  simultaneousGestures?: boolean;
  
  // Partial swipe behavior
  allowPartialSwipe?: boolean;
  partialSwipeReturnDuration?: number;
  partialSwipeReturnEasing?: any;
}

export interface StackBehavior {
  stackSize?: number;
}

export interface AccessibilityOptions {
  accessibilityLabel?: string;
  accessibilityHint?: string;
  accessibilityRole?: string;
}

export interface SwipeableCardsStackProps {
  // Core props
  data: SwipeableCardData[];
  renderCard: (card: SwipeableCardData, index: number, isActive: boolean) => React.ReactNode;
  keyExtractor?: (item: SwipeableCardData, index: number) => string; // Optional: extract unique key from item data, defaults to index
  
  // Empty state
  emptyComponent?: () => React.ReactNode; // Render function for custom empty component (shows nothing if not provided)
  onEmpty?: () => void; // Direct callback when stack becomes empty (convenience for callbacks.onStackEmpty)
  
  // Styling
  cardStyle?: any; // Apply styles directly to each card (including borderRadius)
  containerStyle?: any;
  activeCardStyle?: any;
  inactiveCardStyle?: any;
  
  // Dimensions
  cardDimensions?: {
    width?: number | string;
    height?: number | string;
  };
  
  // Icons configuration
  swipeIcons?: SwipeIcons;
  
  // Direct icon props (new simplified API)
  leftSwipeIcon?: React.ReactNode;
  rightSwipeIcon?: React.ReactNode;
  upSwipeIcon?: React.ReactNode;
  downSwipeIcon?: React.ReactNode;
  leftSwipeIconStyle?: any;
  rightSwipeIconStyle?: any;
  upSwipeIconStyle?: any;
  downSwipeIconStyle?: any;
  
  // Thresholds and sensitivity
  thresholds?: SwipeThresholds;
  
  // Animations
  animations?: SwipeAnimations;
  
  // Callbacks
  callbacks?: SwipeCallbacks;
  
  // Legacy callbacks (for backward compatibility)
  onSwipe?: (direction: 'left' | 'right' | 'up' | 'down', item: SwipeableCardData, index: number) => void;
  
  // Tap functionality
  onTap?: (item: SwipeableCardData, index: number) => void;
  tapActiveOpacity?: number;
  
  // Gestures
  gestures?: SwipeGestures;
  
  // Stack behavior
  stackBehavior?: StackBehavior;
  
  // Control
  resetTrigger?: number;
  currentIndex?: number;
  onIndexChange?: (index: number) => void;
  
  // Accessibility
  accessibility?: AccessibilityOptions;
  
  // Legacy props (for backward compatibility)
  enableUpSwipe?: boolean;
  rotationEnabled?: boolean;
  animationDuration?: number;
  stackSize?: number;
}
