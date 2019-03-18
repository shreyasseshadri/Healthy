import React, {Component} from 'react';
import {
  View,
  Button,
  StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
  }
});

class Home extends Component {
  render () {
    return (
      <View style={styles.container}>
        <Button onPress={() => this.props.navigation.navigate("Login")} title="Logout!!" />
      </View>
    );
  }
}



export default Home;