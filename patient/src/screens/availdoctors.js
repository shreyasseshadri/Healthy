import React, {Component} from "react";
import {View, Text, Button, TouchableHighlight, StyleSheet, ActivityIndicator} from 'react-native';

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        marginTop: 10,
        padding: 10,
    },
    list_item: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    list_item_body: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    username: {
        marginLeft: 10,
        fontSize: 23,
    }
});

export default class DoctorsChat extends Component {

    constructor(props) {
        super();
        this.state = {
            messege: "",
            doctors: [],

            uname: '',
            loading: true,
            error: false,
        }
        this.state.uname = props.navigation.getParam('name', 'username');
        this.sendReq = this.sendReq.bind(this);
    }

    componentWillMount() {
        fetch('http://'+global.server+'/info/doctors', {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }).then(function (response) {
            return response.json();
        }).then(json => {
            this.setState({doctors: json.doctors});

        }).catch(function (error) {
            setTimeout(() => {
                this.setState({loading: false, error: true});
            }, 1000);

            throw error;

        });
        setTimeout(() => {
            this.setState({loading: false});
        }, 1000);
    }

    sendReq(doctor) {
        //if accepted then
        this.props.navigation.navigate('Chat', {
            uname: this.state.uname,
            doctor: doctor,
            webs: this.webs
        })

    }

    render() {
        return (
            <View>
                <View styles={styles.container}>
                    <ActivityIndicator animating={this.state.loading} size="large" color="#0000ff"/>
                </View>
                {!this.state.error &&
                <View styles={styles.container}>
                    {this.state.doctors.map((person, index) => (
                        <TouchableHighlight
                            key={index}
                            onPress={() => this.sendReq(person.name)}
                            underlayColor="#f3f3f3" style={styles.list_item}>
                            <View style={styles.list_item_body}>
                                <Text style={styles.username}>{person.name}</Text>
                            </View>
                        </TouchableHighlight>
                    ))}
                </View>
                }
                {
                    this.state.error &&
                    <View>
                        <Text style={{textAlign: 'center', fontWeight: 'bold'}}>Server Error</Text>
                    </View>
                }
            </View>
        );
    }
}
