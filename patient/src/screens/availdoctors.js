import React, { Component } from "react";
import { View, Text, Button, TouchableHighlight, StyleSheet, ActivityIndicator } from 'react-native';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 10,
    padding: 10,
  },
  list_item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  list_item_body: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  username: {
    marginLeft: 10,
    fontSize: 23,
  }
});

export default class DoctorsChat extends Component{
   
    constructor(props){
        super();
        this.state={
            messege:"",
            doctors:[],
            conn_open:false,
            uname:'',
            loading:true,
            error:false,
        }
        this.state.uname = props.navigation.getParam('name', 'username');
        var server = '10.53.108.51:7000';
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
            setTimeout(() => {this.setState({loading:false});}, 1000);          
            console.log(this.state.doctors);
          };
  
          ws.onerror = (e) => {
            // an error occurred
            console.log(e.message);
            setTimeout(() => {this.setState({loading:false,error : true});}, 1000);
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
       
        //if accepted then
        this.props.navigation.navigate('Chat',{
          uname : this.state.uname ,
          webs  : this.webs
        })
      
    }
    render(){
        return (
          <View>
            <View styles={styles.container}>
              <ActivityIndicator animating={this.state.loading} size="large" color="#0000ff"/>
            </View>
            { !this.state.error &&
              <View styles={styles.container}>
                {this.state.doctors.map((person, index) => (
                    // <View key={index} style={styles.container}>
                    // <Button key={index} onPress={() => this.sendReq(person.name)} title={person.name} style={{paddingTop:100}}></Button>
                    // </View>
                    <TouchableHighlight
                      key={index}
                      onPress={() => this.sendReq(person.name)}
                      underlayColor="#f3f3f3" style={styles.list_item}>
                      <View style={styles.list_item_body}>
                        <Text style={styles.username}>{person.name}</Text>
                      </View>
                    </TouchableHighlight>
                ))}
              </View>
            }
            {
              this.state.error && 
              <View>
                <Text style={{textAlign: 'center',fontWeight: 'bold'}}>Server Error</Text>
              </View>
            }
          </View>
          );
    }
}
