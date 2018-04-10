
import React from 'react';
import ReactNative from 'react-native';
import Grid from 'react-native-grid-component';
import NativeBase from 'native-base';

import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

import styles from './styles';
import Time from '../../../components/Time';
import { config } from '../index';

import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, Thumbnail } from 'native-base';

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

const previewContentHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export class PostPreview extends Component {
  constructor (props) {
    super(props);
    this.state = {
    };
  }

  setTitle(titleText) {
    const {setParams} = this.props.navigation;
    setParams({ title: titleText });
  }

  // static navigationOptions = ({ navigation }) => {
  //   title: `${navigation.state.params.title}`,
  //   headerTitleStyle: {
  //     textAlign: 'center', 
  //     alignSelf:'center'},
  //     headerStyle: {
  //       backgroundColor:'white',
  //     },
  // };

  componentWillMount () {
    var title = this.props.item.value.title;
    this.setTitle(title);
  }

  render () {

    const { item } = this.props;
    var title = item.value.title;
    var body = item.value.body;
    var url = item.url;
    var avatarUrl = item.avatarUrl;
    var publishedAt = new Date(1000*item.value.created);
    var userName = 'User';

    return (
      <Container style={styles.container}>
        <Header>
          <Text style={styles.title}>
            {title}
          </Text>
        </Header>
        <Content>
          <View style={styles.thumbnail}>
            <Thumbnail circular size={55} source={{uri: avatarUrl}} />
            <Text style={{marginHorizontal: 8, fontWeight: 'bold', alignSelf: 'center'}}>
              {userName}
            </Text>            
          </View>          
          <Text  style={styles.description}>
            {body}
          </Text>
          <Image style={styles.photo} source={{uri: url}} />
          <Text style={{ marginHorizontal: 8, marginVertical: 8, fontWeight: 'bold' }}>
            <Time date={publishedAt} />
          </Text>
        </Content>
      </Container>
    )
  }
}

export default connect(null, null)(PostPreview)
