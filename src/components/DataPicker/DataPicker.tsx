/**
 * Sample React Native App
 * https://github.com/SKrotkih/eMia-React-Native
 *
 * @format
 * @flow
 */

import React, {FunctionComponent} from 'react';
import {Picker, View, StyleSheet} from 'react-native';
import {color} from '../../theme/styles';

interface DataPickerProps {
  data: Array<any>;
  onSelectItem: (text: string) => void;
  value: string;
}

// Call example
// <DataPicker
//   data={this.modelView.genderCategories}
//   onSelectItem={item.onSelectItem}
//   value={item.value}
// />

export const DataPicker: FunctionComponent<DataPickerProps> = (props) => {
  const {data, onSelectItem, value} = props;
  return (
    <View style={styles.viewStyle}>
      <View style={{flex: 0.7, fontSize: 14}}>
        <Picker
          itemStyle={styles.itemStyle}
          mode="dropdown"
          style={styles.pickerStyle}
          selectedValue={value}
          onValueChange={onSelectItem}>
          {data.map((item, index) => (
            <Picker.Item
              color={color.brand}
              label={item.itemName}
              value={item.itemName}
              index={index}
            />
          ))}
        </Picker>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  viewStyle: {
    flex: 1,
    alignSelf: "center",
    flexDirection: "row",
    width: "92%",
    justifyContent: "space-between",
    alignItems: "center"
  },
  itemStyle: {
    fontSize: 10,
    fontFamily: "Roboto-Regular",
    color: color.brand
  },
  pickerStyle: {
    width: "100%",
    height: 40,
    color: color.brand,
    fontSize: 14,
    fontFamily: "Roboto-Regular"
  },
  textStyle: {
    fontSize: 14,
    fontFamily: "Roboto-Regular"
  },
});
