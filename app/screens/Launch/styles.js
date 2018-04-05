import { 
  StyleSheet 
} from 'react-native';
import { color, fontFamily, fontSize } from '../../theme/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.white
  },

  backgroundImage: {
    flex: 1,
    resizeMode: 'cover'  // or 'stretch'    
  },

  title: {
    fontSize: fontSize.large + 5,
    lineHeight: fontSize.large + 7,
    fontFamily: fontFamily.medium,
    color: '#FFFFFF',
    letterSpacing: 1
  },

  activityIndicatorContainer: {
    flex: 1,
    justifyContent: 'center',
  }
});

export default styles;
