import { toggleName, IToggleType } from './Toggle.types';
import { IComposeSettings } from '@uifabricshared/foundation-compose';
//import { ViewProps } from 'react-native';

export const settings: IComposeSettings<IToggleType> = [
  {
    root: {
      style: {
        alignItems: 'center',
        borderRadius: 10,
        height: 20,
        justifyContent: 'center',
        width: 35,
      },
    },
    knob: {
      style: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        height: 12,
        width: 12,
      },
    },
  },
  toggleName,
];

/*export const settings: IComposeSettings<IButtonType> = [
  {
    tokens: {
      backgroundColor: 'buttonBackground',
      color: 'buttonText',
      borderColor: 'buttonBorder',
      borderWidth: 1,
      borderRadius: 2
    },
    root: {
      accessible: true,
      acceptsKeyboardFocus: true,
      accessibilityRole: 'button',
      style: { display: 'flex', alignItems: 'flex-start', flexDirection: 'row', alignSelf: 'flex-start' }
    } as ViewProps,
    content: {},
    icon: {},
    stack: {
      style: {
        display: 'flex',
        paddingStart: 16,
        paddingEnd: 16,
        alignItems: 'center',
        flexDirection: 'row',
        alignSelf: 'flex-start',
        minHeight: 32,
        minWidth: 80,
        justifyContent: 'center'
      }
    },
    _precedence: ['hovered', 'focused', 'pressed', 'disabled'],
    _overrides: {
      disabled: {
        tokens: {
          backgroundColor: 'buttonBackgroundDisabled',
          color: 'buttonTextDisabled',
          borderColor: 'buttonBorderDisabled'
        }
      },
      hovered: {
        tokens: {
          backgroundColor: 'buttonBackgroundHovered',
          color: 'buttonTextHovered',
          borderColor: 'buttonBorderHovered'
        }
      },
      pressed: {
        tokens: {
          backgroundColor: 'buttonBackgroundPressed',
          color: 'buttonTextPressed',
          borderColor: 'buttonBorderPressed'
        }
      },
      focused: {
        tokens: {
          borderColor: 'buttonBorderFocused',
          color: 'buttonTextHovered',
          backgroundColor: 'buttonBackgroundHovered'
        }
      }
    }
  },
  buttonName
];*/
