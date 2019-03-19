import React, { Component } from "react";
import { View, Text, Image,Button,StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 10,
    padding: 10,
  },
});

export default class DoctorsChat extends Component{
   
    constructor(props){
        super();
        this.state={
            messege:"",
            doctors:[],
            conn_open:false,
            uname:''
        }
        this.state.uname = props.navigation.getParam('name', 'username');
       var server = '192.168.1.111:7000';
        this.webs = new WebSocket('ws://'+server);
        this.sendReq=this.sendReq.bind(this);
    }
    
    componentWillMount(){
        console.log('Executing function ');
        var ws = this.webs;
          ws.onopen = () => {
            // connection opened
        
            const message={'username':this.state.uname,'message':'requesting doctor list'};
            this.setState({conn_open:true});
            ws.send(JSON.stringify(message)); // send a message
            // console.log(this.state);
            // this.setState({ messege:''});
          };
  
          ws.onmessage = (e) => {
            // a message was received
            // console.log(JSON.parse(e.data));
            this.state.doctors= JSON.parse(e.data);
            this.setState({ messege: this.state.messege+'\n'+e.data })
            console.log(this.state.doctors);
          };
  
          ws.onerror = (e) => {
            // an error occurred
            console.log(e.message);
          };
  
          ws.onclose = (e) => {
            // connection closed
            this.setState({conn_open:false});
            console.log(e.code, e.reason);
          };
    }
    sendReq(doctor)
    {
      var ws=this.webs;
      
      // alert('requesting doctor');
      
        // connection opened
        if(this.state.conn_open)
        {
          
          const message={'username':this.state.uname,'message':'requesting'+' '+doctor};
          ws.send(JSON.stringify(message)); // send a message
          // console.log(this.state);
          this.setState({ messege:''});
        }
       
      
    }
    render(){
        return (
              <View styles={styles.container}>
              {this.state.doctors.map((person, index) => (
                  <View key={index} style={styles.container}>
                  <Button key={index} onPress={() => this.sendReq(person.name)} title={person.name} style={{paddingTop:100}}></Button>
                  </View>
              ))}
            
            </View>
            
          );
    }
}
