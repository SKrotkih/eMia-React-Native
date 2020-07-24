import React from 'react';
import ReactNative from 'react-native';
import {Button, Icon, Text} from 'native-base';
import styles from './styles';
import {ModelView} from './ModelView';
import {color} from '../../theme/styles';
import {User} from '../../model/entities/user';
import inputText from '../../components/InputText/InputText';
import Photo from '../Home/AddNewPost/Components/PostPhoto';
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
    this.setUpModelView();
  }

  // Component Life Cycle
  componentDidMount() {
    this.configureView();
    this.configureModelView();
  }

  // State
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

  // Configure View
  configureView() {
    this.setUpRightBarButtonItem();
  }

  setTitle(text: string) {
    this.navigation.setOptions({title: text});
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

  // Configure the Model View
  setUpModelView() {
    const newUser = this.route.params.newUser;
    let user = newUser === null ? new User('', '') : newUser;
    this.modelView = new ModelView(this, user,() => {
      this.updateView();
    });
  }

  configureModelView() {
    this.modelView.configure();
  }

  // User Activity
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

  // Render View
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
            {this.modelView
              .textEditFields()
              .map((item, _) =>
                inputText(
                  item.key,
                  item.label,
                  item.placeholder,
                  item.value,
                  darkTheme,
                  item.onChangeText,
                  item.onSelectItem,
                ),
              )}
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
