/**
 * Sample React Native App
 * https://github.com/SKrotkih/eMia-React-Native
 *
 * @format
 * @flow
 */

import React from 'react';
import ReactNative, {StyleSheet} from 'react-native';
import Grid from 'react-native-grid-component';
import {Loader} from '../../../../components/Loader';
import {Text} from 'native-base';
import ModelView from '../ModelView';
import {color} from '../../../../theme/styles';
import PostGridItem from "./PostGridItem";

const {View} = ReactNative;

export const PostGrid = (props, navigation, darkTheme) => {
  const modelView: ModelView = props as ModelView;

  function renderGrid() {
    return (
      <Grid
        style={{backgroundColor: darkTheme ? color.dark : color.white}}
        renderItem={renderItem}
        renderSeparator={renderSeparator}
        renderPlaceholder={renderPlaceholder}
        data={modelView.dataSource}
        numColumns={2}
        itemHasChanged={(d1, d2) => d1 !== d2}
        keyExtractor={(item, index) => index.toString()}
        refreshing={modelView.refreshing}
        onRefresh={() => {
          modelView.refreshData();
        }}
        onEndReached={() => {}}
      />
    );
  }

  function renderItem(item, sectionID, rowID) {
    return (
      <PostGridItem item={item} navigation={navigation} darkTheme={darkTheme} />
    );
  }

  function renderPlaceholder(sectionID, rowID) {
    // TODO: create properly key
    let key = '' + sectionID + '-9';
    return (
      <View style={styles.container} key={key}>
        <Text></Text>
      </View>
    );
  }

  function renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
    // TODO: The same. Need a key
    let key = '' + sectionID + '-' + rowID;
    return <View key={key} />;
  }

  return (!modelView.loaded && <Loader loading={true} />) || renderGrid();
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    height: 220,
    margin: 1,
  },
});
