import React, {Component} from 'react';
import {
    TouchableOpacity
} from 'react-native';

import {createStackNavigator, createAppContainer, HeaderBackButton} from 'react-navigation';
import IOSIcon from "react-native-vector-icons/Ionicons";
import home from "../screens/home";
import login from "../screens/login";
import register from "../screens/register";
import Chat from "../screens/chat";
import Pre from "../screens/prescription";
import PreHistory from "../screens/prescriptionHistory";
import conversation from "../screens/conversation";
import firstaid from "../screens/firstaid";
import {withNavigation} from 'react-navigation';

const stackNav = createStackNavigator({
    Login: {
        screen: login,
        navigationOptions: ({navigation}) => ({
            title: "Login",
            headerLeft: null,
            gesturesEnabled: false,
        })
    },
    Home: {
        screen: home,
        navigationOptions: ({navigation}) => ({
            title: "Home",
            headerLeft: (<TouchableOpacity onPress={() => navigation.openDrawer()}>
                    <IOSIcon name="ios-menu" size={30} style={{paddingLeft: 10}}/>
                </TouchableOpacity>
            )
        })
    },
    Register: {
        screen: register,
        navigationOptions: ({navigation}) => ({
            title: "Register",
            headerLeft: null,
            gesturesEnabled: false,
        })
    },
    conversation: {
        screen: conversation,
        navigationOptions: ({navigation}) => ({
            title: "Conversations",
            headerLeft: null,
            gesturesEnabled: false,
        })
    },
    firstaid: {
        screen: firstaid,
        navigationOptions: ({navigation}) => ({
            title: "First Aid tips",
            headerLeft: null,
            gesturesEnabled: false,
        })
    },
    Chat: {
        screen: Chat,
        navigationOptions: ({navigation}) => ({
            title: "Doctor",
            headerLeft: null,
            gesturesEnabled: false,
        })
    },
    Prescription: {
        screen: Pre,
        navigationOptions: ({navigation}) => ({
            title: "Issue a prescription",
            headerLeft: null,
            gesturesEnabled: false,
        })
    },
    PrescriptionHistory: {
        screen: PreHistory,
        navigationOptions: ({navigation}) => ({
            title: "Prescription history",
            headerLeft: null,
            gesturesEnabled: false,
        })
    },
});
export default withNavigation(createAppContainer(stackNav));
