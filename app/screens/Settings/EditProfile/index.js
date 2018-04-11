
import React from 'react';
import ReactNative from 'react-native';
import NativeBase from 'native-base';

import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

import styles from './styles';
import Time from '@components/Time';

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
    const { user } = this.props;
    var title = user.username;
    this.setTitle(title);
  }

  render () {
    const { user } = this.props;
    var avatarUrl = user.avatarUrl;
    var name = user.username;
    var body = user.email;

    return (
      <Container style={styles.container}>
        <Header>
          <Text style={styles.title}>
            {name}
          </Text>
        </Header>
        <Content>
          <View style={styles.thumbnail}>
            <Thumbnail circular size={55} source={{uri: avatarUrl}} />
            <Text style={{marginHorizontal: 8, fontWeight: 'bold', alignSelf: 'center'}}>
            {name}
            </Text>            
          </View>          
          <Text  style={styles.description}>
            {body}
          </Text>
        </Content>
      </Container>
    )
  }
}

export default connect(null, null)(EditProfile)
