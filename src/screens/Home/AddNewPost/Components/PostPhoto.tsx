/**
 * Sample React Native App
 * https://github.com/SKrotkih/eMia-React-Native
 *
 * @format
 * @flow
 */

import {ImageViewer} from "../../../../components/ImageViewer";
import React from "react";
import {StyleSheet, useWindowDimensions} from "react-native";
import {color} from "../../../../theme/styles";
import {isEmpty} from "../../../../utils/validate";

export default function Photo(props) {
  const {url, darkTheme} = props;
  const windowWidth = useWindowDimensions().width

  return (
    (isEmpty(url) && <></>) || (
      <ImageViewer
        disabled={false}
        source={{uri: url}}
        downloadable
        doubleTapEnabled={true}
        imageStyle={[styles.image, {height: windowWidth - 30}, {width: windowWidth - 30}]}
        darkTheme={darkTheme}
      />
    )
  );
}

const styles = StyleSheet.create({
  image: {
    overflow: 'hidden',
    backgroundColor: color.white,
    margin: 0,
    marginLeft: 0,
    marginRight: 0,
  },
});
