import React, {Component} from 'react';
import ReactNative from 'react-native';
import {Alert} from '@theme/components/alerts/';
import Grid from 'react-native-grid-component';
import {styles, gridItemStyles} from './styles';
import {Actions} from 'react-native-router-flux';
import Loader from '@components/Loader';
import {Body, Text} from 'native-base';

const {Image, View, TouchableOpacity} = ReactNative;

export default class TabAllPosts extends Component {
  constructor(props) {
    super(props);
    this.modalView = props.modalView;
    this.filter = props.filter;
  }

  render() {
    if (!this.modalView.loaded) {
      return this.renderLoadingView();
    }
    return (
      <Grid
        style={styles.list}
        renderItem={this.renderItem}
        renderSeparator={this.renderSeparator.bind(this)}
        renderPlaceholder={this.renderPlaceholder}
        data={this.modalView.dataSource}
        numColumns={2}
        itemHasChanged={(d1, d2) => d1 !== d2}
        keyExtractor={(item, index) => index.toString()}
        refreshing={this.modalView.refreshing}
        onRefresh={() => {
          this.modalView.refreshData();
        }}
        onEndReached={() => {
          // this.setState(({ data }) => ({
          //   data: [...data, ...generateRandomColorsArray(ITEMS_COUNT)],
          // }));
        }}
      />
    );
  }

  renderLoadingView() {
    return (
      <View style={styles.loading}>
        <Loader loading={true}/>
      </View>
    );
  }

  renderPlaceholder(sectionID, rowID) {
    // TODO: create properly key
    let key = '' + sectionID + '-9';
    return (
      <View style={gridItemStyles.container} key={key}>
        <Text></Text>
      </View>
    );
  }

  renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
    // TODO: The same. Need a key
    let key = '' + sectionID + '-' + rowID;
    return <View style={styles.separator} key={key}/>;
  }

  renderItem(item, sectionID, rowID) {
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
}

function selectPostItem(item) {
  Actions.PostPreview({item});
}
