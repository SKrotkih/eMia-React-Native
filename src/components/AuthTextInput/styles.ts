import {StyleSheet} from 'react-native';
import {color} from '../../theme/styles';

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },

  input: {
    fontSize: 12,
    margin: 5,
    marginLeft: 0,
    marginRight: 0,
    paddingLeft: 15,
    height: 35,
    borderRadius: 8,
    borderColor: color.brand,
    borderWidth: 1,
  },

  errorText: {
    fontSize: 12,
    fontWeight: 'normal',
    color: 'red',
  },
});

export default styles;
