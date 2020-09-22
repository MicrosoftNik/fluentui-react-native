/** @jsx withSlots */
import { useState, useEffect } from 'react';
import { Animated, TouchableWithoutFeedback, StyleSheet, UIManager, Platform, View } from 'react-native';
import { IToggleSlotProps, IToggleState, IToggleProps, IToggleRenderData, toggleName, IToggleType } from './Toggle.types';
import { compose, IUseComposeStyling } from '@uifabricshared/foundation-compose';
import { ISlots, withSlots } from '@uifabricshared/foundation-composable';
import { Text } from '@fluentui-react-native/text';
import { settings } from './Toggle.settings';
//import { backgroundColorTokens, borderTokens, textTokens, foregroundColorTokens, getPaletteFromTheme } from '@fluentui-react-native/tokens';
import { mergeSettings } from '@uifabricshared/foundation-settings';
import { useAsPressable, useViewCommandFocus } from '@fluentui-react-native/interactive-hooks';
import InsetShadow from 'react-native-inset-shadow';

export const Toggle = compose<IToggleType>({
  displayName: toggleName,
  usePrepareProps: (userProps: IToggleProps, useStyling: IUseComposeStyling<IToggleType>) => {
    const [pressed, setPressed] = useState(false);
    const [toggleOn, setToggleState] = useState(true);
    const [knobMarginLeft] = useState(new Animated.Value(7.5));
    const [toggleWidth] = useState(new Animated.Value(35));
    const [toggleHeight] = useState(new Animated.Value(20));
    const toggleAnimationLength = 150;

    const { label, onAccessibilityTap = userProps.onClick, accessibilityLabel = userProps.label, onClick, testID, ...rest } = userProps;

    const handlePress = () => {
      if (userProps.disabled) return;

      if (toggleOn) {
        Animated.timing(knobMarginLeft, {
          toValue: -7.5,
          duration: toggleAnimationLength,
          useNativeDriver: false,
        }).start();
      } else {
        Animated.timing(knobMarginLeft, {
          toValue: 7.5,
          duration: toggleAnimationLength,
          useNativeDriver: false,
        }).start();
      }
      setToggleState(!toggleOn);
      onClick();
    };

    const handlePressIn = () => {
      if (userProps.disabled) return;

      setPressed(true);

      Animated.timing(toggleWidth, {
        duration: 20,
        toValue: 31,
        useNativeDriver: false,
      }).start();

      Animated.timing(toggleHeight, {
        duration: 20,
        toValue: 16.8,
        useNativeDriver: false,
      }).start();
    };

    const handlePressOut = () => {
      if (userProps.disabled) return;

      setPressed(false);

      Animated.timing(toggleWidth, {
        duration: 100,
        toValue: 35,
        useNativeDriver: false,
      }).start();

      Animated.timing(toggleHeight, {
        duration: 100,
        toValue: 20,
        useNativeDriver: false,
      }).start();
    };

    // attach the pressable state handlers
    const pressable = useAsPressable({ ...rest, onPress: handlePress, onPressIn: handlePressIn, onPressOut: handlePressOut });

    // set up state
    const state: IToggleState = {
      info: {
        ...pressable.state,
        disabled: !!userProps.disabled,
        label: !!userProps.label,
        toggleHeight: toggleHeight,
        toggleWidth: toggleWidth,
        knobMarginLeft: knobMarginLeft,
        toggleOn: toggleOn,
        pressed: pressed,
      },
    };

    const buttonRef = useViewCommandFocus(userProps.componentRef);
    // grab the styling information, referencing the state as well as the props
    const styleProps = useStyling(userProps, (override: string) => state.info[override] || userProps[override]);
    // create the merged slot props
    const slotProps = mergeSettings<IToggleSlotProps>(styleProps, {
      root: {
        ref: buttonRef,
        onAccessibilityTap: onAccessibilityTap,
        accessibilityLabel: accessibilityLabel,
        accessibilityState: { disabled: state.info.disabled },
      },
      label: { children: label, testID },
      touchable: {
        ...pressable.props,
      },
    });

    useEffect(() => {
      if (Platform.OS === 'android') {
        if (UIManager.setLayoutAnimationEnabledExperimental) {
          UIManager.setLayoutAnimationEnabledExperimental(true);
        }
      }
    }, []);

    return { slotProps, state };
  },
  settings,
  render: (Slots: ISlots<IToggleSlotProps>, renderData: IToggleRenderData /*...children: React.ReactNode[]*/) => {
    const info = renderData.state!.info;
    const styles = StyleSheet.create({
      wrapper: {
        alignItems: 'center',
        borderRadius: 10,
        height: 20,
        justifyContent: 'center',
        width: 35,
      },
      outer: {
        alignItems: 'center',
        borderRadius: 10,
        justifyContent: 'center',
      },
      colorOn: {
        backgroundColor: '#0F78D4',
      },
      colorOff: {
        backgroundColor: '#E9E9E9',
      },
      colorOnPress: {
        backgroundColor: '#5094DB',
      },
      colorOffPress: {
        backgroundColor: '#EEEEEE',
      },
      disabled: {
        borderWidth: 1,
        borderColor: '#E9E9E9',
      },
      knob: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        height: 12,
        width: 12,
      },
      knobShadow: {
        elevation: 2,
      },
    });

    // We shouldn't have to specify the source prop on Slots.icon, here, but we need another drop from @uifabricshared
    return (
      <Slots.root>
        <Animated.View style={{ height: info.toggleHeight, width: info.toggleWidth }}>
          {info.disabled ? (
            <Slots.touchable>
              <Animated.View
                style={[
                  styles.outer,
                  !info.disabled
                    ? info.toggleOn
                      ? info.pressed
                        ? styles.colorOnPress
                        : styles.colorOn
                      : info.pressed
                      ? styles.colorOffPress
                      : styles.colorOff
                    : styles.disabled,
                  { height: info.toggleHeight, width: info.toggleWidth },
                ]}
              >
                <Slots.knob style={[!info.toggleOn && styles.knobShadow /*, { translateX: info.knobMarginLeft }*/]} />
              </Animated.View>
            </Slots.touchable>
          ) : (
            <InsetShadow shadowRadius={20} containerStyle={{ borderRadius: 10 }}>
              <Slots.touchable>
                <Animated.View
                  style={[
                    styles.outer,
                    !info.disabled
                      ? info.toggleOn
                        ? info.pressed
                          ? styles.colorOnPress
                          : styles.colorOn
                        : info.pressed
                        ? styles.colorOffPress
                        : styles.colorOff
                      : styles.disabled,
                    { height: info.toggleHeight, width: info.toggleWidth },
                  ]}
                >
                  <Slots.knob style={[!info.toggleOn && styles.knobShadow /*, { translateX: info.knobMarginLeft }*/]} />
                </Animated.View>
              </Slots.touchable>
            </InsetShadow>
          )}
        </Animated.View>
      </Slots.root>
    );
  },
  slots: {
    root: View,
    knob: Animated.View,
    touchable: TouchableWithoutFeedback,
    label: Text,
  },
  styles: {
    //root: [backgroundColorTokens, borderTokens],
  },
});
