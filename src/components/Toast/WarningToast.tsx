import {View} from 'react-native';
import React from "react";
import {isEmpty} from "../../utils/validate";
import {Toast} from "native-base";

export function warningToast(message) {
  if (isEmpty(message)) {
    return <View/>
  } else {
    return (
      Toast.show({
        text: message,
        position: 'bottom',
        buttonText: 'OK',
        type: 'warning',
        duration: 3000,
      })
    )
  }
}
