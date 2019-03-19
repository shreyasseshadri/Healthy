import React, { Component } from 'react';
import { AppRegistry, Dimensions } from 'react-native';
import { createDrawerNavigator,createAppContainer } from 'react-navigation';
import {name as appName} from './app.json';
import App from './App';
import './global';

AppRegistry.registerComponent(appName, () => createAppContainer(App));