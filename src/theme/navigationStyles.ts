/**
 * Sample React Native App
 * https://github.com/SKrotkih/eMia-React-Native
 *
 * @format
 * @flow
 */

import {THEMES} from '../config/constants';
const {colors} = THEMES.gitterDefault;

const navigationStyles = {
  navBarBackgroundColor: colors.raspberry,
  navBarButtonColor: 'white',
  navBarTextColor: 'white',
  topBarElevationShadowEnabled: true,
  statusBarColor: colors.darkRed,
  statusBarTextColorScheme: 'dark',
};

export default navigationStyles;
