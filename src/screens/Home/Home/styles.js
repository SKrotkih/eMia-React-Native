import {StyleSheet} from 'react-native';
import {color} from '../../../theme/styles';

const styles = StyleSheet.create({
  leftNavBarButton: {
    marginLeft: 8,
    color: color.white,
  },
  rightNavBarButton: {
    marginRight: 8,
    color: color.white,
  },
  actionButton: {
    backgroundColor: color.brand,
  },
  tabUnderlined: {
    borderBottomWidth: 2,
  },
  tab: {
    backgroundColor: 'transparent',
  },
  tabText: {
    color: color.brand,
  },
  activeTab: {
    backgroundColor: 'transparent',
  },
  activeTabDark: {
    backgroundColor: 'transparent',
  },
  activeTextTab: {
    color: 'black',
    fontWeight: 'bold',
  },
  activeTextTabDark: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export {styles};
