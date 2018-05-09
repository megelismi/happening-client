import React, { Component } from 'react';

import profileStyles from './profileStyles';

import {View} from 'react-native';

export default class Login extends Component {
    render() {
        return (
                <View style={profileStyles.container}>
                    <Text style={profileStyles.text}>Profile</Text>
                </View>
        );
    }
}

