import React, {FunctionComponent, useEffect, useState} from 'react';
import {StyleSheet, View, Modal, ActivityIndicator} from 'react-native';
import {color} from "../../theme/styles";
import {bool} from "prop-types";

export const Loader: FunctionComponent = (props) => {
  const [loading, setLoading] = useState(props.loading);
  useEffect(() => {
    setLoading(props.loading);
  }, [props.loading]);
  return (
    (!loading && <></>) ||
    <Modal
      transparent={true}
      animationType={'none'}
      onRequestClose={() => {
        console.log('close modal');
      }}>
      <Progress loading={true} />
    </Modal>
  );
};

function Progress(props) {
  return (
    <View style={styles.modalBackground}>
      <View style={styles.activityIndicatorWrapper}>
        <ActivityIndicator animating={props.loading}
                           color = {color.brand}
                           size = 'large'
        />
      </View>
    </View>
  )
}

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
