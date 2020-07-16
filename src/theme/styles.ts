import { moderateScale as normalize } from 'react-native-size-matters';

const color = {
  brand: '#21AEED',
  dark: '#333333',
  black: '#3B3031',
  light_black: '#414141',
  white: '#ffffff',
  light_grey: '#eaeaea',
  tableSeparator: '#737373',
  grey: '#ccc',
  red: 'red',
  underlayColor: '#ddd',
};

const fontSize = {
  small: normalize(12),
  regular: normalize(14),
  large: normalize(21),
};

const fontFamily = {
  Verdana: {
    weights: {
      ExtraBold: '800',
      Bold: '700',
      SemiBold: '600',
      Light: '300',
      Normal: '400',
    },
    styles: {
      Italic: 'italic',
    },
  },
};

const padding = 8;

export {
  padding,
  color,
  fontSize,
  fontFamily,
  normalize,
};
