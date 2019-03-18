import React, { Component } from "react";
import { Button, View, Text,StyleSheet } from 'react-native';
import t from 'tcomb-form-native';

const Form = t.form.Form;

const User = t.struct({
  username: t.String,
  password : t.String
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

export default class LoginPage extends Component {
    static navigationOptions = {
        title: 'Login'
    };
    handleSubmit = () => {
    const value = this._form.getValue(); 
    console.log('value: ', value);
    this.props.navigation.navigate('Home');
    }
    
    render() {
        return (
        <View style={styles.container}>
            <Form  ref={c => this._form = c} type={User} options={options} />
            <Button
                title="Login"
                onPress={this.handleSubmit}
            />
            <View style={{paddingTop:20}} >
                <Button 
                    title="Register"
                    
                    onPress={() => this.props.navigation.navigate('Register')}
                />
            </View>
        </View>
        );
    }
}