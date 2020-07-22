import React, {FunctionComponent} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {Drawer} from 'react-native-paper';
import store from '../../../../redux/store';
import {LOGGED_OUT} from '../../../../redux/actionTypes';
import {color} from '../../../../theme/styles';
import {logOut} from '../../../../model/dbinteractor/login/dbinteractor';
import MenuHeader from './Components/MenuHeader';
import MenuFooter from './Components/MenuFooter';

interface ContentDriverItem {
  key: string;
  icon: string;
  label: string;
  onSelect: () => void;
}

export function DrawerContent(props) {
  const menuItems: Array<ContentDriverItem> = [
    {
      key: 'home',
      // https://oblador.github.io/react-native-vector-icons/  in 'Materislicons'
      icon: 'home',
      label: 'Home',
      onSelect: () => closeDrawer(props),
    },
    {
      key: 'person',
      icon: 'person',
      label: 'My Profile',
      onSelect: () => editProfile(props),
    },
    {
      key: 'stop',
      icon: 'stop',
      label: 'Log Out',
      onSelect: () => handleLogOut(props),
    },
  ];

  const MenuItem: FunctionComponent = (props) => {
    const {item} = props;
    return (
      <DrawerItem
        key={item.key}
        icon={({size, color}) => (
          <MaterialIcons size={size} color={color} name={item.icon} />
        )}
        label={item.label}
        labelStyle={styles.drawerLabel}
        onPress={item.onSelect}
      />
    );
  };

  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <MenuHeader />
          <Drawer.Section style={styles.drawerSection}>
            {menuItems.map((item, _) => {
              return <MenuItem item={item}></MenuItem>;
            })}
          </Drawer.Section>
          <Drawer.Section style={styles.drawerSection} title="Preferences">
            <MenuFooter />
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
});
