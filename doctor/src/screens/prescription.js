import React from "react";
import {View, ScrollView, Text, Button, StyleSheet} from "react-native";
import t from "tcomb-form-native";
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

const Form = t.form.Form;
const contentForm = t.struct({
    drug: t.String,
    count: t.Number,
    dosage: t.maybe(t.String),
    note: t.maybe(t.String),
});
const preForm = t.struct({
    patient_username: t.String,
    note: t.maybe(t.String),
});
const options = {
    fields: {}
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: "center",
        marginTop: 20,
        padding: 20,
    },
    drugFormContainer: {
        justifyContent: "center",
        paddingTop: 20,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    button1: {
        flexGrow: 1,
    },
    cardAction: {
        flexDirection: "row-reverse",
    }
});

export default class Prescription extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            drugDialogOpen: false,
            content: [],
        };
        this.contentForm = null;
        this.preForm = null;
    }

    openDrugDialog() {
        this.setState({drugDialogOpen: true});
    }

    closeDrugDialog() {
        this.setState({drugDialogOpen: false});
    }

    prescribe() {
        if (this.preForm == null)
            return;
        let formData = this.preForm.getValue();
        if (formData == null)
            return;
        fetch('http://' + global.server + '/prescription/issue', {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                patient: formData.patient_username,
                note: formData.note,
                content: this.state.content,
            }),
        }).then(function (response) {
            return response.json();
        }).then(json => {
            if (json.success) {
                alert("Done");
            } else {
                alert(json.error);
            }
        }).catch(function (error) {
            alert("Error");
        });
    }

    addDrug() {
        if (this.contentForm == null)
            return;
        let formData = this.contentForm.getValue();
        if (formData == null)
            return;
        formData.dosage = formData.dosage || undefined;
        formData.note = formData.note || undefined;
        this.setState(prevState => ({
            content: prevState.content.concat([formData]),
            drugDialogOpen: false,
        }));
    }

    delDrug(i) {
        this.setState(prevState => {
            let tmp = prevState.content.slice();
            tmp.splice(i, 1);
            return {content: tmp,}
        });
    }

    componentWillMount() {
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    <Form ref={r => this.preForm = r} type={preForm} options={options}/>
                    {
                        this.state.content.map((con, i) => {
                            return (
                                <Card key={i}>
                                    <CardTitle
                                        title={con.drug + (con.dosage != null ? ` [${con.dosage}]` : "")}
                                        subtitle={"Count: " + con.count}
                                    />
                                    <CardContent text={con.note || ""}/>
                                    <CardAction
                                        separator={true}
                                        style={styles.cardAction}
                                    >
                                        <CardButton
                                            onPress={() => this.delDrug(i)}
                                            title="Remove"
                                            color="red"
                                        />
                                    </CardAction>
                                </Card>
                            );
                        })
                    }
                    <View style={styles.buttonContainer}>
                        <Button
                            style={styles.button1}
                            title="Add drug"
                            onPress={() => this.openDrugDialog()}
                        />
                        <Button
                            style={styles.button1}
                            title="Prescribe"
                            onPress={() => this.prescribe()}
                        />
                    </View>
                </ScrollView>
                <PopupDialog
                    dialogTitle={<DialogTitle title="Add drug"/>}
                    dialogAnimation={slideAnimation}
                    visible={this.state.drugDialogOpen}
                    width={.8}
                    onTouchOutside={() => this.closeDrugDialog()}
                    onHardwareBackPress={() => this.closeDrugDialog()}
                    footer={
                        <DialogFooter>
                            <DialogButton
                                text="Cancel"
                                onPress={() => this.closeDrugDialog()}
                            />
                            <DialogButton
                                text="Add"
                                onPress={() => this.addDrug()}
                            />
                        </DialogFooter>
                    }
                >
                    <DialogContent>
                        <View style={styles.drugFormContainer}>
                            <Form ref={r => this.contentForm = r} type={contentForm}/>
                        </View>
                    </DialogContent>
                </PopupDialog>
            </View>
        );
    }
}