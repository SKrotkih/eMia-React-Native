
import React from 'react';
import ReactNative from 'react-native';
import NativeBase from 'native-base';

import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

import styles from './styles';
import Time from '@components/Time';
import ImageViewer from '@theme/components/ImageViewer';

import { 
  Container, 
  Header, 
  Title, 
  Content, 
  Footer, 
  FooterTab, 
  Button, 
  Left, 
  Right, 
  Body, 
  Icon, 
  Text, 
  Thumbnail,
  Form,
  Item,
  Label,
  Input
} from 'native-base';

const {
  Dimensions,  
  AppRegistry,
  Image,
  StyleSheet,
  View,
  Alert,
  TouchableOpacity
} = ReactNative;

const {
  Component
} = React;

export class EditProfile extends Component {
  constructor (props) {
    super(props);
    this.state = {
    };
    this.doneButtonPressed = this.doneButtonPressed.bind(this);    
  }

  setUpNavigationBar() {
    var title = 'My Profile';
    const {setParams} = this.props.navigation;
    setParams({ 
      title: title,
      right: 
      <Icon style={{marginRight: 8, color: "#fff"}} name={'ios-done-all'}
      onPress={ () => { this.doneButtonPressed() }} />
    });
  }

  componentWillMount () {
    this.setUpNavigationBar();    
  }

  render () {
    const { user } = this.props;
    var avatarUrl = user.avatarUrl;
    var name = user.username;

    var nameLabelText = 'Name:';

    return (
      <Container style={styles.container}>
        <Content style={styles.content}>
          <Form>
            <Item fixedLabel>
              <Label>{nameLabelText}</Label>
              <Input placeholder={name} />
            </Item>
          </Form>
          <View style={styles.backgroundPhoto}>
            <ImageViewer
              disabled={false}
              source={{uri: avatarUrl}}
              downloadable
              doubleTapEnabled={true}
            />
          </View>
        </Content>
      </Container>
    )
  }

  doneButtonPressed() {
    console.log('=======');
  }

}

export default connect(null, null)(EditProfile)
