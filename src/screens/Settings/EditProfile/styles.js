import {StyleSheet} from 'react-native';
import {windowWidth} from '@theme/styles';

const styles = StyleSheet.create({
  container: {
    paddingTop: 23,
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
  label: {
    marginLeft: 15,
    padding: 0,
    height: 20,
  },
  input: {
    margin: 15,
    paddingLeft: 15,
    height: 40,
    borderRadius: 8,
    borderColor: '#25b0eb',
    borderWidth: 1,
  },
});

export default styles;
