import React, { Component } from "react";
import { View, Text, StyleSheet } from 'react-native';
const styles = StyleSheet.create({
    title: {
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 10,
        fontFamily: 'monospace',
    },
});
export default class firstaid extends Component {
    render() {
        return (
            <View>
                <Text style={styles.title}>
                    First aid for Heart attack
                </Text>
                <View style={{ marginLeft: 10, marginTop: 10, textAlign: 'center' }}>
                    <Text>{'\u2022'}
                        <Text style={{ fontWeight: 'bold' }}> Call 911 or your local emergency number.</Text>
                        <Text > Don't ignore or attempt to tough out the symptoms of a heart attack. If you don't have access to emergency medical services, have a neighbor or a friend drive you to the nearest hospital.

Drive yourself only as a last resort, and realize that it places you and others at risk when you drive under these circumstances.</Text>
                    </Text>
                </View>

                <View style={{ marginLeft: 10, marginTop: 10, textAlign: 'center' }}>
                    <Text>{'\u2022'}
                        <Text style={{ fontWeight: 'bold' }}> Chew and swallow an aspirin,</Text>
                        <Text > unless you are allergic to aspirin or have been told by your doctor never to take aspirin.</Text>
                    </Text>
                </View>

                <View style={{ marginLeft: 10, marginTop: 10, textAlign: 'center' }}>
                    <Text>{'\u2022'}
                        <Text style={{ fontWeight: 'bold' }}> Take nitroglycerin,</Text>
                        <Text > if prescribed. If you think you're having a heart attack and your doctor has previously prescribed nitroglycerin for you, take it as directed. Don't take anyone else's nitroglycerin, because that could put you in more danger.</Text>
                    </Text>
                </View>

                <View style={{ marginLeft: 10, marginTop: 10, textAlign: 'center' }}>
                    <Text>{'\u2022'}
                        <Text style={{ fontWeight: 'bold' }}> Begin CPR if the person is unconscious.</Text>
                        <Text > If you're with a person who is unconscious, tell the 911 dispatcher or another emergency medical specialist. You may be advised to begin cardiopulmonary resuscitation (CPR).

If you haven't received CPR training, doctors recommend performing only chest compressions (about 100 to 120 compressions a minute). The dispatcher can instruct you in the proper procedures until help arrives.</Text>
                    </Text>
                </View>

                <View style={{ marginLeft: 10, marginTop: 10, textAlign: 'center' }}>
                    <Text>{'\u2022'}
                        <Text style={{ fontWeight: 'bold' }}> If an automated external defibrillator (AED) is</Text>
                        <Text > immediately available and the person is unconscious, follow the device instructions for using it.</Text>
                    </Text>
                </View>
            </View>
        );
    }
}