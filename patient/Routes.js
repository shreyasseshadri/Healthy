import React, { Component } from "react";
// import { StackNavigator } from 'react-navigation';
import Register from "./src/screens/register";
// export default Routes = StackNavigator({
//   Register: {
//    screen: Register
//   }
// });

import { createStackNavigator, createAppContainer } from "react-navigation";



const AppNavigator = createStackNavigator({
  Register: {
    screen: Register
  }
});

export default createAppContainer(AppNavigator);