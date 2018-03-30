
import { 
  StyleSheet 
} from 'react-native';

import { 
  color, 
  fontFamily, 
  padding, 
  fontSize 
} from '../../styles/theme';

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
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 50,
    height: 50
  },
});

export default styles;
