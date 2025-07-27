import React from 'react';
import { Animated } from 'react-native';
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
      top: '50%',
      left: '50%',
      justifyContent: 'center' as const,
      alignItems: 'center' as const,
      marginTop: -35,  // Half of typical icon size
      marginLeft: -35,
    };

    switch (direction) {
      case 'left':
        return [
          baseStyle,
          directIcons?.leftSwipeIconStyle || 
          swipeIcons.leftSwipeIconStyle || 
          swipeIcons.leftIconStyle || 
          swipeIcons.crossIconStyle
        ];
      case 'right':
        return [
          baseStyle,
          directIcons?.rightSwipeIconStyle || 
          swipeIcons.rightSwipeIconStyle || 
          swipeIcons.rightIconStyle || 
          swipeIcons.tickIconStyle
        ];
      case 'up':
        return [
          baseStyle,
          directIcons?.upSwipeIconStyle || 
          swipeIcons.upSwipeIconStyle || 
          swipeIcons.upIconStyle
        ];
      case 'down':
        return [
          baseStyle,
          directIcons?.downSwipeIconStyle || 
          swipeIcons.downSwipeIconStyle || 
          swipeIcons.downIconStyle
        ];
      default:
        return [baseStyle];
    }
  };

  return (
    <>
      {/* Left Swipe Icon */}
      {getFinalIcon('left') && enabledDirections.left && (
        <Animated.View 
          style={[
            getFinalIconStyle('left'),
            { 
              opacity: enabledDirections.left ? iconOpacities.leftOpacity || iconOpacities.crossOpacity : 0
            }
          ]}
          pointerEvents="none"
        >
          {getFinalIcon('left')}
        </Animated.View>
      )}
      
      {/* Right Swipe Icon */}
      {getFinalIcon('right') && enabledDirections.right && (
        <Animated.View 
          style={[
            getFinalIconStyle('right'),
            { 
              opacity: enabledDirections.right ? iconOpacities.rightOpacity || iconOpacities.tickOpacity : 0
            }
          ]}
          pointerEvents="none"
        >
          {getFinalIcon('right')}
        </Animated.View>
      )}
      
      {/* Up Swipe Icon */}
      {getFinalIcon('up') && enabledDirections.up && (
        <Animated.View 
          style={[
            getFinalIconStyle('up'),
            { 
              opacity: enabledDirections.up ? iconOpacities.upOpacity : 0
            }
          ]}
          pointerEvents="none"
        >
          {getFinalIcon('up')}
        </Animated.View>
      )}
      
      {/* Down Swipe Icon */}
      {getFinalIcon('down') && enabledDirections.down && (
        <Animated.View 
          style={[
            getFinalIconStyle('down'),
            { 
              opacity: enabledDirections.down ? iconOpacities.downOpacity : 0
            }
          ]}
          pointerEvents="none"
        >
          {getFinalIcon('down')}
        </Animated.View>
      )}
    </>
  );
};

export default React.memo(SwipeIconsRenderer);
