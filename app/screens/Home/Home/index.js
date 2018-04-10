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


import React from 'react';
import ReactNative from 'react-native';
import Grid from 'react-native-grid-component';
import NativeBase from 'native-base';

import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import { YellowBox, StatusBar } from 'react-native';
import _ from 'lodash';

import { color } from '../../../theme/styles';

import {styles, gridItemStyles} from './styles';
import Loader from '../../../components/Loader';

import { actions as home } from '../index';
import { config } from '../index';
import { actions as auth } from '../../Auth/index';

import { 
  Container, 
  Header, 
  Title, 
  Content, 
  Footer, 
  FooterTab, 
  Button, 
  Left, 
  Right, 
  Body, 
  Icon, 
  Text, 
  Thumbnail,
  Segment,
  Tabs,
  Tab,
  ScrollableTab,
  Fab,
  IconNB
} from 'native-base';

const {
  AppRegistry,
  Image,
  StyleSheet,
  View,
  Alert,
  TouchableHighlight,
  TouchableOpacity,
  ActivityIndicator  
} = ReactNative;
const {
  Component
} = React;
const {
  fetchUsers,
  fetchPosts
} = home;
const {
  login
} = auth;

export class Home extends Component {
  constructor (props) {
    super(props);
    this.state = {
      dataSource: null,
      loaded: false,
      data: null,
      seg: 1,
      active: false      
    };
    this.onCompletion = this.onCompletion.bind(this);
    this.onFailed = this.onFailed.bind(this);
  }

  setUpNavigationBar() {
    var title = config.APP_NAME;
    const {setParams} = this.props.navigation;
    setParams({ 
      title: title,
      left: 
      <Icon style={{marginLeft: 8, color: "#fff"}} name={'ios-menu'}
      onPress={ () => { menuButtonPressed() }} />,
      right: 
      <Icon style={{marginRight: 8, color: "#fff"}} name={'ios-options'}
      onPress={ () => { optionsButtonPressed() }} />
    });
  }

  componentWillMount () {
    this.setUpNavigationBar();
  }

  componentDidMount () {
    this.fetchData();
  }

  fetchData () {
    this.props.fetchPosts(this.onCompletion, this.onFailed);
  }

  onCompletion (items) {
    this.setState({
      dataSource: items,
      loaded: true
    });
  }

  onFailed (error) {
    if (error != null) {
      Alert.alert('Oops!', error.message);
    }
    this.setState({
      dataSource: [],
      loaded: true
    });
  }

  // Segmented Control 
  render_Segment () {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }
    return (
      <Container>
        <StatusBar backgroundColor={color.brand} barStyle="light-content" />
        <Header hasSegment>
          <Body>
            <Segment>
              <Button
                active={this.state.seg === 1 ? true : false}
                first
                onPress={() => this.setState({ seg: 1 })}
              >
                <Text>Recent</Text>
              </Button>
              <Button
                last
                active={this.state.seg === 2 ? true : false}
                onPress={() => this.setState({ seg: 2 })}
              >
                <Text>My Posts</Text>
              </Button>
            </Segment>
          </Body>
        </Header>
        <Content padder contentContainerStyle={styles.container}>
          {this.state.seg === 1 && this.renderTab1()}
          {this.state.seg === 2 && this.renderTab2()}
        </Content>
      </Container>
    );
  }

  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }
    // Icons
    //  https://oblador.github.io/react-native-vector-icons/
    // 
    return (
      <Container>
        <Tabs renderTabBar={() => <ScrollableTab />}>
          <Tab heading="Recent">
            {this.renderTab1()}
          </Tab>
          <Tab heading="My Posts">
            {this.renderTab2()}
          </Tab>
          <Tab heading="Tab3">
            {this.renderTab2()}
          </Tab>
          <Tab heading="Tab4">
            {this.renderTab2()}
          </Tab>
          <Tab heading="Tab5">
            {this.renderTab2()}
          </Tab>
        </Tabs>
        <Fab
          active={this.state.active}
          direction="up"
          containerStyle={{}}
          style={{ backgroundColor: color.brand }}
          position="bottomRight"
          onPress={() => this.setState({ active: !this.state.active })}
        >
          <IconNB name="ios-menu" />
          <Button style={{ backgroundColor: color.brand }}
            onPress={() => createNewPostButtonPressed()}  >
            <IconNB name="ios-create" />
          </Button>
        </Fab>
      </Container>
    );
  }

  renderTab1 () {
    return (    
      <Grid
        style={styles.list}
        renderItem={this.renderItem}
        renderSeparator={this.renderSeparator.bind(this)}            
        renderPlaceholder={this.renderPlaceholder}
        data={this.state.dataSource}
        itemsPerRow={2}
        itemHasChanged={(d1, d2) => d1 !== d2}
      // callback on reaching the end of the available data
      // onEndReached={() =>
      //   this.setState({
      //     data: [...this.state.data, ...dataSource],
      //   })
      // }
      />
    )
  }

  renderTab2 () {
    return (
      <Text>My Posts</Text>
    )
  }

  renderLoadingView () {
    return (
      <View style={styles.loading}>
        <Loader loading={true} />
      </View>
    );
  }

  renderPlaceholder (sectionID, rowID) {
    // TODO: create properly key
    var key = ''+sectionID+'-9'
    return (
      <View style={gridItemStyles.container} key={key}>
        <Text>
        </Text>
      </View>
    )
  }

  renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
    // TODO: The same. Need key
    var key = ''+sectionID+'-'+rowID
    return (
      <View style={styles.separator} key={key} />
    )
  }            

  renderItem (item, sectionID, rowID) {
    var title = item.value.title;
    var body = item.value.body;
    var key = item.key;
    var url = item.url;
    return (
      <View style={gridItemStyles.container} key={key}>
        <TouchableOpacity key={key} style={{flexDirection:'row'}} activeOpacity={0.5} onPress={() => {
          selectPostItem(item)        
        }}>
        <Body>
          <Image style={gridItemStyles.image} source={{ cache:'force-cache', uri: url }} />
          <Text style={gridItemStyles.title} numberOfLines={1}>
            {title}
          </Text>
          <Text style={gridItemStyles.description} numberOfLines={3}>
            {body}
          </Text>
        </Body>
        </TouchableOpacity>
      </View>
    ) 
  }
}

// Handlers on the button pressing.
function selectPostItem(item) {
  Actions.PostPreview({ item });
}

function createNewPostButtonPressed() {
  Actions.AddNewPost();
}

function menuButtonPressed() {
  Actions.MainMenu();
}

function optionsButtonPressed() {
  Actions.Options();
}

export default connect(null, { login, fetchPosts })(Home)
