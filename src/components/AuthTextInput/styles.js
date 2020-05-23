import { StyleSheet } from 'react-native';
import { windowWidth, fontSize, fontFamily, normalize } from '@theme/styles';

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },

  inputContainer: {
    width: windowWidth - 40,
    height: normalize(65),
    fontSize: fontSize.regular + 2,
    fontFamily: fontFamily.bold,
    borderBottomColor: '#A5A7A9',
  }
});

export default styles;
