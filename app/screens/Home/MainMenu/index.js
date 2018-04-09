import React from 'react';
import ReactNative from 'react-native';

import {Actions} from 'react-native-router-flux';

import Loader from '../../../components/Loader';

import {getCurrentUser, signOut} from '../../../model/auth/actions';

import styles from './styles';
import { windowWidth, windowHeight } from '../../../theme/styles';

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
  List,
  ListItem } from 'native-base';

const {
  Dimensions,  
  AppRegistry,
  Image,
  StyleSheet,
  View,
  Alert,
  TouchableOpacity
} = ReactNative;
const {
  Component
} = React;

const menuItems = [
  {
    id: "profile",
    text: "Profile",
  },
  {
    id: "logout",
    text: "Log Out",
  }
];

export class MainMenu extends Component {
  constructor (props) {
    super(props);
    this.state = {
      loaded: false,
      user: null
    };
  }

  setTitle(titleText) {
    const {setParams} = this.props.navigation;
    setParams({ title: titleText });
  }

  componentWillMount () {
    this.setTitle("Settings");
  }

  componentDidMount () {
    this.fetchCurrentUserData();
  }

  fetchCurrentUserData () {
    getCurrentUser((user) => {
      this.setState({
        user: user,
        loaded: true
      });
    });
  }

  render () {
    if (!this.state.loaded) {
      return renderLoadingView();
    }
    var _this = this;
    return (
      <Container style={{margin: 15, marginBottom: 15, backgroundColor: '#ffffff'}}>
        <Content>
          <List
            dataArray={menuItems}
            renderRow={menuItem =>
              renderMenuItem(menuItem, _this)
            }
          />
        </Content>
      </Container>
    )
  }
}

function renderLoadingView () {
  return (
    <View style={styles.loading}>
      <Loader loading={true} />
    </View>
  );
}

function renderMenuItem(menuItem, _this) {
  if (menuItem.id === 'logout') {
    return (
      renderLogOutMenuItem(_this)
    )
  } else if (menuItem.id === 'profile') {
    return (
      renderProfileMenuItem(_this)
    )
  } else {
    return null;
  }
}

// Profile

function renderProfileMenuItem(_this) {
  var user = _this.state.user;
  if (user === null) {
    return (
      null
    )
  } else {
    var avatarUrl = user.avatarUrl;
    return (
      <ListItem avatar>
        <Left>
          <Thumbnail circular size={55} source={{uri: avatarUrl}} />          
        </Left>
        <Body>
          <Text>
            {user.username}
          </Text>
        </Body>
      </ListItem>
    )
  }
}

// Log Out

function renderLogOutMenuItem(_this) {
  var user = _this.state.user;
  if (user === null) {
    return (
      null
    )
  } else {
    return (
      <ListItem avatar>
        <Body>
          <TouchableOpacity
            onPress={this.onSignOut}>
            <View style={{ }}>
              <Text>
                Log Out
              </Text>
            </View>
          </TouchableOpacity>
        </Body>
      </ListItem>
    )
  }
}

function onSignOut () {
  api.signOut(this.onSuccess.bind(this), this.onError.bind(this));
}

function onSuccess () {
  Actions.reset('Auth');
}

function onError (error) {
  Alert.alert('Oops!', error.message);
}

// - Log Out

export default MainMenu
