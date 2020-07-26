import React from 'react';
import {
  View,
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';
import {Label} from 'native-base';
import {color} from '../../theme/styles';

interface EditProfileProps {
  categories: Array<any>;
}

export class CategoryPicker extends React.Component<EditProfileProps> {
  private readonly navigation = null;
  private readonly categories = null;
  private readonly darkTheme = null;
  private readonly onSelectItem = null;

  constructor(props) {
    super(props);

    this.navigation = props.navigation;
    let parameters = props.route.params;
    this.categories = parameters.categories;
    this.darkTheme = parameters.darkTheme;
    this.onSelectItem = parameters.onSelectItem;
    this.setTitle('Gender');
  }

  setTitle(text: string) {
    this.navigation.setOptions({title: text});
  }

  selectId(id: string) {
    this.onSelectItem(id);
    this.navigation.goBack();
  }

  renderItem = ({item}) => (
    <Item
      item={item}
      onSelect={(id) => this.selectId(id)}
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

const Item = ({item, onSelect, darkTheme}) => (
  <TouchableHighlight
    activeOpacity={0.6}
    underlayColor="#DDDDDD"
    onPress={() => onSelect(item.id)}>
    <View style={styles.item}>
      <Label
        style={[styles.title, {color: darkTheme ? color.white : color.black}]}>
        {item.title}
      </Label>
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
});
