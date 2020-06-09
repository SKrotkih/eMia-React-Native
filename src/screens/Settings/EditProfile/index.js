// EditProfile

import React from 'react';
import ReactNative from 'react-native';
import {connect} from 'react-redux';
import ImagePicker from 'react-native-image-picker';
import {Button, Icon, Text, Label} from 'native-base';
import styles from './styles';
import ImageViewer from '../../../components/ImageViewer';
import {ModelView} from './ModelView';

const {View, TextInput, ScrollView} = ReactNative;
const {Component} = React;

export class EditProfile extends Component {
  constructor(props) {
    super(props);
    const {user, completion} = this.props;
    this.mv = new ModelView(user, this);
    this.state = {
      state: false,
    };
    this.completion = completion;
    this.doneButtonPressed = this.doneButtonPressed.bind(this);
  }

  updateView() {
    let currentState = !this.state.state;
    this.setState({state: currentState});
  }

  componentWillMount() {
    this.setUpNavigationBar();
    this.mv.renderView();
  }

  setUpNavigationBar() {
    let title = 'My Profile';
    const {setParams} = this.props.navigation;
    setParams({
      title: title,
      right: (
        <Icon
          style={{marginRight: 8, color: '#fff'}}
          name={'ios-done-all'}
          onPress={() => {
            this.doneButtonPressed();
          }}
        />
      ),
    });
  }

  render() {
    let nameLabelText = 'Name:';
    let addressLabelText = 'Address:';
    let genderLabelText = 'Gender:';
    let yearBirthLabelText = 'Year:';
    let emailLabelText = 'Email:';
    return (
      <View style={styles.container}>
        <ScrollView style={[styles.content]}>
          <Label style={styles.label}>{nameLabelText}</Label>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            clearButtonMode="while-editing"
            underlineColorAndroid="transparent"
            placeholder="Type your name"
            autoFocus={false}
            onChangeText={(text) => {
              this.mv.name = text;
            }}
            defaultValue={this.mv.name}
          />
          <Label style={styles.label}>{addressLabelText}</Label>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            clearButtonMode="while-editing"
            underlineColorAndroid="transparent"
            placeholder="Type your address"
            autoFocus={false}
            onChangeText={(text) => {
              this.mv.address = text;
            }}
            defaultValue={this.mv.address}
          />
          <Label style={styles.label}>{genderLabelText}</Label>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            clearButtonMode="while-editing"
            underlineColorAndroid="transparent"
            placeholder="Type your gender"
            autoFocus={false}
            onChangeText={(text) => {
              this.mv.gender = +text;
            }}
            defaultValue={'' + this.mv.gender}
          />
          <Label style={styles.label}>{yearBirthLabelText}</Label>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            clearButtonMode="while-editing"
            underlineColorAndroid="transparent"
            placeholder="Type your year of birth"
            autoFocus={false}
            onChangeText={(text) => {
              this.mv.yearBirth = text;
            }}
            defaultValue={this.mv.yearBirth}
          />
          <Label style={styles.label}>{emailLabelText}</Label>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            clearButtonMode="while-editing"
            underlineColorAndroid="transparent"
            placeholder="Type your email"
            autoFocus={false}
            onChangeText={(text) => {
              this.mv.email = text;
            }}
            defaultValue={this.mv.email}
          />
          <Button
            block
            info
            style={styles.button}
            onPress={() => this.takePhotoButtonPressed()}>
            <Text style={styles.buttonText}>Update/Add Profile Photo</Text>
          </Button>
          {!this.mv.isImageEmpty && (
            <View style={styles.backgroundImage}>
              <ImageViewer
                imageStyle={styles.image}
                disabled={false}
                source={{uri: this.mv.imageUrl}}
                downloadable={true}
                doubleTapEnabled={true}
              />
            </View>
          )}
        </ScrollView>
      </View>
    );
  }

  takePhotoButtonPressed() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true,
      },
    };
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else {
        this.mv.imageUrl = response.uri;
      }
    });
  }

  doneButtonPressed() {
    this.mv.submitData().then(() => {
      if (this.completion === undefined) {
        this.props.navigation.goBack();
      } else {
        this.completion();
      }
    });
  }
}

export default connect(null, null)(EditProfile);
