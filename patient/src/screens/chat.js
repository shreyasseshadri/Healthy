import React from "react";
import { GiftedChat } from "react-native-gifted-chat";

export default class Chat extends React.Component {
    constructor(props){
        super(props);
        this.state={
            messages: []
        }
        this.uname=props.navigation.getParam('uname', 'username');
        console.log("Hiiiii",this.uname)
        this.webs=props.navigation.getParam('webs', null)
    }

    componentWillMount() {
        this.setState({
          messages: [
            {
              _id: 1,
              text: 'Hello,please tell me about your problem',
              createdAt: new Date(),
              user: {
                _id: 2,
                name: 'React Native',
                avatar: 'https://placeimg.com/140/140/any',
              },
            },
          ],
        })
    }
     
    onSend(messages = []) {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }))
        messages.forEach(message => {
            this.webs.send(JSON.stringify({'username':this.uname,'messege':message}));
        });
    }

    render() {
    return <GiftedChat messages={this.state.messages} 
                onSend={messages => this.onSend(messages)}
            />;
    }
}