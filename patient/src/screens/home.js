import React from 'react';
import { Button, View, Text } from 'react-native';
class Home extends React.Component {
  static navigationOptions = {
    title: 'Home'
   };
render() {
 return (
  <View style={{ 
   flex: 1,
   alignItems:'center',
   justifyContent:'center'
  }}>
  <Button title="Logout"
    onPress={() => this.props.navigation.navigate('Login')}
   />
  </View>
);
}
}
export default Home;