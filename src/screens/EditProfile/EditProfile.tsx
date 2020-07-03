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
import {ImageViewer} from '../../components/ImageViewer';
import {ModelView} from './ModelView';
import {useTheme} from "react-native-paper";
import {color} from "../../theme/styles";

const {View, TextInput, ScrollView} = ReactNative;
let _modelView: ModelView;

export const EditProfile: FunctionComponent = ({route, navigation}) => {
  const {user, completion} = route.params;
  const [state, setState] = useState(false);

  const nameLabelText = 'Name:';
  const addressLabelText = 'Address:';
  const genderLabelText = 'Gender:';
  const yearBirthLabelText = 'Year:';
  const emailLabelText = 'Email:';
  const darkTheme = useTheme().dark;

  if (_modelView === undefined) {
    _modelView = new ModelView(() => {
      setState(state => !state);
    });
    _modelView.user = user;
  }

  useEffect(() => {
    _modelView.user = user;
  }, []);

  useLayoutEffect(() => {
    navigation.setParams({
      title: _modelView.title,
    });
    navigation.setOptions({
      headerRight: () => (
        <Icon
          style={styles.rightBarButton}
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

  function textInput(title, placeholder, defaultValue, onChangeText) {
    return (
      <>
        <Label style={[styles.label, {color: darkTheme ? color.white : color.black}]}>{title}</Label>
        <TextInput
          style={[styles.input, {color: darkTheme ? color.white : color.black}]}
          autoCapitalize="none"
          clearButtonMode="while-editing"
          underlineColorAndroid="transparent"
          placeholder={placeholder}
          autoFocus={false}
          onChangeText={(text) => {
            onChangeText(text);
          }}
          defaultValue={defaultValue}
        />
      </>
    )
  }

  return (
    <View style={[styles.container, {backgroundColor: darkTheme ? color.dark : color.white}]}>
      <ScrollView style={[styles.content]}>
        {textInput(nameLabelText, "Type your name", _modelView.name, (text) => {
          _modelView.name = text;
        })}
        {textInput(addressLabelText, "Type your address", _modelView.address, (text) => {
          _modelView.address = text;
        })}
        {textInput(genderLabelText,"Type your gender", +_modelView.gender, (text) => {
          _modelView.gender = +text;
        })}
        {textInput(yearBirthLabelText, "Type your year of birth", _modelView.yearBirth, (text) => {
          _modelView.yearBirth = text;
        })}
        {textInput(emailLabelText,"Type your email", _modelView.email, (text) => {
          _modelView.email = text;
        })}
        <Button
          block
          info
          style={styles.button}
          onPress={() => takePhotoButtonPressed()}>
          <Text style={styles.buttonText}>Update/Add Profile Photo</Text>
        </Button>
        {!_modelView.isImageEmpty && (
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
