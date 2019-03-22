import React, {Component} from "react";
import { AppRegistry, Dimensions } from 'react-native';
import { createDrawerNavigator,createAppContainer } from 'react-navigation';
import SideMenu from './src/components/sidemenu'
import stackNav from './src/components/stacknav';

const App = createDrawerNavigator({
  Item1: {
      screen: stackNav,
    }
  }, {
    contentComponent: SideMenu,
    drawerWidth: Dimensions.get('window').width - 120,  
});

export default App;