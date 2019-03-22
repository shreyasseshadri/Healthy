import React, {Component} from "react";
import {
    View,
    Text,
    Button,
    TouchableHighlight,
    StyleSheet,
    Dimensions,
    ActivityIndicator,
    ScrollView,
    TouchableOpacity, Linking
} from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";
const {width, height} = Dimensions.get('window');

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
    button_style: {
        borderWidth: 1,
        borderColor: 'rgba(0.7,0,0,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 10,
        right: 8,
        width: 60,
        height: 60,
        backgroundColor: '#fff',
        borderRadius: 60,
    },
    username: {
        marginLeft: 10,
        fontSize: 23,
    }
});

export default class DoctorsChat extends Component {

    constructor(props) {
        super();
        this.state = {
            messege: "",
            doctors: [],

            uname: '',
            loading: true,
            error: false,
        }
        this.state.uname = props.navigation.getParam('name', 'username');
        this.sendReq = this.sendReq.bind(this);
    }

    componentWillMount() {
        fetch('http://'+global.server+'/chat/conversations', {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }).then(function (response) {
            return response.json();
        }).then(json => {
            this.setState({doctors: json.conversations});

        }).catch(function (error) {
            setTimeout(() => {
                this.setState({loading: false, error: true});
            }, 1000);

            throw error;

        });
        setTimeout(() => {
            this.setState({loading: false});
        }, 1000);
    }

    sendReq(doctor) {
        //if accepted then
        this.props.navigation.navigate('Chat', {
            uname: this.state.uname,
            doctor: doctor,
            webs: this.webs
        })

    }

    render() {
        return (
            <View style={{flex:1}}>
                <ScrollView >
                    <View styles={styles.container}>
                        <ActivityIndicator animating={this.state.loading} size="large" color="#0000ff"/>
                    </View>
                    {!this.state.error &&
                    <View styles={styles.container}>
                        {this.state.doctors.map((person, index) => (
                            <TouchableHighlight
                                key={index}
                                onPress={() => this.sendReq(person.doctor)}
                                underlayColor="#f3f3f3" style={styles.list_item}>
                                <View style={styles.list_item_body}>
                                    <Text style={styles.username}>{person.doctor}</Text>
                                </View>
                            </TouchableHighlight>
                        ))}
                    </View>
                    }
                    {
                        this.state.error &&
                        <View>
                            <Text style={{textAlign: 'center', fontWeight: 'bold'}}>Server Error</Text>
                        </View>
                    }
                </ScrollView>
                <View>
                    <TouchableOpacity style={styles.button_style}>
                        <Icon name={"plus"} size={30} color="green"
                              onPress={() => this.props.navigation.navigate('availdoctors',{name:this.uname})}/>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
