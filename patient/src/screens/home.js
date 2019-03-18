import React, {Component} from 'react';
import {View, Button, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";
import {Dimensions, ScrollView} from 'react-native';

const {width, height} = Dimensions.get('window');
import {Linking} from 'react-native'
import {withNavigation} from 'react-navigation';

var styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        height: height,
    },
    card: {
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#ddd',
        shadowColor: '#000',
        borderBottomWidth: 0,
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
        height: 200,
        width: "38%",
        flexDirection: 'row',
        margin: 20,
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
        global.username = uname;
        return (
            <View>
                <ScrollView>
                    <View style={styles.container}>
                        <TouchableOpacity style={styles.card}
                                          onPress={() => this.props.navigation.navigate("PrescriptionHistory")}>
                            <Image
                                resizeMode={'cover'}
                                style={styles.image}
                                source={require('../images/doctor.jpg')}
                            />
                            <View style={styles.textView}>
                                <Text style={{color: 'white', fontSize: 20, margin: 6}}>Prescription</Text>
                                <Text style={{color: 'white', margin: 6}}>Prescription history</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.card}
                                          onPress={() => this.props.navigation.navigate("conversation", {name: uname})}>
                            <Image
                                resizeMode={'cover'}
                                style={styles.image}
                                source={require('../images/appointment.jpg')}
                            />
                            <View style={styles.textView}>
                                <Text style={{color: 'white', fontSize: 20, margin: 6}}>Got problems?</Text>
                                <Text style={{color: 'white', margin: 6}}>Chat with best doctors</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.card}
                                          onPress={() => this.props.navigation.navigate("firstaid")}>
                            <Image
                                resizeMode={'cover'}
                                style={styles.image}
                                source={require('../images/firstaid.jpg')}
                            />
                            <View style={styles.textView}>
                                <Text style={{color: 'white', fontSize: 20, margin: 6}}>First Aid tips</Text>
                                <Text style={{color: 'white', margin: 6}}>Emergency guidelines</Text>
                            </View>
                        </TouchableOpacity>

                    </View>
                </ScrollView>
                <View>
                    <TouchableOpacity style={styles.button_style}>
                        <Icon name={"ambulance"} size={30} color="red"
                              onPress={() => Linking.openURL(`tel:8548950201`)}/>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}


export default withNavigation(Home);
