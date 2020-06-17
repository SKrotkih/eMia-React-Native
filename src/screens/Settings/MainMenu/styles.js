import {StyleSheet} from 'react-native';
import {color} from '../../../theme/styles';

const styles = StyleSheet.create({
  container: {
    margin: 15,
    marginBottom: 15,
    backgroundColor: '#00000000',
  },
  contentList: {
    backgroundColor: '#00000000',
  },
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
    backgroundColor: color.white,
  },
});

export default styles;
