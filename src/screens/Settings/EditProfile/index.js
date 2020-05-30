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

import {windowWidth} from '@theme/styles';
import {Alert} from '@theme/components/alerts/';
import {ModelView} from './ModelView';

const {View} = ReactNative;
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
        this.mv.renderView()
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
                        this.mv.name = text;
                    }}
                    defaultValue={this.mv.name}
                />
                <Button
                    block
                    info
                    style={styles.button}
                    onPress={() => this.takePhotoButtonPressed()}>
                    <Text>Update/Add Profile Photo</Text>
                </Button>
                {!this.mv.isImageEmpty && (
                    <View
                        style={{
                            marginTop: 50,
                            width: windowWidth - 30,
                            height: windowWidth - 30,
                        }}>
                        <ImageViewer
                            disabled={false}
                            source={{uri: this.mv.imageUrl}}
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
                this.mv.imageUrl = response.uri;
            }
        });
    }

    doneButtonPressed() {
        this.mv.submitData()
            .then(() => {
                if (this.completion === undefined) {
                    this.props.navigation.goBack();
                } else {
                    this.completion();
                }
            });
    }
}

export default connect(null, null)(EditProfile);
