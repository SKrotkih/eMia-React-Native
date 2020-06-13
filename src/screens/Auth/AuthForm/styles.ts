import { StyleSheet } from 'react-native';

import {
  padding,
  color,
  windowWidth,
  normalize,
  fontSize,
} from '../../../theme/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
    marginTop: 30,
    marginHorizontal: 16,
  },

  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },

  forgotButton: {
    marginVertical: 8,
  },

  forgotText: {
    textAlign: 'center',
    color: color.brand,
    fontSize: fontSize.regular,
    fontWeight: 'normal',
  },

  errorText: {
    color: color.red,
    width: windowWidth - 45,
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
    fontWeight: 'normal',
  },
});

export default styles;
