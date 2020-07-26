import React from 'react';
import {
  View,
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';
import {Icon, Label} from 'native-base';
import {color} from '../../theme/styles';
import {CheckBox} from 'react-native-elements';

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
    this.setTitle('Gender');
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

  selectId(id: string) {
    this.setState({
      checkedId: id,
    });
  }

  doneButtonPressed() {
    this.onSelectItem(this.state.checkedId);
    this.navigation.goBack();
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

const Item = ({item, onSelect, checkedId, darkTheme}) => (
  <TouchableHighlight
    activeOpacity={0.6}
    underlayColor="#DDDDDD">
    <View style={styles.item}>
      <CheckBox
        title={item.title}
        checked={item.id === checkedId}
        iconType='material'
        checkedIcon='check'
        uncheckedIcon='check-box-outline-blank'
        checkedColor={color.brand}
        uncheckedColor={color.brand}
        onPress={() => onSelect(item.id)}
      />
      <Separator />
    </View>
  </TouchableHighlight>
);

const Separator = () => <View style={styles.separator} />;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 25,
  },
  item: {
    backgroundColor: 'transparent',
    padding: 5,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 16,
    backgroundColor: 'transparent',
  },
  separator: {
    marginVertical: 0,
    borderBottomColor: color.tableSeparator,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  rightBarButton: {
    color: color.white,
    marginRight: 8,
  },
});
