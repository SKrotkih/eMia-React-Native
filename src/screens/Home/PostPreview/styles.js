import {StyleSheet} from 'react-native';
import {windowWidth, color} from '../../../theme/styles';

const styles = StyleSheet.create({
  container: {
    margin: 0,
    marginBottom: 0,
  },
  textHeader: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  content: {
    margin: 15,
    marginBottom: 15,
  },
  thumbnail: {
    marginLeft: 4,
    marginTop: 4,
    flexDirection: 'row',
  },
  textUserName: {
    marginHorizontal: 15,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  textDescription: {
    fontSize: 12,
    marginHorizontal: 8,
    textAlign: 'center',
    marginVertical: 8,
  },
  image: {
    width: windowWidth - 30,
    height: windowWidth - 30,
    alignSelf: 'center',
    resizeMode: 'contain',
    backgroundColor: color.white
  },
  timeBackground: {
    marginRight: 15,
    marginTop: 15,
  },
  textPublishedAt: {
    fontSize: 12,
    textAlign: 'right',
    color: color.black,
    marginTop: 15,
  },
});

export default styles;
