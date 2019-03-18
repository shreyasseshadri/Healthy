import React, { Component } from 'react';
import {
  TouchableOpacity
} from 'react-native';

import { createStackNavigator, createAppContainer,HeaderBackButton } from  'react-navigation';
import IOSIcon from "react-native-vector-icons/Ionicons";
import home from "../screens/home";
import login from "../screens/login";
import register from "../screens/register";
import { withNavigation } from 'react-navigation';

const stackNav =  createStackNavigator({
  Home : {
    screen: home,
    navigationOptions: ({navigation}) => ({
      title: "Home",
      headerLeft:(<TouchableOpacity onPress={() =>  navigation.openDrawer()}>
      <IOSIcon name="ios-menu" size={30} style={{paddingLeft:10}}/>
    </TouchableOpacity>
      )
    })
  },
  Login: {
    screen: login,
    navigationOptions: ({navigation}) => ({
      title: "Login",
      headerLeft: null,
        gesturesEnabled: false,
    })     
  },
  Register:{
    screen: register,
    navigationOptions: ({navigation}) => ({
      title: "Register",
      headerLeft: null,
        gesturesEnabled: false,
    })
}
});
export default withNavigation(createAppContainer(stackNav));
