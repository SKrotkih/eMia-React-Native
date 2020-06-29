import {Root, StyleProvider} from "native-base";
import {Provider} from 'react-redux';
import store from "../../../../redux/store";
import getTheme from "../../../../components";
import variables from "../../../../theme/variables/commonColor";
import React from "react";
import NavigationStack from './navigationStack';

export default function homeScreenRenderer() {
  return (
    <Root>
      <Provider store={store}>
        <StyleProvider style={getTheme(variables)}>
          <NavigationStack />
        </StyleProvider>
      </Provider>
    </Root>
  );
}
