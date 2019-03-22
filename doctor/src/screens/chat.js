import React from "react";
import {GiftedChat} from "react-native-gifted-chat";

export default class Chat extends React.Component {
    constructor(props) {

        super(props);
        this.state = {
            messages: [],
            init: false,
        }

        this.webs = new WebSocket('ws://' +global.server+'/chat');
        this.uname = props.navigation.getParam('uname', 'username');
        this.patient = props.navigation.getParam('patient', null);
        this.counter=0;
    }

    preprocess(msgs) {
        // console.error(msgs);
        var gc_message = [];
        // The 0 there is the key, which sets the date to the epoch
        for (var i = msgs.length - 1; i >= 0; i--) {
            var gc_json = {
                _id: this.counter,
                text: msgs[i].msg,
                user: {
                    _id: 1,
                    name: this.patient,
                },


                createdAt: new Date(0).setUTCSeconds(msgs[i].stamp)
            }
            this.counter+=1;
            if (msgs[i].to !== this.uname) {
                // gc_json._id=2;
                gc_json.user = {
                    _id: 2,
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
                var msg = JSON.parse(e.data);
                console.log('data: ',msg.chat);
                if (msg.chat.from !== this.uname) {
                    var joined = this.preprocess([msg.chat]).concat(this.state.messages);
                    this.setState({messages: joined});
                }
            };


            fetch('http://'+global.server+'/chat/history', {
                method: 'POST',
                mode: 'cors',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    peer: this.patient
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
                    to: this.patient,
                    msg: message.text,
                },
            }));
        });
    }

    render() {
        return <GiftedChat messages={this.state.messages}
                           onSend={messages => this.onSend(messages)}
                           user={{
                               _id: 2,
                           }}
        />;
    }
}