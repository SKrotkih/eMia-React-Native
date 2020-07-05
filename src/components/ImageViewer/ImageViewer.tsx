import uuid from 'uuid';
import React, {Component} from 'react';
import {
  CameraRoll,
  StyleSheet,
  View,
  ImageBackground,
  Image,
  Animated,
  PanResponder,
  Platform,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Modal,
  InteractionManager,
  Dimensions,
  Alert,
} from 'react-native';
import {Icon} from 'native-base';
import PropTypes from 'prop-types';
import RNFetchBlob from 'rn-fetch-blob';
import * as Progress from 'react-native-progress';
import {Loader} from "../Loader";

const AnimatedImage = Animated.createAnimatedComponent(ImageBackground);
const DefaultIndicator = Progress.Circle;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const LAYOUT_ENUM = {
  X: 'x',
  Y: 'y',
};

const BACKGROUND_VALUES = {
  MAX: 100,
  MIN: 0,
};

// utils
const getPitagorasZ = (x, y) => {
  Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
};

const backgroundValueCalculation = (x, y, BACKGROUND_VALUES) => {
  (4 / 3) * BACKGROUND_VALUES.MAX - getPitagorasZ(x, y);
};

const DOUBLE_TAP_MILISECONDS = 200;

export class ImageViewer extends Component {
  static propTypes = {
    // common
    source: Image.propTypes.source,
    disabled: PropTypes.bool,
    imageStyle: Image.propTypes.style,
    containerStyle: Image.propTypes.style,
    doubleTapEnabled: PropTypes.bool,

    // required if it's a local image
    imageWidth: PropTypes.number,
    imageHeight: PropTypes.number,

    // callbacks
    onMove: PropTypes.func,
    onPress: PropTypes.func,
    onClose: PropTypes.func,

    // back button
    closeOnBack: PropTypes.bool,

    // loading indicator threshold
    threshold: PropTypes.number,

    // downloadable
    downloadable: PropTypes.bool,
  };

  static defaultProps = {
    doubleTapEnabled: true,
    imageStyle: {},
    containerStyle: {},
    imageWidth: windowWidth,
    imageHeight: windowHeight / 2,
    closeOnBack: true,
    threshold: 40,
    downloadable: false,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      openModal: false,
      scale: new Animated.Value(1),
      layout: new Animated.ValueXY({x: 0, y: 0}),
      backgroundOpacity: new Animated.Value(BACKGROUND_VALUES.MIN),
      mainImageOpacity: new Animated.Value(1),
      loading: false,
      progress: 0,
      thresholdReached: !props.threshold,
    };

    this.panResponder = null;
    this.layoutListener = null;

    this._imageSize = {
      width: typeof props.source !== 'object' ? props.imageWidth : null,
      height: typeof props.source !== 'object' ? props.imageHeight : null,
    };

    this._layoutX = 0;
    this._layoutY = 0;
    this._lastMovedX = 0;
    this._lastMovedY = 0;
    this._modalClosing = 0;
    this._doubleTapTimeout = null;
    this._isScaled = false;
    this._isAnimatingToCenter = false;
    this._zoomedImageSize = {
      width: null,
      height: null,
    };

