import React from 'react';
import ReactNative, {Image, TouchableHighlight} from 'react-native';
import {Button, Icon, Label, Text} from 'native-base';
import styles from './styles';
import {ModelView, TextEditItem} from './ModelView';
import {color} from '../../theme/styles';
import {User} from '../../model/entities/user';
import inputText from '../../components/InputText/InputText';
import Photo from '../Home/AddNewPost/Components/PostPhoto';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const {View, ScrollView} = ReactNative;

interface EditProfileState {
  updated: boolean;
}

interface EditProfileProps {
  route: any;
  navigation: any;
}

export class EditProfile extends React.Component<EditProfileProps,
  EditProfileState> {
  private readonly navigation = null;
  private readonly completion = null;
  private modelView = null;
  private newUser = null;
  private darkTheme = null;

  constructor(props) {
    super(props);

    let route = this.props.route;
    this.navigation = this.props.navigation;
    this.newUser = route.newUser;
    this.completion = route.params.completion;
    this.darkTheme = route.params.darkTheme;

    console.log(this.darkTheme);

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
    let user = this.newUser === null ? new User('', '') : this.newUser;
    this.modelView = new ModelView(this, user, () => {
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

  openCategoryPicker() {
    this.navigation.navigate('Root', {
      screen: 'CategoryPicker',
      params: {
        categories: this.modelView.genderCategories,
        value: this.modelView.gender,
        onSelectItem: (id) => {
          this.modelView.gender = id;
        },
        darkTheme: this.darkTheme,
      },
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

  renderCategoryItem(category: string) {
    return (
      <TouchableHighlight
        activeOpacity={0.6}
        underlayColor="#DDDDDD"
        onPress={() => this.openCategoryPicker()}>
        <View style={styles.category}>
          <Label
            style={[
              styles.categoryName,
              {color: this.darkTheme ? color.white : color.black},
            ]}>
            {category}
          </Label>
          <MaterialIcons style={styles.detailsIcon} size={18} name={'chevron-right'} />
        </View>
      </TouchableHighlight>
    );
  }

  renderItem(item: TextEditItem) {
    if (item.key === 'sex') {
      return this.renderCategoryItem(item.value);
    } else {
      return inputText(
        item.key,
        item.label,
        item.placeholder,
        item.value,
        this.darkTheme,
        item.onChangeText,
        item.onSelectItem,
      );
    }
  }

  // Render View
  render() {
    if (this.modelView.user === undefined) {
      return <></>;
    } else {
      return (
        <View
          style={[
            styles.container,
            {backgroundColor: this.darkTheme ? color.dark : color.white},
          ]}>
          <ScrollView style={[styles.content]}>
            {this.modelView.textEditFields().map((item, _) => {
              return (
                <>
                  <Label
                    style={[styles.label, {color: this.darkTheme ? color.white : color.black}]}>
                    {item.label}
                  </Label>
                  {this.renderItem(item)}
                </>
              );
            }
            )}
            <Button
              block
              info
              style={styles.button}
              onPress={() => this.takePhotoButtonPressed()}>
              <Text style={styles.buttonText}>Update/Add Profile Photo</Text>
            </Button>
            <Photo url={this.modelView.imageUrl} darkTheme={this.darkTheme} />
          </ScrollView>
        </View>
      );
    }
  }
}
