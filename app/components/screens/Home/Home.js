import React, { Component } from 'react';

import profileStyles from '../Profile/profileStyles';

import {View, Text} from 'react-native';

export default class Home extends Component {
    render() {
        return (
            <View style={profileStyles.container}>
                <Text style={profileStyles.text}>Home</Text>
            </View>
        );
    }
}

