import React, { Component } from 'react';

import authStyles from './authStyles';

import {
    Text,
    View,
    TextInput,
    KeyboardAvoidingView,
    TouchableOpacity,
    AsyncStorage
} from 'react-native';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            phone:    '',
            password: ''
        };

        this.login       = this.login.bind(this);
        this.setPhone    = this.setPhone.bind(this);
        this.setPassword = this.setPassword.bind(this);
    }

    login() {
        alert (this.state.phone + this.state.password);

        fetch('http://193.5454.25.2:3000/users', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: this.state.phone,
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
        this.setState({password});
    }

    setPhone(username) {
        this.setState({username});
    }

    render() {
        return (
            <KeyboardAvoidingView
                behavior='padding'
                style={authStyles.wrapper}
            >
                <View style={authStyles.container}>
                    <Text style={authStyles.header}> - LOGIN - </Text>

                    <TextInput
                        style={authStyles.textInput}
                        placeholder="Phone"
                        onChangeText={this.setPhone}
                        underlineColorAndriod="transparent"
                    />

                    <TextInput
                        style={authStyles.textInput}
                        placeholder="Password"
                        onChangeText={this.setPassword}
                        underlineColorAndriod="transparent"
                    />

                    <TouchableOpacity
                        style={authStyles.btn}
                        onPress={this.login}
                    >
                        <Text>Log in</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        );
    }
}

export default Login;

