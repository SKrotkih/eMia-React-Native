import { StyleSheet } from 'react-native';
import { windowWidth, windowHeight } from '@theme/styles';

const resizeMode = 'contain';

const styles = StyleSheet.create({
  container: {
    margin: 15, 
    marginBottom: 15, 
    backgroundColor: '#ffffff'
  },

  content: {
    height: windowHeight
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
  loading: {
    flex: 1,
    backgroundColor: '#FFFFFF'
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
