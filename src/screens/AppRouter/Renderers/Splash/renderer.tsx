import {Root} from "native-base";
import {NavigationContainer} from "@react-navigation/native";
import {ImageBackground, StatusBar, StyleSheet} from "react-native";
import React from "react";
import backgroundImage from "../../../../theme/BackgroundImage";

export default function splashScreenRenderer() {
  let splashImg = '../../../../assets/images/splash.png';
  return (
    <Root>
      <NavigationContainer>
        <ImageBackground
          style={styles.background}
          source={require(splashImg)}>
          <StatusBar translucent barStyle="dark-content"/>
        </ImageBackground>
      </NavigationContainer>
    </Root>
  );
}

const styles = StyleSheet.create({
  background: {
    ...backgroundImage,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
