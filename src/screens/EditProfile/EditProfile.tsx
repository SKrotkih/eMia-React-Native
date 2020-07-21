// EditProfile

import React from 'react';
import ReactNative from 'react-native';
import {Button, Icon, Text} from 'native-base';
import styles from './styles';
import {ModelView} from './ModelView';
import {color} from '../../theme/styles';
import {User} from '../../model/entities/user';
import {downloadCurrentUserData} from '../../model/dbinteractor/users/dbinteractor';
import inputText from '../../components/InputText/InputText';
import Photo from '../Home/AddNewPost/Components/PostPhoto';
import takePhoto from '../Home/AddNewPost/Utils/TakePhoto';
import {useTheme} from "react-native-paper";

const {View, ScrollView} = ReactNative;

interface EditProfileState {
  updated: boolean;
}

interface EditProfileProps {
  route: any;
  navigation: any;
}

export class EditProfile extends React.Component<
  EditProfileProps,
  EditProfileState
> {
  private readonly route = null;
  private readonly navigation = null;
  private readonly completion = null;
  private modelView = null;

  constructor(props) {
    super(props);

    this.route = this.props.route;
    this.navigation = this.props.navigation;
    this.completion = this.props.route.params.completion;

    this.setUpState();
    this.configureModalView();
  }

  componentDidMount() {
    this.modelView.configure();
    this.setUpRightBarButtonItem();
  }

  private setUpState() {
    this.state = {
      updated: false,
    };
  }

  updateView() {
    this.setState({
      updated: !this.state.updated,
    });
  }

  configureModalView() {
    const newUser = this.route.params.newUser;
    let user = newUser === null ? new User('', '') : newUser;
    this.modelView = new ModelView(this, user,() => {
      this.updateView();
    });
  }

  setUpTitle() {
    this.navigation.setParams({
      title: this.modelView.title,
    });
  }

  setUpRightBarButtonItem() {
    this.navigation.setOptions({
      headerRight: () => (
        <Icon
          style={styles.rightBarButton}
          name={'ios-done-all'}
          onPress={() => {
            this.doneButtonPressed();
          }}
        />
      ),
    });
  }

  takePhotoButtonPressed() {
    this.modelView.selectAvatar();
  }

  doneButtonPressed() {
    this.modelView.submitData().then(() => {
      if (this.completion === null) {
        this.navigation.goBack();
      } else {
        this.completion();
      }
    });
  }

  render() {
    if (this.modelView.user === undefined) {
      return <></>;
    } else {
      const darkTheme = false; // TODO: check dark mode
      // const darkTheme = useTheme().dark;
      return (
        <View
          style={[
            styles.container,
            {backgroundColor: darkTheme ? color.dark : color.white},
          ]}>
          <ScrollView style={[styles.content]}>
            {this.modelView.textEditFields().map((item, _) => (
              <View key={item.key}>
                {inputText(
                  item.label,
                  item.placeholder,
                  item.value,
                  darkTheme,
                  item.onChangeText,
                )}
              </View>
            ))}
            <Button
              block
              info
              style={styles.button}
              onPress={() => this.takePhotoButtonPressed()}>
              <Text style={styles.buttonText}>Update/Add Profile Photo</Text>
            </Button>
            <Photo url={this.modelView.imageUrl} />
          </ScrollView>
        </View>
      );
    }
  }
}
