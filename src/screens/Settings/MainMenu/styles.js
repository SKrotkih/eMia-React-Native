import {StyleSheet} from 'react-native';
import {windowWidth, windowHeight} from '../../../theme/styles';

const styles = StyleSheet.create({
  avatar: {
    flexDirection: 'row',
  },
  description: {
    alignSelf: 'center',
    marginLeft: 16,
    fontWeight: 'bold',
  },
  loading: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});

export default styles;
