import React from 'react';
import { Button, View, ScrollView,Text,StyleSheet } from 'react-native';
import t from 'tcomb-form-native';
import {AsyncStorage} from 'react-native';


const Form = t.form.Form;

const User = t.struct({
  email: t.String,
  username: t.String,
  name: t.String,
  // Blood_type:t.String,
  phone: t.String,
  password: t.String,
  confirm_password: t.String
});

var options = {
  fields: {
      password: {
      password: true,
      secureTextEntry: true
      },
      confirm_password: {
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

class Register extends React.Component {

  static navigationOptions = {
    title: 'Register'
   };
  


   handleSubmit = () => {
       const _storeData = async () => {
           try {
               await AsyncStorage.clear();
               await AsyncStorage.setItem('Username',value.username);
               await AsyncStorage.setItem('Password',value.password);

           } catch (error) {
               // Error saving data
               console.log(error);
           }
       };
    const value = this._form.getValue(); 
    if(value != null && this.isvalid(value))
    {

        fetch('http://10.53.105.13:3000/register/patient', {
          method: 'POST',
          mode: 'cors',
          credentials: 'include',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              username: value.username,
              name:value.name,
              password: value.password,
              email: value.email,
              phone: value.phone,
              dob: 'eg_dob'
          }),
          }).then(function(response){
              return response.json();
            })
            .then(json => {
              console.log('success ? :',json.success)
              if(json.success)
              {

                _storeData().then(
                    error => {console.log(error);
                    });
                this.props.navigation.replace('Login');
              }
              else
              {
                  console.log('Error sent from server');
                  alert(json.error);
              }
              console.log(json);
            })
            .catch(function(error) {
            console.log('There has been a problem with your fetch operation: ' + error.message);
             // ADD THIS THROW error
              throw error;
            });  
    }
  }
isvalid(value)
{
  var username=value.username;
  var password=value.password;
  var conf_pass=value.confirm_password;
  var phone=value.phone;
  var email=value.email;
  if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)))
  { 
    alert("Invalid Email");
    return false;
  }
  if(!(/^\d{10}$/.test(phone)))
  {
    alert('Invalid Phone Number');
    return false;
  }
  if(password != conf_pass)
  {
    alert('Passwords do not match');
    return false;

  }
  return true;

}
render() {
 return (
  <ScrollView>
      <View style={styles.container}>
  
  <Form  ref={c => this._form = c} type={User} options={options} />
  <Button
      title="Sign Up!"
      onPress={this.handleSubmit}
    />
</View>
  </ScrollView>
  
);
}
}

export default Register;