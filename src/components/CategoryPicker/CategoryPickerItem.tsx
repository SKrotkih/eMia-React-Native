import {StyleSheet, TouchableHighlight, View} from "react-native";
import {CheckBox} from "react-native-elements";
import {color} from "../../theme/styles";
import React from "react";

export const Item = ({item, onSelect, checkedId, darkTheme}) => (
  <TouchableHighlight activeOpacity={0.6} underlayColor="#DDDDDD">
    <View style={styles.item}>
      <CheckBox
        title={item.title}
        checked={item.id === checkedId}
        iconType="material"
        checkedIcon="check"
        uncheckedIcon="check-box-outline-blank"
        checkedColor={color.brand}
        uncheckedColor={color.brand}
        textStyle={[{color: darkTheme ? color.white : color.black}]}
        containerStyle={[
          styles.itemContainer,
          {backgroundColor: darkTheme ? color.dark : color.white},
        ]}
        onPress={() => onSelect(item.id)}
      />
      <Separator />
    </View>
  </TouchableHighlight>
);

const Separator = () => <View style={styles.separator} />;

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'transparent',
    padding: 5,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  itemContainer: {},
  separator: {
    marginVertical: 0,
    borderBottomColor: color.tableSeparator,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

