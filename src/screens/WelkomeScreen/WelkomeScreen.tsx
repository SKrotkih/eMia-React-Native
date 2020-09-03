/**
 * Sample React Native App
 * https://github.com/SKrotkih/eMia-React-Native
 *
 * @format
 * @flow
 */

import React, {FunctionComponent} from 'react';
import {Text, View, TouchableOpacity, Image, StyleSheet, useWindowDimensions} from 'react-native';
import {Button} from 'react-native-elements';
import {APP_NAME} from '../../config/App-Info';
import {color, fontFamily, fontSize, normalize, padding} from "../../theme/styles";

export const WelkomeScreen: FunctionComponent = (props) => {
  const navigation: object = props.navigation;
  const windowWidth = useWindowDimensions().width;

  function signUp() {
    navigation.navigate('Register');
  }

  function signIn() {
    navigation.navigate('Login');
  }

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Image
          style={styles.image}
          source={require('../../assets/images/logo.png')}
        />
        <Text style={styles.title}>{APP_NAME}</Text>
      </View>
      <View style={styles.bottomContainer}>
        <View style={[styles.buttonContainer]}>
          <Button
            raised
            borderRadius={4}
            title={'Sign Up with E-MAIL'}
            containerViewStyle={[{width: windowWidth - 40}]}
            buttonStyle={[styles.button]}
            textStyle={styles.buttonText}
            onPress={() => signUp()}
          />
        </View>
        <View style={styles.bottom}>
          <Text style={styles.bottomText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => signIn()}>
            <Text style={styles.signInText}>Sign in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

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
  buttonText: {
    fontSize: fontSize.regular + 2,
    fontFamily: fontFamily.medium,
  },
  bottomText: {
    fontSize: fontSize.regular,
    fontFamily: fontFamily.medium,
    marginRight: 5,
    color: color.white,
  },
  button: {
    backgroundColor: color.brand,
    height: normalize(55),
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
