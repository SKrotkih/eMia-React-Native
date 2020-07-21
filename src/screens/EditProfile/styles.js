import {StyleSheet} from 'react-native';
import {windowWidth, color} from '../../theme/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    margin: 0,
  },
  content: {
  },
  rightBarButton: {
    color: color.white,
    marginRight: 8,
  },
  label: {
    fontWeight: 'normal',
    fontSize: 12,
    marginLeft: 15,
    padding: 0,
    height: 20,
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
  button: {
    margin: 30,
    marginLeft: 0,
    marginRight: 0,
  },
  buttonText: {
    fontSize: 12,
  },
  image: {
    overflow: 'hidden',
    backgroundColor: color.grey,
    margin: 0,
    marginLeft: 0,
    marginRight: 0,
    height: windowWidth - 30,
    width: windowWidth - 30,
    borderRadius: (windowWidth - 30.0) / 2.0,
    borderColor: color.brand,
    borderWidth: 1,
  },
});

export default styles;