    this.handleMove = this.handleMove.bind(this);
    this.handleRelease = this.handleRelease.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleSetPanResponder = this.handleSetPanResponder.bind(this);
    this.handleLayoutChange = this.handleLayoutChange.bind(this);
  }

  componentWillMount() {
    const {source} = this.props;

    this.mounted = true;

    if (this.props.threshold) {
      this._thresholdTimer = setTimeout(() => {
        this.setState({thresholdReached: true});
        this._thresholdTimer = null;
      }, this.props.threshold);
    }
    this._imageSize = {width: 200.0, height: 300.0};
    if (
      typeof source === 'object' &&
      typeof source.uri === 'string' &&
      this.mounted
    ) {
      Image.prefetch(source.uri);
      Image.getSize(source.uri, (width, height) => {
        this._imageSize = {width, height};
      });
    }
    this.state.layout.x.addListener((animated) =>
      this.handleLayoutChange(animated, LAYOUT_ENUM.X),
    );
    this.state.layout.y.addListener((animated) =>
      this.handleLayoutChange(animated, LAYOUT_ENUM.Y),
    );
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: this.handleSetPanResponder,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: this.handleMove,
      onPanResponderRelease: this.handleRelease,
      onPanResponderTerminate: this.handleRelease,
    });
  }

  componentWillReceiveProps(props) {
    if (
      !this.props.source ||
      !props.source ||
      this.props.source.uri !== props.source.uri
    ) {
      this.setState({
        loading: false,
        progress: 0,
      });
    }
  }

  componentWillUnmount() {
    if (this._thresholdTimer) {
      clearTimeout(this._thresholdTimer);
    }

    this.state.layout.x.removeAllListeners();
    this.state.layout.y.removeAllListeners();

    this.mounted = false;
  }

  bubbleEvent(propertyName, event) {
    if (typeof this.props[propertyName] === 'function') {
      this.props[propertyName](event);
    }
  }

  handleLoadStart = () => {
    if (!this.state.loading && this.state.progress !== 1) {
      this.setState({
        loading: true,
        progress: 0,
      });
    }
    this.bubbleEvent('onLoadStart');
  };

  handleProgress = (e) => {
    const progress = e.nativeEvent.loaded / e.nativeEvent.total;
    // RN is a bit buggy with these events, sometimes a loaded event and then a few
    // 100% progress – sometimes in an infinite loop. So we just assume 100% progress
    // actually means the image is no longer loading
    if (progress !== this.state.progress && this.state.progress !== 1) {
      this.setState({
        loading: progress < 1,
        progress,
      });
    }
    this.bubbleEvent('onProgress', e);
  };

  handleError = (event) => {
    this.setState({
      loading: false,
    });
    this.bubbleEvent('onError', event);
  };

  handleLoad = (event) => {
    if (this.state.progress !== 1) {
      this.setState({
        loading: false,
        progress: 1,
      });
    }
    this.bubbleEvent('onLoad', event);
  };

  handleDownloadImage = () => {
    // Todo: Fix me
    // eslint-disable-next-line react/no-string-refs
    const uri = this.refs.originalImage.props.source.uri;

    if (uri.endsWith('.gif')) {
      Alert.alert(
        `System Error`,
        `Unfortunately can not download GIF right now.`,
      )
      return;
    }

    if (Platform.OS === 'ios') {
      const promise = CameraRoll.saveToCameraRoll(uri, 'photo');
      promise.then(() =>
        Alert.alert(
          `Photo saved successfully!`,
        )
      );
    } else {
      const ret = RNFetchBlob.config({
        fileCache: true,
        path: `${RNFetchBlob.fs.dirs.DocumentDir}/${uuid.v4()}.jpg`,
      }).fetch('GET', uri);
      // TODO: `Downloading ...` Indicator
      ret.then((res) => {
        const promise = CameraRoll.saveToCameraRoll(
          `file://${res.path()}`,
          'photo',
        );
        promise.then(() => {
          // removed cache file
          res.flush();
          Alert.alert(
            `Photo saved successfully!`,
          )
        });
      });
    }
  };
  handleMove(e, gestureState) {
    if (typeof this.props.onMove === 'function') {
      this.props.onMove(e, gestureState);
    }

    // const currentScaleSizes = {
    //     width: this._zoomedImageSize.width * 2,
    //     height: this._zoomedImageSize.height * 2
    // };

    const modifiedGestureState = Object.assign({}, gestureState, {
      dx: this._lastMovedX + gestureState.dx,
      dy: this._lastMovedY + gestureState.dy,
    });

    Animated.event([
      null,
      {
        dx: this.state.layout.x,
        dy: this.state.layout.y,
      },
    ])(e, modifiedGestureState);
  }

  handleLayoutChange(animated, axis) {
    switch (axis) {
      case LAYOUT_ENUM.X:
        this._layoutX = animated.value;
        break;
      case LAYOUT_ENUM.Y:
        this._layoutY = animated.value;
        break;
      default:
        break;
    }

    if (this._modalClosing || this._isScaled || this._isAnimatingToCenter) {
      return;
    }

    const value = backgroundValueCalculation(this._layoutY, this._layoutX, BACKGROUND_VALUES);

    Animated.timing(this.state.backgroundOpacity, {
      toValue: value,
      duration: 1,
    }).start();
  }

  handleSetPanResponder() {
    const currMil = Date.now();

    if (
      !!this._doubleTapTimeout &&
      currMil - this._doubleTapTimeout <= DOUBLE_TAP_MILISECONDS &&
      this.props.doubleTapEnabled
    ) {
      const value = this._isScaled ? 1 : 2;
      this._isAnimatingToCenter = this._isScaled;
      this._isScaled = !this._isScaled;

      Animated.timing(this.state.scale, {
        toValue: value,
        duration: 100,
      }).start(() => {
        this._isAnimatingToCenter = false;
        if (!this._isScaled) {
          this._lastMovedY = 0;
          this._lastMovedX = 0;
        }
      });
    }
    this._doubleTapTimeout = currMil;

    return true;
  }

  handleRelease() {
    const value = backgroundValueCalculation(
      this._layoutY,
      this._layoutX,
      BACKGROUND_VALUES,
    );
    const resetAnimation = Animated.timing(this.state.layout, {
      toValue: {x: 0, y: 0},
      duration: 150,
    });

    if (this._isScaled) {
      this._lastMovedY = this._layoutY;
      this._lastMovedX = this._layoutX;
      return;
    }

    // const resetBackgroundAnimation = Animated.timing(this.state.backgroundOpacity, {
    //     toValue: BACKGROUND_VALUES.MAX,
    //     duration: 150
    // });

    const cleanBackgroundAnimation = Animated.sequence([
      Animated.timing(this.state.backgroundOpacity, {
        toValue: BACKGROUND_VALUES.MIN,
        duration: 150,
      }),
      Animated.timing(this.state.mainImageOpacity, {
        toValue: 1,
        duration: 50,
      }),
    ]);

    const animations = [];
    animations.push(resetAnimation);

    const shouldCloseModal = value <= 0;

    if (!this._isAnimatingToCenter && shouldCloseModal) {
      this._modalClosing = true;
      animations.push(cleanBackgroundAnimation);
    }

    animations.forEach((animation) => animation.start());
    if (!this._isAnimatingToCenter && shouldCloseModal) {
      InteractionManager.runAfterInteractions(() => this.toggleModal());
    }
  }

  toggleModal() {
    const shouldOpen = !this.state.openModal;

    if (this.props.disabled) {
      return;
    }
    if (typeof this.props.onPress === 'function') {
      this.props.onPress(shouldOpen);
    }
    if (shouldOpen) {
      this._modalClosing = false;
      this.state.backgroundOpacity.setValue(BACKGROUND_VALUES.MAX);
    } else {
      this.state.backgroundOpacity.setValue(BACKGROUND_VALUES.MIN);
      // call prop
      if (typeof this.props.onClose === 'function') {
        this.props.onClose();
      }
      this.setState({DownloadAlert: {}});
    }
    this.state.mainImageOpacity.setValue(shouldOpen ? 0 : 1);
    this.setState({
      openModal: shouldOpen,
    });
  }

  render() {
    const {source, downloadable, imageStyle, containerStyle} = this.props;
    const {
      backgroundOpacity,
      openModal,
      scale,
      progress,
      thresholdReached,
      loading,
    } = this.state;

    let content = this.props.children;

    // Check if height or width is so low then hide progress
    let hideProgress = false;

    if ('width' && 'height' in containerStyle) {
      if (containerStyle.width < 200 || containerStyle.height < 200) {
        hideProgress = true;
      }
    }

    if (!hideProgress) {
      if ((loading || progress < 1) && thresholdReached) {
        const IndicatorComponent = DefaultIndicator;
        content = (
          <Loader
            loading={loading || progress}
          />
        );
      }
    }

    if (
      this._imageSize.width / windowWidth >
      this._imageSize.height / windowHeight
    ) {
      this._zoomedImageSize.width = windowWidth;
      this._zoomedImageSize.height =
        (windowWidth / this._imageSize.width) * this._imageSize.height;
    } else {
      this._zoomedImageSize.height = windowHeight;
      this._zoomedImageSize.width =
        (windowHeight / this._imageSize.width) * this._imageSize.height;
    }

    const interpolatedOpacity = backgroundOpacity.interpolate({
      inputRange: [BACKGROUND_VALUES.MIN, BACKGROUND_VALUES.MAX],
      outputRange: [0, 1],
    });

    const interpolatedColor = backgroundOpacity.interpolate({
      inputRange: [BACKGROUND_VALUES.MIN, BACKGROUND_VALUES.MAX],
      outputRange: ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 1)'],
    });

    const width = this._imageSize.width * (windowWidth / this._imageSize.width);
    const height =
      this._imageSize.height * ((windowHeight * 0.6) / this._imageSize.height);

    return (
      <View>
        <Animated.View style={[styles.imageContainer, containerStyle]}>
          <TouchableWithoutFeedback onPress={this.toggleModal}>
            <AnimatedImage
              source={source}
              onLoadStart={this.handleLoadStart}
              onProgress={this.handleProgress}
              onError={this.handleError}
              onLoad={this.handleLoad}
              style={[
                {
                  opacity: this.state.mainImageOpacity,
                  width,
                  height,
                },
                imageStyle,
              ]}
              resizeMode="contain">
              {content}
            </AnimatedImage>
          </TouchableWithoutFeedback>
        </Animated.View>
        <Modal
          visible={openModal}
          animationType="slide"
          onRequestClose={
            this.props.closeOnBack ? this.toggleModal : () => null
          }
          transparent>
          <Animated.View
            style={[
              styles.upperOverlayHeader,
              {backgroundColor: interpolatedColor},
              {opacity: interpolatedOpacity},
            ]}>
            <Animated.View style={[styles.overlayHeader, {opacity: interpolatedOpacity}]}>
              <View style={{flex: 1, alignItems: 'flex-start'}}>
                <TouchableOpacity
                  onPress={() => this.toggleModal()}
                  activeOpacity={0.7}
                  style={{top: 2, left: 2}}
                  hitSlop={{
                    top: 7, right: 7, bottom: 7, left: 7
                  }}>
                  <Icon
                    style={{color: "#fff", backgroundColor: 'transparent'}} name={'ios-arrow-back'}
                  />
                </TouchableOpacity>
              </View>
              {downloadable && <View style={{flex: 1, alignItems: 'flex-end', backgroundColor: 'transparent'}}>
                  <TouchableOpacity
                    onPress={() => {this.handleDownloadImage()}}
                    activeOpacity={0.7}
                    style={{top: 2, right: 10}}
                    hitSlop={{
                      top: 7,
                      right: 7,
                      bottom: 7,
                      left: 7,
                    }}>
                  <Icon style={{color: "#fff", backgroundColor: 'transparent'}} name={'ios-download'} />
                  </TouchableOpacity>
                </View>
              }
            </Animated.View>
            <AnimatedImage
              source={source}
              {...this.panResponder.panHandlers}
              style={[
                styles.overlayImage,
                this._zoomedImageSize,
                {
                  transform: [
                    ...this.state.layout.getTranslateTransform(),
                    {scale},
                  ],
                },
              ]}
            />
          </Animated.View>
        </Modal>
      </View>
    );
  }

  callToggleModal() {
    this.toggleModal();
  }
}

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: windowWidth,
    height: windowHeight,
    bottom: 0,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  overlayImage: {
    flex: 1,
    width: windowWidth,
    maxHeight: windowHeight - 60,
    marginTop: 50,
  },
  upperOverlayHeader: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlayHeader: {
    flex: 1,
    flexDirection: 'row',
    position: 'absolute',
    zIndex: 2,
    top: 0,
    left: 0,
    width: windowWidth,
    padding: 10,
  },
});
