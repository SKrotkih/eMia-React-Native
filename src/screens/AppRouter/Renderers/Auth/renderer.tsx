import {Root, StyleProvider} from "native-base";
import store from "../../../../redux/store";
import getTheme from "../../../../components";
import variables from "../../../../theme/variables/commonColor";
import React from "react";
import {Provider} from 'react-redux';
import AuthNavigation from './navigationStack';

export default function logInScreen() {
  return (
    <Root>
      <Provider store={store}>
        <StyleProvider style={getTheme(variables)}>
          <AuthNavigation />
        </StyleProvider>
      </Provider>
    </Root>
  );
}
