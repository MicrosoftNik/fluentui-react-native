import { Toggle } from '@fluentui-react-native/toggle';
import { IFocusable } from '@fluentui-react-native/interactive-hooks';
import { Stack } from '@fluentui-react-native/stack';
import * as React from 'react';
//import { findNodeHandle } from 'react-native';
import { stackStyle } from '../Common/styles';

export const ToggleFocusTest: React.FunctionComponent<{}> = () => {
  /*const [state, setState] = React.useState({
    focused: false,
  });*/
  const toggleRef = React.useRef<IFocusable>(null);

  /*const onFocus = React.useCallback(() => {
    setState({ focused: !state.focused });
    if (toggleRef.current && !state.focused) {
      const node = findNodeHandle(toggleRef.current);
      console.log(node);
      toggleRef.current.focus();
    }
  }, [state, setState]);*/

  return (
    <Stack style={stackStyle}>
      <Toggle componentRef={toggleRef} />
    </Stack>
  );
};
