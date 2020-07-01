import {StyleSheet} from 'react-native';
import {windowWidth, color} from '../../../theme/styles';

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

const gridItemStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    height: 220,
    margin: 1,
  },
  containerDark: {
    flex: 1,
    backgroundColor: color.black,
    flexDirection: 'column',
    alignItems: 'center',
    height: 220,
    margin: 1,
  },
  image: {
    alignSelf: 'center', // 'stretch'􏰸 'contain'􏰸 'cover'􏰸 'repeat' 'center'
    resizeMode: 'cover',
    height: 160,
    width: (windowWidth - 8) / 2,
    borderRadius: 15,
  },
  title: {
    fontSize: 12,
    marginBottom: 4,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  description: {
    fontSize: 10,
    marginBottom: 2,
    textAlign: 'center',
  },
});

const TABS = {
  ALLPOSTS: 'allposts',
  MYPOSTS: 'myposts',
};

export {styles, gridItemStyles, TABS};
