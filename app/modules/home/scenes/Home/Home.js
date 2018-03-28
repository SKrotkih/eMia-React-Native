'use strict';

import React, { 
  Component,
} from 'react';

import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import styles from './styles'

import {
  AppRegistry,
  Image,
  StyleSheet,
  Text,
  View,
  Alert
} from 'react-native';

// How to add Firebase Auth with react native !!!
// https://github.com/g6ling/React-Native-Tips/tree/master/How_to_add_Firebase_Auth_with_react_native

// A well tested feature rich Firebase implementation for React Native, 
// supporting both iOS & Android platforms for 12+ Firebase modules 
// (including a feature rich Notifications implementation)
// https://github.com/invertase/react-native-firebase

// react native module for firebase cloud messaging and local notification
// https://github.com/evollu/react-native-fcm

// Camera
// https://github.com/react-native-community/react-native-camera
// https://github.com/wix/react-native-camera-kit


// https://www.npmjs.com/package/react-native-grid-component?activeTab=readme
// npm install react-native-grid-component --save

import Grid from 'react-native-grid-component';
import Movie from './components/grid_item'

import { actions as auth, theme } from "../../../auth/index"
const { signIn } = auth;

var API_KEY = '7waqfqbprs7pajbz28mqf6vz';
var API_URL = 'http://api.rottentomatoes.com/api/public/v1.0/lists/movies/in_theaters.json';
var PAGE_SIZE = 25;
var PARAMS = '?apikey=' + API_KEY + '&page_limit=' + PAGE_SIZE;
var REQUEST_URL = API_URL + PARAMS;
var MOVIES_PER_ROW = 3;

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: null,
      loaded: false,
      data: null,
    }
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {

    console.log(REQUEST_URL)

    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: responseData.movies,
          loaded: true,
        });
      })
      .done();
  }

  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }
    return (
      <Container>
        <Header>
          <Body>
            <Title children="eMia" />
          </Body>
        </Header>
        <Content
          contentContainerStyle={{ flex: 1, backgroundColor: '#fff' }}
          padder={false}>
         <Grid
          style={styles.list}
          renderItem={this.renderItem}
          renderPlaceholder={this._renderPlaceholder}
          data={this.state.data}
          itemsPerRow={2}
          itemHasChanged={(d1, d2) => d1 !== d2}
          // callback on reaching the end of the available data
          // onEndReached={() =>
          //   this.setState({
          //     data: [...this.state.data, ...dataSource],
          //   })
          // }
        />
        </Content>
      </Container>
    )
  }

  renderLoadingView() {
    return (
      <View>
        <Text>
          Loading topics...
        </Text>
      </View>
    );
  }

  _renderPlaceholder=i => <View style={styles.item} key={i} />;

  renderItem(item) {
    return <Movie movie={item} />
  }
}

export default connect(null, { signIn })(Home);
