/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {PendoSDK} from 'rn-pendo-sdk';

PendoSDK.setup('KEY_HERE', {});
PendoSDK.startSession('test-visitor', 'Tradiecore', {}, {});
PendoSDK.screenContentChanged();

AppRegistry.registerComponent(appName, () => App);
