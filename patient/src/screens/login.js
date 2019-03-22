import React, { Component } from "react";
import { Button, View, Text,StyleSheet } from 'react-native';
import t from 'tcomb-form-native';
import {AsyncStorage} from 'react-native';

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


const _retrieveData = async (resolve) => {
    console.log('Starting to fetch local data');
    

    let username = await AsyncStorage.getItem('Username');
    let password = await AsyncStorage.getItem('Password');

     return JSON.stringify({'username':username,'password':password});
    
};


export default class LoginPage extends Component {
    
    componentWillMount(){
        _retrieveData().then((result)=> {
            this.props.navigation.replace('Home');
        });
    }
    static navigationOptions = {
        title: 'Login'
    };
    handleSubmit = () => {


        const value = this._form.getValue(); 
        console.log('value: ', value);
        if(value != null)
        {
           
            fetch('http://10.53.105.13:3000/auth/patient', {
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
                }).then(function(response){
                    return response.json();
                  })
                  .then(json => {
                    console.log('success ? :',json.success)
                    if(json.success)
                    {
                        //-----------------


                        // fetch('http://10.53.105.13:3000/info/self',{
                        //     method: 'POST',
                        //     mode: 'cors',
                        //     credentials: 'include',
                        //     headers: {
                        //         'Accept': 'application/json',
                        //         'Content-Type': 'application/json',
                        //     },
                        // }).then(function (response) {
                        //     return response.json()
                        // })
                        //     .then(json =>{
                        //         console.log('Self Test : ',json);
                        //     }).catch(function(error){
                        //     console.log('There has been a problem with your fetch operation: ' + error.message);
                           
                        //     throw error;
                        // });



                        //----------------
                        this.props.navigation.replace('Home');
                    }
                    else
                    alert("Invalid Username or password");
                    console.log(json);
                  })
                  .catch(function(error) {
                  console.log('There has been a problem with your fetch operation: ' + error.message);
                   // ADD THIS THROW error
                    throw error;
                  });                                                                                                                                                                                                                                                                                                                       
        }
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
