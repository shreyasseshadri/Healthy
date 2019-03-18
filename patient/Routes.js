import React, { Component } from "react";
// import { StackNavigator } from 'react-navigation';
import Register from "./src/screens/register";
import LoginPage from "./src/screens/login";
import Home from "./src/screens/home";
import { createStackNavigator, createAppContainer } from "react-navigation";



const AppNavigator = createStackNavigator({
  Login: {
    screen: LoginPage
  },
  Register: {
    screen: Register
  },
  Home: {
    screen: Home
  }
});

export default createAppContainer(AppNavigator);