// EditProfile

import React, {
  FunctionComponent,
  useLayoutEffect,
  useState,
  useEffect,
} from 'react';
import ReactNative from 'react-native';
import {Button, Icon, Text} from 'native-base';
import styles from './styles';
import {ModelView} from './ModelView';
import {useTheme} from 'react-native-paper';
import {color} from '../../theme/styles';
import {User} from '../../model/entities/user';
import {downloadCurrentUserData} from '../../model/dbinteractor/users/dbinteractor';
import inputText from "../../components/InputText/InputText"
import Photo from "../Home/AddNewPost/Components/PostPhoto";
import takePhoto from "../Home/AddNewPost/Utils/TakePhoto";

const {View, ScrollView} = ReactNative;

interface EditProfileState {
  updated: boolean;
  imageUrl: string;
  user: User;
}

interface EditProfileProps {
  route: any;
  navigation: any;
}

export class EditProfile extends React.Component<
  EditProfileProps,
  EditProfileState
> {
  private route = null;
  private navigation = null;
  private completion = null;
  private modelView = null;

  constructor(props) {
    super(props);
    this.route = this.props.route;
    this.navigation = this.props.navigation;
    this.completion = this.props.route.params.completion;
    const newUser = this.props.route.params.newUser;
    this.state = {
      updated: false,
      imageUrl: '',
      user: newUser === null ? new User('', '') : newUser,
    };
    this.modelView = new ModelView(() => {
      this.setState({
        updated: !this.state.updated,
      });
    });
  }

  componentDidMount() {
    downloadCurrentUserData((_user) => {
      if (_user === null) {
        return;
      }
      this.modelView.user = _user;
      this.setState({
        user: _user,
      });
      this.navigation.setParams({
        title: this.modelView.title,
      });
      this.modelView.setUpImage().then((url) => {
        this.setState({
          imageUrl: url,
        });
      });
    });
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
    takePhoto()
      .then((url) => {
        const _url: string = url as string;
        this.setState({
          imageUrl: _url,
        });
        this.modelView.localImagePath = _url;
      })
      .catch((error) => {
        console.log(error);
      });
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
    const nameLabelText = 'Name:';
    const addressLabelText = 'Address:';
    const genderLabelText = 'Gender:';
    const yearBirthLabelText = 'Year:';
    const emailLabelText = 'Email:';
    const darkTheme = true; //  useTheme().dark;

    if (this.modelView.user === undefined) {
      return <></>;
    } else {
      return (
        <View
          style={[
            styles.container,
            {backgroundColor: darkTheme ? color.dark : color.white},
          ]}>
          <ScrollView style={[styles.content]}>
            {inputText(nameLabelText, 'Type your name', this.modelView.name, darkTheme, (text) => {
                this.modelView.name = text;
              },
            )}
            {inputText(addressLabelText, 'Type your address', this.modelView.address, darkTheme, (text) => {
                this.modelView.address = text;
              },
            )}
            {inputText(genderLabelText, 'Type your gender', this.modelView.gender, darkTheme, (text) => {
                this.modelView.gender = text;
              },
            )}
            {inputText(yearBirthLabelText, 'Type your year of birth', this.modelView.yearBirth, darkTheme, (text) => {
                this.modelView.yearBirth = text;
              },
            )}
            {inputText(emailLabelText, 'Type your email', this.modelView.email, darkTheme, (text) => {
                this.modelView.email = text;
              },
            )}
            <Button
              block
              info
              style={styles.button}
              onPress={() => this.takePhotoButtonPressed()}>
              <Text style={styles.buttonText}>Update/Add Profile Photo</Text>
            </Button>
            <Photo url={this.state.imageUrl} />
          </ScrollView>
        </View>
      );
    }
  }
};
