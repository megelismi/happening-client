import React, { Component } from 'react';

import profileStyles from './profileStyles';

import {View, Text} from 'react-native';

export default class Profile extends Component {
    render() {
        return (
            <View style={profileStyles.container}>
                <Text style={profileStyles.text}>Profile</Text>
            </View>
        );
    }
}

