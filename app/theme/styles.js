import { Dimensions, Platform, StatusBar } from 'react-native';
import { moderateScale as normalize } from 'react-native-size-matters';

const color = {
  brand: '#21AEED',
  black: '#3B3031',
  light_black: '#414141',
  main: 'rgb(99,139,250)',
  white: '#ffffff',
  light_grey: '#eaeaea',
  grey: '#ccc',
  red: 'red',
  underlayColor: '#ddd'
};

const fontSize = {
  small: normalize(12),
  regular: normalize(14),
  large: normalize(21)
};

const customfontFamily = {
  extrabold: 'RobotoBlack',
  bold: 'RobotoBold',
  medium: 'RobotoMedium',
  regular: 'RobotoRegular',
  light: 'RobotoLight'
};

const fontFamily = {
  Verdana: {
    weights: {
      ExtraBold: '800',
      Bold: '700',
      SemiBold: '600',
      Light: '300',
      Normal: '400'
    },
    styles: {
      Italic: 'italic'
    }
  }
};

const padding = 8;
const navbarHeight = (Platform.OS === 'ios') ? 64 : 54;
const statusBarHeight = Platform.OS === "ios" ? 0 : 20;
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const tabColor = (Platform.OS === 'ios') ? 'rgba(73,75,76, .5)' : 'rgba(255,255,255,.8)';
const selectedTabColor = (Platform.OS === 'ios') ? 'rgb(73,75,76)' : '#fff';

const tabIconStyle = { size: 21, color: tabColor, selected: selectedTabColor };
const navTitleStyle = { fontSize: fontSize.large, fontFamily: fontFamily.extrabold, color: color.white };
const navBarStyle = { backgroundColor: color.brand, marginTop: statusBarHeight };

export {
  padding,  
  color,
  fontSize,
  fontFamily,
  navbarHeight,
  windowWidth,
  windowHeight,
  tabIconStyle,
  navTitleStyle,
  normalize,
  navBarStyle
};
