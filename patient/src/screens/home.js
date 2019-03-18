import React, {Component} from 'react';
import { View, Button, StyleSheet, Text , Image, TouchableOpacity } from 'react-native';

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
  image:{
    width: '100%',
    height: 200 ,
    position:'absolute'
  },
  textView:{ 
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignSelf: 'flex-end'
  }
});

class Home extends Component {
  render () {
    return (
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
        <TouchableOpacity style={styles.card} onPress={() => this.props.navigation.navigate("DoctorsChat")}>
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
    );
  }
}



export default Home;