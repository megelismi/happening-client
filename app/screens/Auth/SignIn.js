import React from "react";
import { View } from "react-native";

import SignInForm from "../../components/Form/Authentication/SignInForm";

export default ({ navigation }) => (
    <View style={{ paddingVertical: 20 }}>
        <SignInForm navigation={ navigation } />
    </View>
);