/**
 * Sample React Native App
 * https://github.com/SKrotkih/eMia-React-Native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import {Icon} from 'native-base';
import {color} from '../../theme/styles';
import {Item} from './CategoryPickerItem';

interface CatPickerProps {
  categories: Array<any>;
  value: string;
}

interface CatPickerState {
  checkedId: string;
}

export class CategoryPicker extends React.Component<
  CatPickerProps,
  CatPickerState
> {
  private readonly navigation = null;
  private readonly categories = null;
  private readonly darkTheme = null;
  private readonly onSelectItem = null;
  private readonly value = null;

  constructor(props) {
    super(props);

    this.navigation = props.navigation;
    let parameters = props.route.params;
    this.categories = parameters.categories;
    this.value = parameters.value;
    this.darkTheme = parameters.darkTheme;
    this.onSelectItem = parameters.onSelectItem;
    this.setUpState();
    this.setTitle(parameters.title);
  }

  componentDidMount() {
    this.setUpRightBarButtonItem();
    this.selectId(this.value);
  }

  private setUpState() {
    this.state = {
      checkedId: '0',
    };
  }

  setTitle(text: string) {
    this.navigation.setOptions({title: text});
  }

  setUpRightBarButtonItem() {
    this.navigation.setOptions({
      headerRight: () => (
        <Icon
          style={styles.rightBarButton}
          name={'ios-done-all'}
          onPress={() => {
            this.doneButtonPressed();
          }}
        />
      ),
    });
  }

  doneButtonPressed() {
    this.onSelectItem(this.state.checkedId);
    this.navigation.goBack();
  }

  selectId(id: string) {
    this.setState({
      checkedId: id,
    });
  }

  renderItem = ({item}) => (
    <Item
      item={item}
      onSelect={(id) => {
        this.selectId(id);
      }}
      checkedId={this.state.checkedId}
      darkTheme={this.darkTheme}
    />
  );

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={this.categories}
          renderItem={this.renderItem}
          keyExtractor={item => item.id}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 25,
  },
  title: {
    fontSize: 16,
    backgroundColor: 'transparent',
  },
  rightBarButton: {
    color: color.white,
    marginRight: 8,
  },
});
