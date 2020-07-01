import {StyleSheet} from 'react-native';
import {padding, color, fontSize, fontFamily, windowWidth, normalize} from '../../theme/styles';

const resizeMode = 'contain';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  topContainer: {
    flex: 1,
    paddingHorizontal: 15,
    paddingBottom: padding * 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.brand,
  },
  image: {
    height: 100,
    width: 100,
    backgroundColor: color.grey,
    marginBottom: padding,
    resizeMode,
  },
  title: {
    fontSize: fontSize.large + 2,
    lineHeight: fontSize.large + 4,
    fontFamily: fontFamily.bold,
    color: color.white,
    letterSpacing: 1,
  },
  bottomContainer: {
    backgroundColor: 'transparent',
    paddingVertical: padding * 3,
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0,
    },
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerView: {
    width: windowWidth - 40,
  },
  buttonText: {
    fontSize: fontSize.regular + 2,
    fontFamily: fontFamily.medium,
  },
  orContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: windowWidth,
  },
  button: {
    backgroundColor: color.brand,
    height: normalize(55),
  },
  bottomText: {
    fontSize: fontSize.regular,
    fontFamily: fontFamily.medium,
    marginRight: 5,
    color: color.white,
  },

  bottom: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: padding * 2
  },

  signInText: {
    fontSize: fontSize.regular,
    color: color.brand,
    fontFamily: fontFamily.medium
  },
});

export default styles;
