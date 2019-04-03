import React from "react";
import {GiftedChat} from "react-native-gifted-chat";
import {AsyncStorage} from 'react-native';


const _backup = async (doc,messages) => {
    console.log('Stored messages ',messages);
    await AsyncStorage.setItem(doc+'Messages',messages);
};

export default class Chat extends React.Component {
    constructor(props) {

        super(props);
        this.state = {
            messages: [],
            init: false,
        }

        this.webs = new WebSocket('ws://' + global.server + '/chat');
        this.uname = props.navigation.getParam('uname', 'username');
        this.doctor = props.navigation.getParam('doctor', null);
        this.counter = 1;
    }

    preprocess(msgs) {
        var gc_message = [];
        // The 0 there is the key, which sets the date to the epoch
        for (var i = msgs.length - 1; i >= 0; i--) {
            var gc_json = {
                _id: this.counter,
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
            this.counter += 1;
        }
        console.log(gc_message,'I chut');
        return gc_message;
    }


    async get_history() {
        let messages;
        try {

            messages = await AsyncStorage.getItem(this.doctor+'Messages');
            if(messages===null) throw "null";
            console.log('Messages through local storage',messages);
            messages=JSON.parse(messages);


            let resp= await fetch('http://'+global.server+'/chat/unread', {
                method: 'POST',
                mode: 'cors',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    peer: this.doctor,
                }),
            });


            let json=await resp.json();
            console.log('Unread ',json);
            if(json.success)
            {
                // messages=messages.concat(this.preprocess(json.unread));
                messages=this.preprocess(json.unread).concat(messages);

            }
            // else messages=[];

        } catch (e) {
            try {
                let response = await fetch('http://' + global.server + '/chat/history', {
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
                });
                let json = await response.json();
                console.log(this.doctor);
                console.log(json);
                if (json.success) {
                    // this.preprocess()
                    // console.log(json.history,'FML');
                    let temp=this.preprocess(json.history);
                    console.log(temp);
                    messages = temp.concat(this.state.messages);
                    // joined=this.state.messages.concat(joined);
                }
                else messages=[];
                console.log('Messages through server ',messages)
            } catch (e) {
                console.error(e);
                //    net error
            }
        } finally {
            await AsyncStorage.removeItem('Messages');
        }
        console.log('Returning ',messages);
        return messages;
    }

    componentDidMount() {

        if (!this.state.init) {
            // alert('Component Did Mount() ')
            this.setState({init: false});

            this.get_history().then((history) => {
                this.setState({messages: history});
            });

            this.webs.onmessage = async (e) => {
                // a message from doctor through server
                var msg = JSON.parse(e.data);
                // console.log('e:', e);
                // console.log('data: ', msg);

                //Translation
                // msg.chat.msg = await this.translate_msg(msg.chat.msg);
                if (msg.chat.from !== this.uname) {

                    var x=this.preprocess([msg.chat])
                    var joined = x.concat(this.state.messages);
                    this.setState({messages: joined});

                }
            };

            //get here and remove
            //error:
        }
    }

    componentWillUnmount() {

        console.log('Bye Bye!!!!!!!');
        // _backup()
        console.log(this.state.messages);
        _backup(this.doctor,JSON.stringify(this.state.messages));
    }

    onSend(messages = []) {
        console.log(messages);
        console.log(this.state.messages)
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }));
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