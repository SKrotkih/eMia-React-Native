/**
 * Sample React Native App
 * https://github.com/SKrotkih/eMia-React-Native
 *
 * @format
 * @flow
 */

import React from 'react';
import ReactNative, {TouchableHighlight} from 'react-native';
import {Button, Icon, Label, Text} from 'native-base';
import styles from './styles';
import {ModelView, TextEditItem} from './ModelView';
import {color} from '../../theme/styles';
import {User} from '../../model/entities/user';
import inputText from '../../components/InputText/InputText';
import Photo from '../Home/AddNewPost/Components/PostPhoto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

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
  private readonly navigation = null;
  private readonly completion = null;
  private modelView: ModelView = null;
  private readonly newUser = null;
  private readonly darkTheme = null;
  private readonly isItNewUser: boolean = false;

  constructor(props) {
    super(props);

    let route = this.props.route;
    this.navigation = this.props.navigation;
    this.newUser = route.params.newUser;
    this.isItNewUser = route.params.newUser !== null;
    this.completion = route.params.completion;
    this.darkTheme = route.params.darkTheme;
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
            this.userDidPressOnDone();
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
  userDidPressOnPhotoPicker() {
    this.modelView.selectAvatar();
  }

  userDidSelectCategory() {
    if (this.isItNewUser) {
      this.navigation.navigate('CategoryPicker', this.genderParameters());
    } else {
      this.navigation.navigate('Root', {
        screen: 'CategoryPicker',
        params: this.genderParameters(),
      });
    }
  }

  genderParameters(): {} {
    return {
      categories: this.modelView.genderCategories,
      value: this.modelView.gender,
      title: 'Gender',
      onSelectItem: (id) => {
        this.modelView.gender = id;
      },
      darkTheme: this.darkTheme,
    };
  }

  userDidSelectYears() {
    if (this.isItNewUser) {
      this.navigation.navigate('YearsPicker', this.yearsParameters());
    } else {
      this.navigation.navigate('Root', {
        screen: 'YearsPicker',
        params: this.yearsParameters(),
      });
    }
  }

  yearsParameters(): {} {
    return {
      categories: this.modelView.years,
      value: this.modelView.yearBirth,
      title: 'Year Birthday',
      onSelectItem: (year) => {
        this.modelView.yearBirth = year;
      },
      darkTheme: this.darkTheme,
    };
  }

  userDidPressOnDone() {
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
        onPress={() => this.userDidSelectCategory()}>
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

  renderYearsItem(year: string) {
    return (
      <TouchableHighlight
        activeOpacity={0.6}
        underlayColor="#DDDDDD"
        onPress={() => this.userDidSelectYears()}>
        <View style={styles.category}>
          <Label
            style={[
              styles.categoryName,
              {color: this.darkTheme ? color.white : color.black},
            ]}>
            {year}
          </Label>
          <MaterialIcons style={styles.detailsIcon} size={18} name={'chevron-right'} />
        </View>
      </TouchableHighlight>
    );
  }

  renderItem(item: TextEditItem) {
    if (item.key === 'sex') {
      return this.renderCategoryItem(item.value);
    } else if (item.key === 'year_birth') {
      return this.renderYearsItem(item.value);
    } else {
      return inputText(
        item.key,
        item.label,
        item.placeholder,
        item.value,
        this.darkTheme,
        item.onChangeText,
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
            })}
            <Button
              block
              info
              style={styles.button}
              onPress={() => this.userDidPressOnPhotoPicker()}>
              <Text style={styles.buttonText}>Update/Add Profile Photo</Text>
            </Button>
            <Photo url={this.modelView.imageUrl} darkTheme={this.darkTheme} />
          </ScrollView>
        </View>
      );
    }
  }
}
