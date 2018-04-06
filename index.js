import { AppRegistry } from 'react-native';
import { app } from './App';

AppRegistry.registerComponent('eMia', () => app);

global.CURRENT_VERSION = 'v0.1.3';

// It does not work here. TODO: remove this kind of navigation
// import GitterMobile from './app/index.js';