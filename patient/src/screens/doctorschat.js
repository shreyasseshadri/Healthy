import React, { Component } from "react";
import { View, Text, Image,Button } from 'react-native';

export default class DoctorsChat extends Component{
    constructor(props){
        super();
        this.state={
            messege:"",
        }
        this.sendReq=this.sendReq.bind(this);
        
    }
    sendReq(){
        console.log('Executing function ');
        var ws = new WebSocket('ws://192.168.1.111:7000');

            
          ws.onopen = () => {
            // connection opened
            ws.send('something'); // send a message
            console.log(this.state);
            this.setState({ messege: this.state.messege+"something" });
          };
  
          ws.onmessage = (e) => {
            // a message was received
            console.log(e.data);
            this.setState({ messege: this.state.messege+'\n'+e.data })
          };
  
          ws.onerror = (e) => {
            // an error occurred
            console.log(e.message);
          };
  
          ws.onclose = (e) => {
            // connection closed
            console.log(e.code, e.reason);
          };
    }
    render(){
        return(
        <View>
            <Text>{this.state.messege}</Text>
            <Button 
                    title="Chat"
                    onPress={this.sendReq}
            />
        </View>
        );
    }
}