import React, {useState, useEffect, FunctionComponent} from 'react';
import {View, Alert, TouchableOpacity} from 'react-native';
import {
  Container,
  Content,
  Body,
  Text,
  Thumbnail,
  List,
  ListItem,
} from 'native-base';
import {Actions} from 'react-native-router-flux';
import {Loader} from '../../../components/Loader';
import {logOut} from '../../../model/dbinteractor/login/dbinteractor';
import {downloadCurrentUserData} from '../../../model/dbinteractor/users/dbinteractor';
import styles from './styles';
import {User} from '../../../model/entities/user';

export const MainMenu: FunctionComponent = (props) => {
  const navigation: object = props.navigation;
  const title = 'Settings';
  const menuItems = [
    {
      id: 'profile',
      text: 'Profile',
    },
    {
      id: 'logout',
      text: 'Log Out',
    },
  ];

  const [loaded, setLoaded] = useState<Boolean>(false);
  const [user, setUser] = useState<User>(null);
  const [avatarUrl, setAvatarUrl] = useState<string>('');

  useEffect(() => {
    navigation.setParams({
      title: title,
    });
    fetchCurrentUserData();
  }, []);

  function fetchCurrentUserData() {
    downloadCurrentUserData((user) => {
      setUser(user);
      setLoaded(true);
    });
  }

  function renderLoadingView() {
    return (
      <View style={styles.loading}>
        <Loader loading={true} />
      </View>
    );
  }

  function renderMenuItem(menuItem) {
    if (menuItem.id === 'logout') {
      return renderLogOutMenuItem();
    } else if (menuItem.id === 'profile') {
      return renderProfileMenuItem();
    } else {
      return null;
    }
  }

  // Profile

  function renderProfileMenuItem() {
    if (user === null) {
      return (
        <ListItem height={63}>
          <TouchableOpacity
            style={styles.avatar}
            activeOpacity={0.5}
            onPress={() => {}}>
            <Body style={{flexDirection: 'row'}}>
              <Thumbnail circular size={55} source={{uri: 'Icon-Profile'}}/>
              <Text style={styles.description}>{'Undefined User'}</Text>
            </Body>
          </TouchableOpacity>
        </ListItem>
      );
    } else {
      user.getDownloadURL().then((url) => {
        setAvatarUrl(url);
      });
      let avatarSource = {};
      if (avatarUrl === '') {
        avatarSource.uri = 'Icon-Profile';
      } else {
        avatarSource.uri = avatarUrl;
      }
      return (
        <ListItem height={63}>
          <TouchableOpacity
            style={styles.avatar}
            activeOpacity={0.5}
            onPress={() => {
              editProfile(user);
            }}>
            <Body style={{flexDirection: 'row'}}>
              <Thumbnail circular size={55} source={avatarSource}/>
              <Text style={styles.description}>{user.username}</Text>
            </Body>
          </TouchableOpacity>
        </ListItem>
      );
    }
  }

  function editProfile(user) {
    Actions.EditProfile({user});
  }

  // Log Out

  function renderLogOutMenuItem() {
    return (
      <ListItem height={63}>
        <TouchableOpacity
          style={{flexDirection: 'row'}}
          activeOpacity={0.5}
          onPress={() => {
            onSignOut();
          }}>
          <Body style={{flexDirection: 'row'}}>
            <Text style={{alignSelf: 'center', fontWeight: 'bold'}}>Log Out</Text>
          </Body>
        </TouchableOpacity>
      </ListItem>
    );
  }

  function onSignOut() {
    logOut(
      () => {
        Actions.reset('Auth');
      },
      (error) => {
        Alert.alert('Oops!', error.message);
      },
    );
  }

  return (
    (!loaded && renderLoadingView()) || (
      <Container
        style={{margin: 15, marginBottom: 15, backgroundColor: '#00000000'}}>
        <Content style={{backgroundColor: '#00000000'}}>
          <List
            dataArray={menuItems}
            renderRow={(menuItem) => renderMenuItem(menuItem)}
          />
        </Content>
      </Container>
    )
  );
};
