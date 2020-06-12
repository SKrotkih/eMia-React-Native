import { StyleSheet } from 'react-native';

import {
  padding,
  color,
  windowWidth,
  normalize,
  fontSize,
  fontFamily,
} from '../../../theme/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },

  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  errorText: {
    color: color.red,
    width: (windowWidth - 45),
    marginTop: 20,
  },

  containerView: {
    marginVertical: padding * 3,
    width: windowWidth - 40,
  },

  socialButton: {
    height: normalize(55),
    borderRadius: 4,
    marginTop: 0,
    marginBottom: 0,
  },

  button: {
    backgroundColor: color.brand,
    height: normalize(55),
  },

  buttonText: {
    fontSize: fontSize.regular + 2,
    fontWeight: "normal",
  },

  forgotText: {
    textAlign: 'center',
    color: color.black,
    marginBottom: padding,
    fontSize: fontSize.regular,
    fontWeight: "normal",
  },
});

export default styles;
