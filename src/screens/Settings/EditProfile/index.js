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
import {User} from '@model/entities/user';

import {windowWidth} from '@theme/styles';
import {Alert} from '@theme/components/alerts/';

const {View} = ReactNative;
const {Component} = React;

export class EditProfile extends Component {
    constructor(props) {
        super(props);
        const {user, completion} = this.props;
        this.completion = completion;
        let defaultName = user.username === undefined ? '' : user.username;
        this.state = {
            user: user,
            userName: defaultName,
            photoUrl: '',
        };
        this.doneButtonPressed = this.doneButtonPressed.bind(this);
    }

    componentWillMount() {
        this.setUpNavigationBar();
        this.setUpImage();
    }

    setUpImage() {
        this.state.user.getDownloadURL()
            .then((url) => {
                this.setState({
                    photoUrl: url,
                });
            })
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
                    onChangeText={(text) => {
                        this.state.userName = text;
                        this.state.user.username = text;
                    }}
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
        this.state.user.update(this.state.photoUrl, (result) => {
            if (result) {
                if (this.completion === undefined) {
                    this.props.navigation.goBack();
                } else {
                    this.completion();
                }
            }
        });
    }
}

export default connect(null, null)(EditProfile);
