import React from "react";
import { View, Text, StyleSheet } from "react-native";

import SignInForm from "../../components/Form/SignInForm";

export default ({ navigation }) => (
    <View style={ styles.container }>
        <Text style={ styles.headerText }>Welcome Back</Text>

        <SignInForm navigation={ navigation } />
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