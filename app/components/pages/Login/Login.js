import React, { Component } from 'react';

import loginStyles from './loginStyles';

import {
    Text,
    View,
    TextInput,
    KeyboardAvoidingView,
    TouchableOpacity,
    AsyncStorage
} from 'react-native';

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: ''
        };

        this.login       = this.login.bind(this);
        this.setUsername = this.setUsername.bind(this);
        this.setPassword = this.setPassword.bind(this);
    }

    componentDidMount() {
        this._loadInitialState().done();
    }

    _loadInitialState = async () => {
        const value = await AsyncStorage.getItem('user');

        if (value !== null) {
            this.props.navigation.navigation('Profile');
        }
    };

    login() {
        alert (this.state.username + this.state.password);

        fetch('http://193.5454.25.2:3000/users', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
            })
        }).then(
            response => response.json()
        ).then(jsonRes => {
            if (jsonRes.success === true) {
                AsyncStorage.setItem('user', res.user);

                this.props.navigation.navigate('Profile');
            } else {
                alert(res.message);
            }
        }).done();
    }

    setPassword(password) {
        this.setState({ password });
    }

    setUsername(username) {
        this.setState({ username });
    }

    render() {
        return (
            <KeyboardAvoidingView
                behavior='padding'
                style={loginStyles.wrapper}
            >
                <View style={loginStyles.container}>
                    <Text style={loginStyles.header}> - LOGIN - </Text>

                    <TextInput
                        style={loginStyles.textInput}
                        placeholder="Username"
                        onChangeText={ this.setUsername }
                        underlineColorAndriod="transparent"
                    />

                    <TextInput
                        style={loginStyles.textInput}
                        placeholder="Password"
                        onChangeText={ this.setPassword }
                        underlineColorAndriod="transparent"
                    />

                    <TouchableOpacity
                        style={loginStyles.btn}
                        onPress={this.login}
                    >
                        <Text>Log in</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        );
    }
}

