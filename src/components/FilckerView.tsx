import React, {useEffect, useRef} from 'react';
import {Animated, Easing, StyleProp, ViewStyle} from 'react-native';

interface FlickerViewProps {
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
  trigger: boolean;
  setTriggerFlicker: (isFlicker: boolean) => void;
}

const FilckerView = ({
  style,
  children,
  trigger,
  setTriggerFlicker,
}: FlickerViewProps) => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  useEffect(() => {
    if (trigger) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1,
        useNativeDriver: true,
      }).start(({finished}) => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 2,
          useNativeDriver: true,
        }).start();

        setTriggerFlicker(false);
      });
    }
  }, [trigger]);

  return (
    <Animated.View // Special animatable View
      style={[
        style,
        {
          opacity: fadeAnim, // Bind opacity to animated value
        },
      ]}>
      {children}
    </Animated.View>
  );
};

export default FilckerView;
