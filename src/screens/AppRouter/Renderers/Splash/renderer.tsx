/**
 * Sample React Native App
 * https://github.com/SKrotkih/eMia-React-Native
 *
 * @format
 * @flow
 */

import {Root} from "native-base";
import {NavigationContainer} from "@react-navigation/native";
import {Dimensions, ImageBackground, StatusBar, StyleSheet} from "react-native";
import React from "react";

export default function splashScreenRenderer() {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  let splashImg = '../../../../assets/images/splash.png';
  return (
    <Root>
      <NavigationContainer>
        <ImageBackground
          style={[styles.background, {width: windowWidth}, {height: windowHeight}]}
          source={require(splashImg)}>
          <StatusBar translucent barStyle="dark-content"/>
        </ImageBackground>
      </NavigationContainer>
    </Root>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
