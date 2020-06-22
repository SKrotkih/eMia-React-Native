// EditProfile

import React, {
  FunctionComponent,
  useLayoutEffect,
  useState,
  useEffect,
} from 'react';
import ReactNative from 'react-native';
import {connect} from 'react-redux';
import ImagePicker from 'react-native-image-picker';
import {Button, Icon, Text, Label} from 'native-base';
import styles from './styles';
import {ImageViewer} from '../../../components/ImageViewer';
import {ModelView} from './ModelView';

const {View, TextInput, ScrollView} = ReactNative;
let _modelView: ModelView;
let _state = false;

const EditProfile: FunctionComponent = ({route, navigation}) => {
  const {user, completion} = route.params;
  const [state, setState] = useState(false);

  const nameLabelText = 'Name:';
  const addressLabelText = 'Address:';
  const genderLabelText = 'Gender:';
  const yearBirthLabelText = 'Year:';
  const emailLabelText = 'Email:';

  if (_modelView === undefined) {
    _modelView = new ModelView(() => {
      _state = !_state;
      setState(_state);
    });
  }

  useEffect(() => {
    _modelView.user = user;
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Icon
          style={{color: color.white, marginRight: 8}}
          name={'ios-done-all'}
          onPress={() => {
            doneButtonPressed();
          }}
        />
      ),
    });
  }, [navigation]);

  function takePhotoButtonPressed() {
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
        _modelView.imageUrl = response.uri;
      }
    });
  }

  function doneButtonPressed() {
    _modelView.submitData().then(() => {
      if (completion === undefined) {
        navigation.goBack();
      } else {
        completion();
      }
    });
  }

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
            _modelView.name = text;
          }}
          defaultValue={_modelView.name}
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
            _modelView.address = text;
          }}
          defaultValue={_modelView.address}
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
            _modelView.gender = +text;
          }}
          defaultValue={'' + _modelView.gender}
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
            _modelView.yearBirth = text;
          }}
          defaultValue={_modelView.yearBirth}
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
            _modelView.email = text;
          }}
          defaultValue={_modelView.email}
        />
        <Button
          block
          info
          style={styles.button}
          onPress={() => takePhotoButtonPressed()}>
          <Text style={styles.buttonText}>Update/Add Profile Photo</Text>
        </Button>
        {!this.mv.isImageEmpty && (
          <View style={styles.backgroundImage}>
            <ImageViewer
              imageStyle={styles.image}
              disabled={false}
              source={{uri: _modelView.imageUrl}}
              downloadable={true}
              doubleTapEnabled={true}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default connect(null, null)(EditProfile);
