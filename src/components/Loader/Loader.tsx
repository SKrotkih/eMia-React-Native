import React, {FunctionComponent} from 'react';
import {StyleSheet, View, Modal, ActivityIndicator} from 'react-native';
import {color} from "../../theme/styles";
import {bool} from "prop-types";

export const Loader: FunctionComponent = (props) => {
  const {loading} = props;

  return (
    <Modal
      transparent={true}
      animationType={'none'}
      visible={loading}
      onRequestClose={() => {
        console.log('close modal');
      }}>
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <ActivityIndicator animating={loading}
                             color = {color.brand}
                             size = 'large'
          />
        </View>
      </View>
    </Modal>
  );
};

Loader.propTypes = {
  loading: bool,
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040',
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
