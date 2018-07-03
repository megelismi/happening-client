import React from "react";
import { View } from "react-native";

import styles from './authStyles';

import SignInForm from "../../components/Form/Authentication/SignInForm";

export default ({ navigation }) => (
    <View style={ styles.wrapper }>
        <SignInForm navigation={ navigation } />
    </View>
);