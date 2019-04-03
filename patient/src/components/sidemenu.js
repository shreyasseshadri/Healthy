import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {StackNavigator} from 'react-navigation';
import {PanResponder, ScrollView, StyleSheet, Text, View} from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";
import {AsyncStorage} from 'react-native';


const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        position: 'relative',
        flex: 1
    },
    navItemStyle: {
        padding: 10
    },
    navSectionStyle: {
        backgroundColor: 'lightgrey'
    },
    sectionHeadingStyle: {
        paddingVertical: 10,
        paddingHorizontal: 5
    },
    footerContainer: {
        padding: 20,
        backgroundColor: 'lightgrey'
    }
});

const getDirection = ({moveX, moveY, dx, dy}) => {
    return dx < -30;

}

const _cleardata = async (resolve) => {
    await AsyncStorage.removeItem('Credentials');
};

class SideMenu extends Component {

    constructor(props) {
        super(props);

        this._panResponder = PanResponder.create({
            onMoveShouldSetPanResponder: (evt, gestureState) => !!getDirection(gestureState),
            onPanResponderMove: (evt, gestureState) => {
                const drag = getDirection(gestureState);
                if (drag) {
                    this.props.navigation.closeDrawer()
                }
            },
        });

    }

    render() {
        return (
            <View style={styles.container}  {...this._panResponder.panHandlers}>
                <View style={{paddingLeft: 20, top: 5}}>
                    <Icon name={"user-circle"} size={40} color="green"/>
                    <Text>{"Hello, " + global.username}</Text>
                </View>
                {/* <Icon name="close" onPress={() => this.props.navigation.closeDrawer()} size={20} style={{paddingLeft:200,paddingTop:0}}/> */}
                <ScrollView>
                    <View>

                        <View style={styles.navItemStyle}>
                            <Text style={styles.navItemStyle}
                                  onPress={() => this.props.navigation.navigate('availdoctors')}>
                                Chat with doctor
                            </Text>
                        </View>

                        <View style={styles.navItemStyle}>
                            <Text style={styles.navItemStyle}
                                  onPress={() => this.props.navigation.navigate('firstaid')}>
                                First Aid
                            </Text>
                        </View>
                        <View style={styles.navItemStyle}>
                            <Text style={styles.navItemStyle} onPress={() => {_cleardata();this.props.navigation.navigate('Login');}}>
                                Logout
                            </Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

SideMenu.propTypes = {
    navigation: PropTypes.object
};

export default SideMenu;