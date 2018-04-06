import { StyleSheet, Platform, Dimensions } from 'react-native';
import { color, fontSize, fontFamily, windowWidth, normalize } from '../../../theme/styles';

const resizeMode = 'contain';

const deviceHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    height: Platform.OS === "ios" ? deviceHeight : deviceHeight - 20
  },
  loading: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  separator: {
    height: 1,
    marginBottom: 4,
    backgroundColor: '#eee'
  },
});

const gridItemStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    height: 200,
    margin: 1
  },
  image: { 
    alignSelf: 'center', 
    resizeMode: 'cover',
    height: 140, 
    width: 140 
  },
  title: {
    fontSize: 12,
    marginBottom: 4,
    fontWeight: 'bold',    
    textAlign: 'center'
  },
  description: {
    fontSize: 10,
    marginBottom: 2,
    textAlign: 'center'
  }
});

export {styles, gridItemStyles};
