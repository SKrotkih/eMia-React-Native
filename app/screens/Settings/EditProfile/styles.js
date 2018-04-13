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
    marginBottom: 15 
  },

  inputNameFrame: {
    flexDirection: 'row'
  },
  
  backgroundPhoto: {
    marginTop: 50, 
    width: windowWidth - 30, 
    height: windowWidth - 30 
  }

});

export default styles;
