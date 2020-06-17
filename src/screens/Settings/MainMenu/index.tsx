import React, {useState, useEffect, FunctionComponent} from 'react';
import {View, Alert} from 'react-native';
import {
  Container,
  Content,
  List,
} from 'native-base';
import {Actions} from 'react-native-router-flux';
import {Loader} from '../../../components/Loader';
import {logOut} from '../../../model/dbinteractor/login/dbinteractor';
import {downloadCurrentUserData} from '../../../model/dbinteractor/users/dbinteractor';
import styles from './styles';
import {User} from '../../../model/entities/user';
import {renderProfileMenuItem} from './ProfileMenuItemView';
import {renderLogOutMenuItem} from './LogOutMenuItemView';

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
    if (menuItem.id === 'profile') {
      return renderProfileMenuItem(
        user,
        avatarUrl,
        (_url) => {
          setAvatarUrl(_url);
        },
        (_user) => {
          editProfile(_user);
        },
      );
    } else if (menuItem.id === 'logout') {
      return renderLogOutMenuItem(() => {
        onSignOut();
      });
    } else {
      return null;
    }
  }

  // Actions

  function editProfile(user) {
    Actions.EditProfile({user});
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
      <Container style={styles.container}>
        <Content style={styles.contentList}>
          <List
            dataArray={menuItems}
            renderRow={(menuItem) => renderMenuItem(menuItem)}
          />
        </Content>
      </Container>
    )
  );
};
