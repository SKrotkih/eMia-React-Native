/**
 * Sample React Native App
 * https://github.com/SKrotkih/eMia-React-Native
 *
 * @format
 * @flow
 */

import {ImageViewer} from "../../../../components/ImageViewer";
import {color} from "../../../../theme/styles";
import React from "react";
import {StyleSheet, useWindowDimensions} from "react-native";

export default function  AttachedImage(props) {
  const {url, darkTheme} = props;
  const windowWidth = useWindowDimensions().width;
  return (
    <ImageViewer
      imageStyle={
        [styles.image,
        {width: windowWidth - 30},
        {height: windowWidth - 30},
        {backgroundColor: darkTheme ? color.dark : color.white}]
      }
      disabled={false}
      source={url}
      downloadable
      doubleTapEnabled={true}
    />
  )
}

const styles = StyleSheet.create({
  image: {
    alignSelf: 'center',
    resizeMode: 'contain',
    backgroundColor: color.white
  },
});
