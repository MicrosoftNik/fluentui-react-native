import * as React from 'react';
import { ViewProps, TouchableWithoutFeedbackProps, Animated } from 'react-native';
import { IRenderData } from '@uifabricshared/foundation-composable';
import { ITextProps } from '@fluentui-react-native/text';
import { IPressableProps } from '@fluentui-react-native/pressable';
import { FontTokens, IForegroundColorTokens, IBackgroundColorTokens, IBorderTokens } from '@fluentui-react-native/tokens';
import { IFocusable, IPressableState } from '@fluentui-react-native/interactive-hooks';
//import { IViewWin32Props } from '@office-iss/react-native-win32';

export const toggleName = 'Toggle';

export interface IToggleInfo extends IPressableState {
  /*
   * Disables the toggle.
   * @default false
   * @deprecated
   */
  disabled?: boolean;

  /*
   * Toggle text.
   */
  label?: boolean;

  toggleHeight: Animated.Value;
  toggleWidth: Animated.Value;
  knobMarginLeft: Animated.Value;
  toggleOn: boolean;
  pressed: boolean;
}

/**
 * Because state updates are coming from the touchable and will cause a child render the button doesn't use
 * changes in state value to trigger re-render.  The values inside inner are effectively mutable and are used
 * for per-component storage
 */
export interface IToggleState {
  info: IToggleInfo;
}

export interface IToggleTokens extends FontTokens, IForegroundColorTokens, IBackgroundColorTokens, IBorderTokens {
  /**
   * The amount of padding between the border and the contents.
   */
  contentPadding?: number | string;

  /**
   * The amount of padding between the border and the contents when the Button has focus.
   */
  contentPaddingFocused?: number | string;

  /**
   * Text to show on the Button.
   */
  label?: string;
}

export interface IToggleProps extends Omit<IPressableProps, 'onPress'> {
  /*
   * Label to show next to the Toggle.
   */
  label?: string;

  /**
   * A RefObject to access the IToggle interface. Use this to access the public methods and properties of the component.
   */
  componentRef?: React.RefObject<IFocusable>;
  /**
   * A callback to call on toggle click event
   */
  onClick?: () => void;

  testID?: string;
  tooltip?: string;
}

export interface IToggleSlotProps {
  root: ViewProps;
  label: ITextProps;
  knob: ViewProps;
  touchable: TouchableWithoutFeedbackProps;
}

export type IToggleRenderData = IRenderData<IToggleSlotProps, IToggleState>;

export interface IToggleType {
  props: IToggleProps;
  tokens: IToggleTokens;
  slotProps: IToggleSlotProps;
  state: IToggleState;
}
