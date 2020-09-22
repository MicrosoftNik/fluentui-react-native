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
