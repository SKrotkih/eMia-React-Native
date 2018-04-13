
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
  Thumbnail 
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
  }

  setTitle(titleText) {
    const {setParams} = this.props.navigation;
    setParams({ title: titleText });
  }

  componentWillMount () {
    this.setTitle('My Profile');
  }

  render () {
    const { user } = this.props;
    var avatarUrl = user.avatarUrl;
    var name = user.username;

    var textName = 'Name:';

    return (
      <Container style={styles.container}>
        <Content style={styles.content}>
          <View style={styles.inputNameFrame}>
            <Text style={{fontWeight: 'bold'}}>
              {textName}
            </Text>
            <Text style={{marginHorizontal: 8, fontWeight: 'bold'}}>
              {name}
            </Text>
          </View>          
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
}

export default connect(null, null)(EditProfile)
