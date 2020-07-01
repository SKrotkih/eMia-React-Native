import {StyleSheet} from 'react-native';
import {color, fontSize} from '../../../theme/styles';

const styles = StyleSheet.create({
  separator: {
    marginVertical: 8,
    borderBottomColor: color.tableSeparator,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    marginTop: 30,
    marginHorizontal: 16,
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
});

export default styles;
