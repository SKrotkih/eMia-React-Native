import {StyleSheet} from 'react-native';
import {windowWidth} from '@theme/styles';

const styles = StyleSheet.create({
  container: {
    margin: 0,
    marginBottom: 0,
    backgroundColor: '#fff',
  },
  content: {
    margin: 15,
    marginBottom: 15,
  },
  backgroundPhoto: {
    marginTop: 50,
    width: windowWidth - 30,
    height: windowWidth - 30,
  },
  button: {
    marginTop: 20,
    marginLeft: 15,
    marginRight: 15,
  },
});

export default styles;
