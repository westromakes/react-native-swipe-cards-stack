import React from 'react';
import { Animated, StyleSheet } from 'react-native';
import { SwipeIcons } from '../types';

interface SwipeIconsRendererProps {
  swipeIcons: SwipeIcons;
  iconOpacities: {
    tickOpacity: any;
    crossOpacity: any;
    upOpacity: any;
    downOpacity: any;
    leftOpacity: any;
    rightOpacity: any;
  };
  _animatedValue: Animated.ValueXY;
  enabledDirections: {
    left: boolean;
    right: boolean;
    up: boolean;
    down: boolean;
  };
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

const SwipeIconsRenderer: React.FC<SwipeIconsRendererProps> = ({
  swipeIcons,
  iconOpacities,
  _animatedValue,
  enabledDirections,
  directIcons,
}) => {
  // Hide icons when swiping upward significantly
  // const isSwipingUp = (animatedValue.y as any)._value < -10; // TODO: implement upward swipe icon hiding
  
  // Helper function to get the final icon for each direction
  const getFinalIcon = (direction: 'left' | 'right' | 'up' | 'down') => {
    // Priority: direct props > swipeIcons new props > legacy props
    switch (direction) {
      case 'left':
        return directIcons?.leftSwipeIcon || 
               swipeIcons.leftSwipeIcon || 
               swipeIcons.leftIcon || 
               swipeIcons.crossIcon;
      case 'right':
        return directIcons?.rightSwipeIcon || 
               swipeIcons.rightSwipeIcon || 
               swipeIcons.rightIcon || 
               swipeIcons.tickIcon;
      case 'up':
        return directIcons?.upSwipeIcon || 
               swipeIcons.upSwipeIcon || 
               swipeIcons.upIcon;
      case 'down':
        return directIcons?.downSwipeIcon || 
               swipeIcons.downSwipeIcon || 
               swipeIcons.downIcon;
      default:
        return null;
    }
  };

  // Helper function to get the final style for each direction
  const getFinalIconStyle = (direction: 'left' | 'right' | 'up' | 'down') => {
    const baseStyle = {
      position: 'absolute' as const,
      zIndex: 1000,
      top: '50%',
      left: '50%',
      justifyContent: 'center',
      alignItems: 'center',
      // Default centering - will be overridden if custom style provides different positioning
      marginTop: -25,  // Reasonable default for typical icon sizes
      marginLeft: -25,
    };

    switch (direction) {
      case 'left':
        return [
          baseStyle,
          directIcons?.leftSwipeIconStyle || 
          swipeIcons.leftSwipeIconStyle || 
          swipeIcons.leftIconStyle || 
          swipeIcons.crossIconStyle || 
          styles.defaultIconContainer
        ];
      case 'right':
        return [
          baseStyle,
          directIcons?.rightSwipeIconStyle || 
          swipeIcons.rightSwipeIconStyle || 
          swipeIcons.rightIconStyle || 
          swipeIcons.tickIconStyle || 
          styles.defaultIconContainer
        ];
      case 'up':
        return [
          baseStyle,
          directIcons?.upSwipeIconStyle || 
          swipeIcons.upSwipeIconStyle || 
          swipeIcons.upIconStyle || 
          styles.defaultIconContainer
        ];
      case 'down':
        return [
          baseStyle,
          directIcons?.downSwipeIconStyle || 
          swipeIcons.downSwipeIconStyle || 
          swipeIcons.downIconStyle || 
          styles.defaultIconContainer
        ];
      default:
        return [baseStyle, styles.defaultIconContainer];
    }
  };

  // Calculate final opacities based on enabled directions
  const finalOpacities = {
    left: enabledDirections.left ? iconOpacities.leftOpacity || iconOpacities.crossOpacity : 0,
    right: enabledDirections.right ? iconOpacities.rightOpacity || iconOpacities.tickOpacity : 0,
    up: enabledDirections.up ? iconOpacities.upOpacity : 0,
    down: enabledDirections.down ? iconOpacities.downOpacity : 0,
  };

  return (
    <>
      {/* Left Swipe Icon */}
      {getFinalIcon('left') && enabledDirections.left && (
        <Animated.View 
          style={[
            getFinalIconStyle('left'),
            { opacity: finalOpacities.left }
          ]}
        >
          {getFinalIcon('left')}
        </Animated.View>
      )}
      
      {/* Right Swipe Icon */}
      {getFinalIcon('right') && enabledDirections.right && (
        <Animated.View 
          style={[
            getFinalIconStyle('right'),
            { opacity: finalOpacities.right }
          ]}
        >
          {getFinalIcon('right')}
        </Animated.View>
      )}
      
      {/* Up Swipe Icon */}
      {getFinalIcon('up') && enabledDirections.up && (
        <Animated.View 
          style={[
            getFinalIconStyle('up'),
            { opacity: finalOpacities.up }
          ]}
        >
          {getFinalIcon('up')}
        </Animated.View>
      )}
      
      {/* Down Swipe Icon */}
      {getFinalIcon('down') && enabledDirections.down && (
        <Animated.View 
          style={[
            getFinalIconStyle('down'),
            { opacity: finalOpacities.down }
          ]}
        >
          {getFinalIcon('down')}
        </Animated.View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  defaultIconContainer: {
    // Base positioning and centering is now handled in baseStyle
    // This is just for any additional default styling
  },
  iconContainer: {
    position: 'absolute',
    zIndex: 1000,
  },
  centerPosition: {
    // Legacy - base centering is now in baseStyle
  },
  defaultIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 10,
    borderWidth: 3,
    borderColor: '#fff',
  },
  tickIcon: {
    // Custom styles can be applied via swipeIcons.tickIconStyle
  },
  tickCircle: {
    width: '100%',
    height: '100%',
    borderRadius: 40,
    backgroundColor: '#4CAF50',
  },
  crossIcon: {
    // Custom styles can be applied via swipeIcons.crossIconStyle
  },
  crossCircle: {
    width: '100%',
    height: '100%',
    borderRadius: 40,
    backgroundColor: '#F44336',
  },
  upIcon: {
    // Custom styles can be applied via swipeIcons.upIconStyle
  },
  upCircle: {
    width: '100%',
    height: '100%',
    borderRadius: 40,
    backgroundColor: '#2196F3',
  },
  downIcon: {
    // Custom styles can be applied via swipeIcons.downIconStyle
  },
  downCircle: {
    width: '100%',
    height: '100%',
    borderRadius: 40,
    backgroundColor: '#FF9800',
  },
});

export default React.memo(SwipeIconsRenderer);
