import React from "react";
import { View } from "react-native";
import { Card, Button, FormLabel, FormInput } from "react-native-elements";
import { onSignIn } from "../../../auth";

export default ({ navigation }) => (
    <View style={{ paddingVertical: 20 }}>
        <Card>
            <FormLabel>Phone</FormLabel>
            <FormInput placeholder="Phone number" />
            <FormLabel>Password</FormLabel>
            <FormInput secureTextEntry placeholder="Password..." />

            <Button
                buttonStyle={{ marginTop: 20 }}
                backgroundColor="#03A9F4"
                title="Sign In"
                onPress={() => {
                    onSignIn().then(() => navigation.navigate("SignedIn"));
                }}
            />
        </Card>
    </View>
);