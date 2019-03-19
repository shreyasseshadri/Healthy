import React, { Component } from 'react';
import { View, Button, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";
import { Dimensions, ScrollView } from 'react-native';
const { width, height } = Dimensions.get('window');
import {Linking} from 'react-native'
import { withNavigation } from 'react-navigation';


var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  card: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    height: 200,
    flexDirection: 'row',
    margin: 24
  },
  image: {
    width: '100%',
    height: 200,
    position: 'absolute'
  },
  button_style: {
    borderWidth: 1,
    borderColor: 'rgba(0.7,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 8,
    right: 8,
    width: 60,
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 60,
  },
  textView: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignSelf: 'flex-end'
  }
});

class Home extends Component {
  render() {
    const uname = this.props.navigation.getParam('name', 'username');
    return (
      <View>
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.card}>
              <Image
                resizeMode={'cover'}
                style={styles.image}
                source={require('../images/appointment.jpg')}
              />
              <View style={styles.textView}>
                <Text style={{ color: 'white', fontSize: 20, margin: 6 }}>Upcoming Appointment</Text>
                <Text style={{ color: 'white', margin: 6 }}>No appointments booked</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.card} onPress={() => this.props.navigation.navigate("availdoctors",{name:uname})}>
              <Image
                resizeMode={'cover'}
                style={styles.image}
                source={require('../images/doctor.jpg')}
              />
              <View style={styles.textView}>
                <Text style={{ color: 'white', fontSize: 20, margin: 6 }}>Got problems?</Text>
                <Text style={{ color: 'white', margin: 6 }}>Chat with best doctors</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.card} onPress={() => this.props.navigation.navigate("availdoctors")}>
              <Image
                resizeMode={'cover'}
                style={styles.image}
                source={require('../images/doctor.jpg')}
              />
              <View style={styles.textView}>
                <Text style={{ color: 'white', fontSize: 20, margin: 6 }}>Got problems?</Text>
                <Text style={{ color: 'white', margin: 6 }}>Chat with best doctors</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.card} onPress={() => this.props.navigation.navigate("availdoctors")}>
              <Image
                resizeMode={'cover'}
                style={styles.image}
                source={require('../images/doctor.jpg')}
              />
              <View style={styles.textView}>
                <Text style={{ color: 'white', fontSize: 20, margin: 6 }}>Got problems?</Text>
                <Text style={{ color: 'white', margin: 6 }}>Chat with best doctors</Text>
              </View>
            </TouchableOpacity>

          </View>
        </ScrollView>
        <View>
          <TouchableOpacity style={styles.button_style}>
            <Icon name={"ambulance"} size={30} color="red" onPress={() => Linking.openURL(`tel:8548950201`)}/>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}



export default withNavigation(Home);
