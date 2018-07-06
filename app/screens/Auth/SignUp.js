import React from 'react';

import { StyleSheet, View, Text } from 'react-native';

import { onSignUp } from "../../auth";

import SignUpForm from '../../components/Form/SignUpForm';

export default ({ navigation }) => (
    <View style={ styles.container }>
        <Text style={ styles.headerText }>Sign Up</Text>

        <SignUpForm navigation={ navigation } />
    </View>
);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 20,
        width: "100%",
        alignItems: "center",
        backgroundColor: "white"
    },
    headerText: {
        fontSize: 24,
        marginBottom: 24,
        color: "#222",
        fontWeight: "bold"
    }
});