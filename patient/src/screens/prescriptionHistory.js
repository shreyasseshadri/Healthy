import React from "react";
import {View, ScrollView, Text, Button, StyleSheet} from "react-native";
import {Card, CardTitle, CardContent, CardAction, CardButton} from 'react-native-material-cards'

import PopupDialog, {
    DialogTitle,
    SlideAnimation,
    DialogFooter,
    DialogButton,
    DialogContent
} from "react-native-popup-dialog";

const slideAnimation = new SlideAnimation({
    slideFrom: "top",
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
        padding: 20,
    },
    cardAction: {
        flexDirection: "row-reverse",
    }
});

export default class Prescription extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedPre: null,
            prescriptions: [],
        };
    }

    componentWillMount() {
        fetch('http://' + global.server + '/prescription/getAll', {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({}),
        }).then(function (response) {
            return response.json();
        }).then(json => {
            if (json.success) {
                this.setState({prescriptions: json.prescriptions});
            } else {
                alert(json.error);
            }
        }).catch(function (error) {
            alert("Error");
        });
    }

    showPre(i) {
        this.setState({selectedPre: i});
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    {
                        this.state.prescriptions.map((pre, i) => {
                            return (
                                <Card key={i}>
                                    <CardTitle
                                        title={pre["doctor"]}
                                        subtitle={pre["toi"]}
                                    />
                                    <CardAction
                                        separator={true}
                                        style={styles.cardAction}
                                    >
                                        <CardButton
                                            onPress={() => this.showPre(i)}
                                            title="View"
                                            color="blue"
                                        />
                                    </CardAction>
                                </Card>
                            );
                        })
                    }
                </ScrollView>
                <PopupDialog
                    dialogTitle={<DialogTitle title="Drugs"/>}
                    dialogAnimation={slideAnimation}
                    visible={this.state.selectedPre != null}
                    width={.8}
                    onTouchOutside={() => this.showPre(null)}
                    onHardwareBackPress={() => this.showPre(null)}
                    footer={
                        <DialogFooter>
                            <DialogButton
                                text="Close"
                                onPress={() => this.showPre(null)}
                            />
                        </DialogFooter>
                    }
                >
                    <DialogContent>
                        <ScrollView>
                            {
                                this.state.prescriptions.length !== 0 && this.state.selectedPre != null ?
                                    this.state.prescriptions[this.state.selectedPre].content.map((con, i) => {
                                        return (
                                            <Card key={i}>
                                                <CardTitle
                                                    title={con.drug + (con.dosage != null ? ` [${con.dosage}]` : "")}
                                                    subtitle={"Count: " + con.count}
                                                />
                                                <CardContent text={con.note || ""}/>
                                                <CardAction separator={true}/>
                                            </Card>
                                        );
                                    }) : null
                            }
                        </ScrollView>
                    </DialogContent>
                </PopupDialog>
            </View>
        );
    }
}