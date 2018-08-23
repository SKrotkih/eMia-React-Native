import { StyleSheet } from 'react-native';
import { windowWidth, windowHeight } from '@theme/styles';

const resizeMode = 'contain';

const styles = StyleSheet.create({
  container: {
    margin: 0,
    marginBottom: 0,
    backgroundColor: '#fff'
  },
  content: {
    margin: 15,
    marginBottom: 15,
    backgroundColor: '#fff'
  },
  thumbnail: {
    marginLeft: 4,
    marginTop: 4,
    flexDirection: 'row'
  },
  photo: {
    width: windowWidth - 30,
    height: windowWidth - 30,
    alignSelf: 'center',
    resizeMode: 'contain'
  },
  backgroundPhoto: {
    width: windowWidth - 30,
    height: windowWidth - 30
  },
  title: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: 'bold',
    textAlign: 'center'
  },

  description: {
    fontSize: 14,
    textAlign: 'center',
    marginVertical: 8
  },
});

export default styles;
