import React from 'react';

import { View } from 'react-native';

import { onSignUp } from "../../auth";

import SignUpForm from '../../components/Form/Authentication/SignUpForm';

import styles from './authStyles';

export default ({ navigation }) => (
    <View style={ styles.wrapper }>
        <SignUpForm navigation={ navigation } />
    </View>
);