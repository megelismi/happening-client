import React from 'react';

import { View } from 'react-native';

import { onSignUp } from "../../auth";

import SignUpForm from '../../components/Form/Authentication/SignUpForm';

export default ({ navigation }) => (
    <View style={{ paddingVertical: 20 }}>
        <SignUpForm navigation={ navigation } />
    </View>
);