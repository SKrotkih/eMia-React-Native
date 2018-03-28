'use strict'

import React, { Component } from 'react'
import {
  Image,
  StyleSheet,
  Text,
  View
} from 'react-native'

export class Movie extends Component {
  render () {
    return (
      <View style={styles.movie} >
        <Image
          source={{uri: this.props.movie.posters.thumbnail}}
          style={styles.thumbnail}
        />
        <View >
          <Text 
            style={styles.title}
            numberOfLines={3}>{this.props.movie.title}</Text>
          <Text style={styles.year}>{this.props.movie.year}</Text>
        </View>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  movie: {
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
