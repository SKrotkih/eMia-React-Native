// Home.js
//
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
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import {color} from '@theme/styles';
import {config} from '../index';
import {actions as auth} from '../../Auth/index';
import TabAllPosts from './TabAllPosts';
import {TABS} from './styles';

import {
  Container,
  Button,
  Icon,
  Text,
  Tabs,
  Tab,
  ScrollableTab,
  Fab,
  IconNB,
} from 'native-base';

import {ModelView} from './ModelView';

const {Component} = React;
const {login} = auth;

export class Home extends Component {
  constructor(props) {
    super(props);
    this.mv = new ModelView(this);
    this.state = {
      state: false,
    };
  }

  setUpNavigationBar() {
    let title = config.APP_NAME;
    const {setParams} = this.props.navigation;
    setParams({
      title: title,
      left: (
        <Icon
          style={{marginLeft: 8, color: '#fff'}}
          name={'ios-menu'}
          onPress={() => {
            menuButtonPressed();
          }}
        />
      ),
      right: (
        <Icon
          style={{marginRight: 8, color: '#fff'}}
          name={'ios-options'}
          onPress={() => {
            optionsButtonPressed();
          }}
        />
      ),
    });
  }

  componentWillMount() {
    this.setUpNavigationBar();
  }

  componentDidMount() {
    this.mv.fetchData();
  }

  updateView() {
    let currentState = !this.state.state;
    this.setState({state: currentState});
  }

  collapseMenuOnButton() {
    this.setState({
      active: false,
    });
  }

  render() {
    return (
      <Container>
        <Tabs
          tabBarUnderlineStyle={{borderBottomWidth: 2}}
          renderTabBar={() => <ScrollableTab/>}
          onChangeTab={({i}) => this.onChangeTab(i)}>
          <Tab
            heading="All Posts"
            tabStyle={{backgroundColor: 'white'}}
            textStyle={{color: color.brand}}
            activeTabStyle={{backgroundColor: 'white'}}
            activeTextStyle={{color: 'black', fontWeight: 'bold'}}>
            <TabAllPosts modalView={this.mv} />
          </Tab>
          <Tab
            heading="My Posts"
            tabStyle={{backgroundColor: 'white'}}
            textStyle={{color: color.brand}}
            activeTabStyle={{backgroundColor: 'white'}}
            activeTextStyle={{color: 'black', fontWeight: 'bold'}}>
            <TabAllPosts modalView={this.mv} />
          </Tab>
        </Tabs>
        {this.renderActionsButton()}
      </Container>
    );
  }

  renderActionsButton() {
    let activeState = this.state.active;
    return (
      <Fab
        active={activeState}
        direction="up"
        containerStyle={{}}
        style={{backgroundColor: color.brand}}
        position="bottomRight"
        onPress={() => this.setState({active: !activeState})}>
        <IconNB name="ios-menu" />
        <Button
          style={{backgroundColor: color.brand}}
          onPress={() => this.createNewPostButtonPressed()}>
          <IconNB name="ios-create" />
        </Button>
      </Fab>
    );
  }

  onChangeTab(newTab) {
    switch (newTab) {
      case 0:
        this.mv.filter = TABS.ALLPOSTS;
        break;
      case 1:
        this.mv.filter = TABS.MYPOSTS;
        break;
    }
  }

  createNewPostButtonPressed() {
    this.collapseMenuOnButton();
    Actions.AddNewPost();
  }
}

function menuButtonPressed() {
  Actions.MainMenu();
}

function optionsButtonPressed() {
  Actions.Options();
}

export default connect(null, {login})(Home);
