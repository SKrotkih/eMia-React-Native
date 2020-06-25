import React from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {
  Title,
  Caption,
  Paragraph,
  Drawer,
  useTheme,
  Avatar,
  Text,
  TouchableRipple,
  Switch
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {User} from '../../model/entities/user';
import {downloadCurrentUserData} from "../../model/dbinteractor/users/dbinteractor";
import {Actions} from "react-native-router-flux";
import {logOut} from "../../model/dbinteractor/login/dbinteractor";

export function DrawerContent(props) {
  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{flexDirection: 'row', marginTop: 15}}>
              <View style={{flexDirection: 'column'}}>
                <Drawer.Section style={styles.drawerSection}>
                  <DrawerItem
                    label="eMia React Native"
                    onPress={() => {closeDrawer(props)}}
                  />
                </Drawer.Section>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.section}>
                <Paragraph style={[styles.paragraph, styles.caption]}>80</Paragraph>
                <Caption style={styles.caption}>Following</Caption>
              </View>
            </View>
          </View>
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              // icon={({color, size}) => (
              //   <Icon
              //     name="home-outline"
              //     color={color}
              //     size={size}
              //   />
              // )}
              label="My Profile"
              onPress={() => {editProfile(props)}}
            />
            <DrawerItem
              label="Log Out"
              onPress={() => {handleLogOut(props)}}
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
    </View>
  );
}

// Actions

function closeDrawer(props) {
  props.navigation.closeDrawer();
}

function editProfile(props) {
  // TODO: Activity indication needed
  downloadCurrentUserData((user) => {
    props.navigation.navigate('EditProfile', {user: user, completion: null});
  });
}1

function handleLogOut(props) {
  logOut(
    () => {
      Actions.reset('Auth');
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
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
