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

class SignUp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            phone:     '',
            password:  '',
            firstName: '',
            lastName:  ''
        };

        this.signUp       = this.signUpbind(this);
        this.setPhone     = this.setPhone.bind(this);
        this.setPassword  = this.setPassword.bind(this);
        this.setFirstName = this.setFirstName.bind(this);
        this.setLastName  = this.setLastName.bind(this);
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

    signUp() {
        alert (this.state.firstName + this.state.lastName + this.state.phone + this.state.password);

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

    setFirstName(firstName) {
        this.setState({firstName});
    }

    setLastName(lastName) {
        this.setState({lastName});
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
                        placeholder="First Name"
                        onChangeText={this.setFirstName}
                        underlineColorAndriod="transparent"
                    />

                    <TextInput
                        style={authStyles.textInput}
                        placeholder="Last Name"
                        onChangeText={this.setLastName}
                        underlineColorAndriod="transparent"
                    />

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

export default SignUp;