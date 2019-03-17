import React from 'react';
import { Button, View, Text,StyleSheet } from 'react-native';
import t from 'tcomb-form-native';

const Form = t.form.Form;

const User = t.struct({
  email: t.String,
  name: t.String,
  Doctor_register_number : t.String,
  hospital: t.String,
  speaciality: t.String,
  phone:t.String
});


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
    console.log('value: ', value);
  }

render() {
 return (
  <View style={styles.container}>
      <Form  ref={c => this._form = c} type={User} />
      <Button
          title="Sign Up!"
          onPress={this.handleSubmit}
        />
  </View>
);
}
}

export default Register;