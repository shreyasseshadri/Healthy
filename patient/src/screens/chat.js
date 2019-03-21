import React from "react";
import {GiftedChat} from "react-native-gifted-chat";

export default class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            init: false,
        }
        this.uname = props.navigation.getParam('uname', 'username');
        this.doctor = props.navigation.getParam('doctor', null);
        // console.log("Hiiiii",this.uname);
        this.webs = props.navigation.getParam('webs', null)
    }

    componentWillMount() {
        // this.setState({
        //   messages: [
        //     {
        //       _id: 1,
        //       text: 'Hello,please tell me about your problem',
        //       createdAt: new Date(),
        //       user: {
        //         _id: 2,
        //         name: 'React Native',
        //         avatar: 'https://placeimg.com/140/140/any',
        //       },
        //     },
        //   ],
        // })
        if (!this.state.init) {
            this.webs.send(JSON.stringify({'username': this.uname, 'doctor': this.doctor, 'type': 'init_message'}));
            this.webs.onmessage = (e) => {
                // a message was received
                console.log("initialise", JSON.parse(e.data));

                this.setState({messages: JSON.parse(e.data)});
                this.setState({init: true});
                // console.log(e.data)
                // this.setState({ messege: this.state.messege+'\n'+e.data })
                // console.log(this.state.doctor);
            };
        }
    }

    onSend(messages = []) {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }))
        messages.forEach(message => {
            this.webs.send(JSON.stringify({'username': this.uname, 'messege': message}));
        });
        this.webs.send(JSON.stringify({
            'username': this.uname,
            'doctor': this.doctor,
            'type': 'save_state',
            'current_state': JSON.stringify(messages.concat(this.state.messages))
        }));
    }

    render() {
        return <GiftedChat messages={this.state.messages}
                           onSend={messages => this.onSend(messages)}
        />;
    }
}