import React from "react";
import {GiftedChat} from "react-native-gifted-chat";

export default class Chat extends React.Component {
    constructor(props) {

        super(props);
        this.state = {
            messages: [],
            init: false,
        }
        var server = '10.53.105.13:3000/chat';
        this.webs = new WebSocket('ws://' + server);
        this.uname = props.navigation.getParam('uname', 'username');
        this.doctor = props.navigation.getParam('doctor', null);
    }

    preprocess(msgs) {
        var gc_message = [];
        // The 0 there is the key, which sets the date to the epoch
        for (var i = msgs.length - 1; i >= 0; i--) {
            var gc_json = {
                _id: i,
                text: msgs[i].msg,
                user: {
                    _id: 2,
                    name: this.doctor,
                },


                createdAt: new Date(0).setUTCSeconds(msgs[i].stamp)
            }
            if (msgs[i].to !== this.uname) {
                // gc_json._id=2;
                gc_json.user = {
                    _id: 1,
                    name: this.uname,
                }
            }
            gc_message.push(gc_json);
        }
        return gc_message;
    }

    componentWillMount() {
        if (!this.state.init) {
            this.setState({init: false});
            this.webs.onmessage = (e) => {
                // a message from doctor through server
                var msg = e.data
                if (e.chat.from !== this.uname) {

                    var joined = this.preprocess(e.chat).concat(this.state.messages);
                    this.setState({messages: joined});
                }
            };


            fetch('http://10.53.105.13:3000/chat/history', {
                method: 'POST',
                mode: 'cors',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    peer: this.doctor
                }),
            }).then(function (response) {
                return response.json();
            })
                .then(json => {

                    if (json.success) {
                        var joined = this.preprocess(json.history).concat(this.state.messages);
                        // joined=this.state.messages.concat(joined);
                        this.setState({messages: joined});
                    }
                })
                .catch(function (error) {
                    throw error;
                });


        }
    }

    onSend(messages = []) {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }))
        messages.forEach(message => {
            this.webs.send(JSON.stringify({
                type: "chat_msg",
                chat: {
                    to: this.doctor,
                    msg: message.text,
                },
            }));
        });
    }

    render() {
        return <GiftedChat messages={this.state.messages}
                           onSend={messages => this.onSend(messages)}
                           user={{
                               _id: 1,
                           }}
        />;
    }
}