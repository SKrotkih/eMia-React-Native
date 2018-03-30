import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View
} from 'react-native';

export class GridItem extends Component {
  render () {
    return (
      <View style={styles.content} >
        {/* <Image
          source={{uri: this.props.postItem.posters.thumbnail}}
          style={styles.thumbnail}
        /> */}
        <View >
          <Text style={styles.title} numberOfLines={1}>
            {this.props.postItem.title}
          </Text>

          <Text style={styles.title}  numberOfLines={3}>
            {this.props.postItem.body}
          </Text>
          {/* <Text style={styles.year}>
            {this.props.postItem.year}
          </Text> */}
        </View>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  content: {
    height: 150,
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column'
  },
  title: {
    fontSize: 10,
    marginBottom: 8,
    width: 90,
    textAlign: 'center'
  },
  year: {
    textAlign: 'center'
  },
  thumbnail: {
    width: 53,
    height: 81
  }
})
