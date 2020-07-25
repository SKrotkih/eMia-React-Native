import React, {FunctionComponent} from 'react';
import {Picker, View, StyleSheet} from 'react-native';
import {color} from '../../theme/styles';

export const CategoryPicker: FunctionComponent = (props) => {
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
              color="#0087F0"
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
