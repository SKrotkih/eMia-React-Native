import React, {FunctionComponent} from 'react';
import ReactNative from 'react-native';
import Grid from 'react-native-grid-component';
import {styles, gridItemStyles} from './styles';
import {Loader} from '../../../components/Loader';
import {Body, Text} from 'native-base';
import {ModelView} from './ModelView';

const {Image, View, TouchableOpacity} = ReactNative;

export const TabAllPosts: FunctionComponent = (props, navigation) => {
  const modeView: ModelView = props as ModelView;

  function renderLoadingView() {
    return (
      <View style={styles.loading}>
        <Loader loading={true} />
      </View>
    );
  }

  function renderPlaceholder(sectionID, rowID) {
    // TODO: create properly key
    let key = '' + sectionID + '-9';
    return (
      <View style={gridItemStyles.container} key={key}>
        <Text></Text>
      </View>
    );
  }

  function renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
    // TODO: The same. Need a key
    let key = '' + sectionID + '-' + rowID;
    return <View style={styles.separator} key={key} />;
  }

  function selectPostItem(postItem: any) {
    navigation.navigate('PostPreview', postItem);
  }

  function renderItem(item, sectionID, rowID) {
    let title = item.post.title;
    let body = item.post.body;
    let key = item.id;
    let url = item.imageUrl;
    return (
      <View style={gridItemStyles.container} key={key}>
        <TouchableOpacity
          key={key}
          style={{flexDirection: 'row'}}
          activeOpacity={0.5}
          onPress={() => {
            selectPostItem(item);
          }}>
          <Body>
            <Image
              style={gridItemStyles.image}
              source={{cache: 'force-cache', uri: url}}
            />
            <Text style={gridItemStyles.title} numberOfLines={1}>
              {title}
            </Text>
            <Text style={gridItemStyles.description} numberOfLines={3}>
              {body}
            </Text>
          </Body>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    (!modeView.loaded && renderLoadingView()) || (
      <Grid
        style={styles.list}
        renderItem={renderItem}
        renderSeparator={renderSeparator}
        renderPlaceholder={renderPlaceholder}
        data={modeView.dataSource}
        numColumns={2}
        itemHasChanged={(d1, d2) => d1 !== d2}
        keyExtractor={(item, index) => index.toString()}
        refreshing={modeView.refreshing}
        onRefresh={() => {
          modeView.refreshData();
        }}
        onEndReached={() => {
          // setState(({ data }) => ({
          //   data: [...data, ...generateRandomColorsArray(ITEMS_COUNT)],
          // }));
        }}
      />
    )
  );
};
