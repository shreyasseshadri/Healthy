import React, {Component} from "react";
import {Button, View, Text, StyleSheet} from 'react-native';
import t from 'tcomb-form-native';
import {AsyncStorage} from 'react-native';

const Form = t.form.Form;

const User = t.struct({
    username: t.String,
    password: t.String
});
var options = {
    fields: {
        password: {
            password: true,
            secureTextEntry: true
        }
    }
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        marginTop: 50,
        padding: 20,
    },
});


const _retrieveData = async (resolve) => {
    let username = await AsyncStorage.getItem('Username');
    let password = await AsyncStorage.getItem('Password');

    return JSON.stringify({'username': username, 'password': password});

};


export default class LoginPage extends Component {

    componentWillMount() {
        _retrieveData().then((result) => {

            result = JSON.parse(result);
            if (result.username !== null) {


                fetch('http://'+global.server+'/auth/doctor', {
                    method: 'POST',
                    mode: 'cors',
                    credentials: 'include',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: result.username,
                        password: result.password,
                    }),
                }).then(function (response) {
                    return response.json();
                })
                    .then(json => {

                        if (json.success) {

                            this.props.navigation.replace('Home',
                                {
                                    name: result.username
                                }
                            );

                        } else
                            alert("Invalid Username or password");

                    })
                    .catch(function (error) {
                        // ADD THIS THROW error
                        throw error;
                    });
            }
        });

    }

    static navigationOptions = {
        title: 'Login'
    };
    handleSubmit = () => {


        const value = this._form.getValue();
        const _storeData = async () => {
            try {
                await AsyncStorage.clear();
                await AsyncStorage.setItem('Username', value.username);
                await AsyncStorage.setItem('Password', value.password);

            } catch (error) {
                // Error saving data
                throw error;
            }
        };
        if (value != null) {

            fetch('http://'+global.server+'/auth/doctor', {
                method: 'POST',
                mode: 'cors',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: value.username,
                    password: value.password,
                }),
            }).then(function (response) {
                return response.json();
            })
                .then(json => {
                    if (json.success) {

                        _storeData().then(
                            error => {
                                throw error;
                            });
                        this.props.navigation.replace('Home',
                            {
                                name: value.username,
                            }
                        );
                    } else
                        alert("Invalid Username or password");

                })
                .catch(function (error) {

                    // ADD THIS THROW error
                    throw error;
                });
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Form ref={c => this._form = c} type={User} options={options}/>
                <Button
                    title="Login"
                    onPress={this.handleSubmit}
                />
                <View style={{paddingTop: 20}}>
                    <Button
                        title="Register"

                        onPress={() => this.props.navigation.navigate('Register')}
                    />
                </View>
            </View>
        );
    }
}
