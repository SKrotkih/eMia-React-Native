import React from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {Text, Drawer, Title, Avatar, Caption, Paragraph, TouchableRipple, Switch, useTheme} from 'react-native-paper';
import store from '../../../../redux/store';
import {LOGGED_OUT} from '../../../../redux/actionTypes';
import {color} from '../../../../theme/styles';
import {logOut} from '../../../../model/dbinteractor/login/dbinteractor';
import {AppContext} from '../../../../components/context';

export function DrawerContent(props) {
  const paperTheme = useTheme();
  const {toggleTheme} = React.useContext(AppContext);

  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={{flexDirection: 'row', marginTop: 15, marginLeft: 30}}>
            <Avatar.Image source={{uri: 'Icon-Profile'}} size={35} />
            <View style={{marginLeft: 25, flexDirection: 'column'}}>
              <Title style={styles.title}>eMia React Native</Title>
              <Paragraph style={[styles.paragraph, styles.caption]}>---</Paragraph>
              <Caption style={styles.caption}>ver. 1.0.1</Caption>
            </View>
          </View>
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({size, color}) => (
                <MaterialIcons size={size} color={color} name="home" />
              )}
              label="Home"
              labelStyle={styles.drawerLabel}
              onPress={() => {
                closeDrawer(props);
              }}
            />
            <DrawerItem
              // https://oblador.github.io/react-native-vector-icons/  in 'Materislicons'
              icon={({size, color}) => (
                <MaterialIcons size={size} color={color} name="person" />
              )}
              label="My Profile"
              labelStyle={styles.drawerLabel}
              onPress={() => {
                editProfile(props);
              }}
            />
            <DrawerItem
              icon={({ size, color }) => (
                <MaterialIcons size={size} color={color} name="stop" />
              )}
              label="Log Out"
              labelStyle={styles.drawerLabel}
              onPress={() => {
                handleLogOut(props);
              }}
            />
          </Drawer.Section>
          <Drawer.Section title="Preferences">
            <TouchableRipple onPress={() => {
              toggleTheme()
            }}>
              <View style={styles.preference}>
                <Text>Dark Theme</Text>
                <View pointerEvents="none">
                  <Switch value={paperTheme.dark} />
                </View>
              </View>
            </TouchableRipple>
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
    </View>
  );
}

// Actions

function closeDrawer({navigation}) {
  navigation.navigate('Root');
}

function editProfile({navigation}) {
  navigation.navigate('Root', {
    screen: 'EditProfile',
    params: {newUser: null, completion: null},
  });
}

function handleLogOut(props) {
  logOut(
    () => {
      store.dispatch({type: LOGGED_OUT});
    },
    (error) => {
      Alert.alert('Oops!', error.message);
    },
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
    marginLeft: 15,
  },
  drawerLabel: {
    color: color.brand,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
