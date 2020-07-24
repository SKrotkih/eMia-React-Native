import React, {FunctionComponent} from 'react';
import {Picker, View, StyleSheet} from 'react-native';
import {color} from '../../theme/styles';

export const CategoryPicker: FunctionComponent = (props) => {

  const {onSelectItem, category} = props;

  const categories = [
    {
      itemName: 'Female',
    },
    {
      itemName: 'Male',
    },
  ];

  return (
    <View style={styles.viewStyle}>
      <Picker
        itemStyle={styles.itemStyle}
        mode="dropdown"
        style={styles.pickerStyle}
        selectedValue={category}
        onValueChange={onSelectItem}>
        {categories.map((item, index) => (
          <Picker.Item
            color="#0087F0"
            label={item.itemName}
            value={item.itemName}
            index={index}
          />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  viewStyle: {
    margin: 15,
    paddingLeft: 15,
    height: 40,
    borderRadius: 8,
    borderColor: color.brand,
    borderWidth: 1,
  },
  itemStyle: {
    fontSize: 10,
    color: color.brand,
  },
  pickerStyle: {
    width: '100%',
    height: 40,
    color: color.brand,
    fontSize: 14,
  },
  textStyle: {
    fontSize: 14,
  },
});
