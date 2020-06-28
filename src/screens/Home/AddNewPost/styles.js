import {StyleSheet} from 'react-native';
import {windowWidth, color} from '../../../theme/styles';

const styles = StyleSheet.create({
  container: {
    paddingTop: 23,
    margin: 0,
    marginBottom: 0,
    backgroundColor: color.white,
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
    borderColor: color.brand,
    borderWidth: 1,
  },
  button: {
    marginTop: 20,
    marginLeft: 15,
    marginRight: 15,
  },
  rightBarButton: {
    marginRight: 15,
    color: color.white,
  },
  backgroundImage: {
    backgroundColor: color.white,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 15,
    padding: 0,
  },
  image: {
    overflow: 'hidden',
    backgroundColor: color.white,
    margin: 0,
    marginLeft: 0,
    marginRight: 0,
    height: windowWidth - 30,
    width: windowWidth - 30,
  },
});

export default styles;
