import PropTypes from 'prop-types';
import React, {Component} from 'react';

import {NavigationActions} from 'react-navigation';
import {ScrollView, Text, View,StyleSheet} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Icon from "react-native-vector-icons/FontAwesome";


const styles=StyleSheet.create({
    container: {
      paddingTop: 20,
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


class SideMenu extends Component {
  render () {
    return (
      <View style={styles.container}>
        <Icon name="close" onPress={() => this.props.navigation.closeDrawer()} size={20} style={{paddingLeft:10}}/>
         {/* <Icon name="md-close" onPress={() => this.props.navigation.closeDrawer()}/> */}
        <ScrollView>
          <View>
            <View style={styles.navItemStyle}>
              <Text style={styles.navItemStyle} onPress={() => this.props.navigation.navigate('Register')}>
              Book Appointment(Reg)
              </Text>
            </View>
            <View style={styles.navItemStyle}>
              <Text style={styles.navItemStyle} onPress={() => this.props.navigation.navigate('Login')}>
              View Appointment(Login)
              </Text>
            </View>
            <View style={styles.navItemStyle}>
              <Text style={styles.navItemStyle} onPress={() => this.props.navigation.navigate('Register')}>
              Prescriptions(Reg)
              </Text>
            </View>
            <View style={styles.navItemStyle}>
              <Text style={styles.navItemStyle} onPress={() => this.props.navigation.navigate('Login')}>
              Insurance(Login)
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