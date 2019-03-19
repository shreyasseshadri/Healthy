import React from 'react';
import { Button, View, ScrollView,Text,StyleSheet } from 'react-native';
import t from 'tcomb-form-native';

const Form = t.form.Form;

const User = t.struct({
  email: t.String,
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
   
    const value = this._form.getValue(); 
    if(value != null && this.isvalid(value))
    {
        this.props.navigation.replace('Login',{
            name : value.username ,
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