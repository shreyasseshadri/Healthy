import React, {Component} from "react";
import {View, Text, StyleSheet, ScrollView} from 'react-native';

const styles = StyleSheet.create({
    title: {
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 10,
        fontFamily: 'monospace',
    },
    textbox: {
        marginLeft: 10,
        marginTop: 10,
        textAlign: 'center'
    }
});
export default class firstaid extends Component {
    render() {
        return (
            <ScrollView>
                <Text style={styles.title}>
                    First aid for Heart attack
                </Text>
                <View style={styles.textbox}>
                    <Text>{'\u2022'}
                        <Text style={{fontWeight: 'bold'}}> Call 911 or your local emergency number.</Text>
                        <Text> Don't ignore or attempt to tough out the symptoms of a heart attack. If you don't have
                            access to emergency medical services, have a neighbor or a friend drive you to the nearest
                            hospital.

                            Drive yourself only as a last resort, and realize that it places you and others at risk when
                            you drive under these circumstances.</Text>
                    </Text>
                </View>

                <View style={styles.textbox}>
                    <Text>{'\u2022'}
                        <Text style={{fontWeight: 'bold'}}> Chew and swallow an aspirin,</Text>
                        <Text> unless you are allergic to aspirin or have been told by your doctor never to take
                            aspirin.</Text>
                    </Text>
                </View>

                <View style={styles.textbox}>
                    <Text>{'\u2022'}
                        <Text style={{fontWeight: 'bold'}}> Take nitroglycerin,</Text>
                        <Text> if prescribed. If you think you're having a heart attack and your doctor has previously
                            prescribed nitroglycerin for you, take it as directed. Don't take anyone else's
                            nitroglycerin, because that could put you in more danger.</Text>
                    </Text>
                </View>

                <View style={styles.textbox}>
                    <Text>{'\u2022'}
                        <Text style={{fontWeight: 'bold'}}> Begin CPR if the person is unconscious.</Text>
                        <Text> Approach the victims in a calm and composed manner. Discourage other helping citizens
                            from handling the victims in a brashly as this can cause further damage. Shift the patient
                            away from oncoming traffic, broken glass, leaking car fluids or any other hazardous
                            material.</Text>
                    </Text>
                </View>

                <View style={styles.textbox}>
                    <Text>{'\u2022'}
                        <Text style={{fontWeight: 'bold'}}> If an automated external defibrillator (AED) is</Text>
                        <Text> immediately available and the person is unconscious, follow the device instructions for
                            using it.</Text>
                    </Text>
                </View>
                <Text style={styles.title}>
                    Road accidents
                </Text>

                <View style={styles.textbox}>
                    <Text>{'\u2022'}
                        <Text style={{fontWeight: 'bold'}}> Call 911 or your local emergency number.</Text>
                        <Text> Don't ignore or attempt to tough out the symptoms of a heart attack. If you don't have
                            access to emergency medical services, have a neighbor or a friend drive you to the nearest
                            hospital.

                            Drive yourself only as a last resort, and realize that it places you and others at risk when
                            you drive under these circumstances.</Text>
                    </Text>
                </View>

                <View style={styles.textbox}>
                    <Text>{'\u2022'}
                        <Text style={{fontWeight: 'bold'}}> Immobilize the cervical spine,</Text>
                        <Text> Immobilize the cervical spine by using two wooden blocks on either side of the neck (do
                            not disturb the spine and head by shaking them). Shaking the head & neck while shifting the
                            victim may cause major damage and paralyze the patient completely.</Text>
                    </Text>
                </View>

                <View style={styles.textbox}>
                    <Text>{'\u2022'}
                        <Text style={{fontWeight: 'bold'}}> Temperory bandaid,</Text>
                        <Text> Bleeding can be stemmed by applying continuous pressure to the open wound with a cloth,
                            or tying the cloth gently around the injury.
                            Inspect the limbs of the victim for any fractures, broken bone or other damage while being
                            careful to not apply any undue pressure or force. Secure the broken limb by tying a small
                            stick to either side of the limb with a cloth. </Text>
                    </Text>
                </View>

                <View style={styles.textbox}>
                    <Text>{'\u2022'}
                        <Text style={{fontWeight: 'bold'}}> Check if patient is breathing,</Text>
                        <Text>Check if they're breathing by tilting their head backwards and looking and feeling for
                            breaths.
                            If they are breathing, move them onto their side and tilt their head back to keep their
                            airway open.
                            Every few minutes, check they're still breathing and that their head remains tilted
                            back. </Text>
                    </Text>
                </View>
            </ScrollView>
        );
    }
}