import React from 'react';
import {requireNativeComponent, Platform} from 'react-native';
import {windowHeight} from '../../../theme/styles';
import {Container, Content, Text} from 'native-base';

const {Component} = React;

export class Options extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  setTitle(titleText) {
    const {setParams} = this.props.navigation;
    setParams({title: titleText});
  }

  componentWillMount() {
    this.setTitle('Filter');
  }

  render() {
    return (
      <Container style={{margin: 0, marginBottom: 0, backgroundColor: '#fff'}}>
        <Content contentContainerStyle={{height: windowHeight}}>
          {this.renderContent()}
        </Content>
      </Container>
    );
  }

  renderContent() {
    if (Platform.OS === 'ios') {
      return (
        // Native screen!
        <FilterView style={{height: windowHeight}} {...this.props} />
      );
    } else {
      return (
        <Text style={{alignSelf: 'center'}}>
          This screen isn't implemented yet
        </Text>
      );
    }
  }
}

const FilterView = requireNativeComponent('FilterBridgeView', Options);
