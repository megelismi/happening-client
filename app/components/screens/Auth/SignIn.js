import React from "react";
import { View } from "react-native";

import { onSignIn } from "../../../auth";
import SignInForm from "../../specific/Form/Authentication/SignInForm";

export default ({ navigation }) => (
    <View style={{ paddingVertical: 20 }}>
        <SignInForm />
    </View>
);