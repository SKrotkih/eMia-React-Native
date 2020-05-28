// EditProfile

import React from 'react';
import ReactNative, {TextInput} from 'react-native';
import {connect} from 'react-redux';
import ImagePicker from 'react-native-image-picker';
import {
    Button,
    Icon,
    Text,
    Label,
} from 'native-base';
import styles from './styles';
import ImageViewer from '@theme/components/ImageViewer';
import {Profile} from '@model/entities/profile';

import {windowWidth} from '@theme/styles';
import {Alert} from '@theme/components/alerts/';

const {View} = ReactNative;
const {Component} = React;

export class EditProfile extends Component {
    constructor(props) {
        super(props);
        const {user} = this.props;
        this.uid = user.uid;
        this.state = this.createState(user);
        this.doneButtonPressed = this.doneButtonPressed.bind(this);
    }

    createState(user) {
        const state = {
            userName: user.username,
            photoUrl: user.avatarUrl,
        };
        return state;
    }

    componentWillMount() {
        this.setUpNavigationBar();
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
        return (
            <View style={styles.container}>
                <Label style={styles.label}>{nameLabelText}</Label>
                <TextInput
                    style={styles.input}
                    autoCapitalize="none"
                    clearButtonMode="while-editing"
                    underlineColorAndroid="transparent"
                    placeholder="Type your name"
                    autoFocus={false}
                    onChangeText={(text) => this.state.userName = text}
                    defaultValue={this.state.userName}
                />
                <Button
                    block
                    info
                    style={styles.button}
                    onPress={() => this.takePhotoButtonPressed()}>
                    <Text>Update/Add Profile Photo</Text>
                </Button>
                {this.state.photoUrl !== null && (
                    <View
                        style={{
                            marginTop: 50,
                            width: windowWidth - 30,
                            height: windowWidth - 30,
                        }}>
                        <ImageViewer
                            disabled={false}
                            source={{uri: this.state.photoUrl}}
                            downloadable={true}
                            doubleTapEnabled={true}
                        />
                    </View>
                )}
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
                this.setState({
                    photoUrl: response.uri,
                });
            }
        });
    }

    doneButtonPressed() {
        let profile = new Profile(this.state.uid, this.state.userName, this.state.photoUrl)
        profile.upload((result) => {
            if (result) {
                this.props.navigation.goBack();
            }
        });
    }
}

export default connect(null, null)(EditProfile);
