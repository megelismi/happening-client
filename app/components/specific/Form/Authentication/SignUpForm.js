import React, { Component } from 'react';

import {
    Button,
    Card,
    FormInput,
    FormLabel
} from 'react-native-elements';

import { onSignUp } from "../../../../auth";

class SignUpForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            phone:     '',
            password:  '',
            firstName: '',
            lastName:  ''
        };

        this.signUp       = this.signUp.bind(this);
        this.setPhone     = this.setPhone.bind(this);
        this.setPassword  = this.setPassword.bind(this);
        this.setFirstName = this.setFirstName.bind(this);
        this.setLastName  = this.setLastName.bind(this);
    }

    signUp() {
        fetch('http://127.0.0.1:3000/user/create', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                phone:     this.state.phone,
                password:  this.state.password,
                firstName: this.state.firstName,
                lastName:  this.state.lastName
            })
        }).then(
            response => console.log('response!', response)
        ).done();
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

    setPhone(phone) {
        this.setState({phone});
    }

    render() {
        return (
            <Card>
                <FormLabel>First Name</FormLabel>
                <FormInput
                    placeholder="First name"
                    onChangeText={ this.setFirstName }
                />

                <FormLabel>Last Name</FormLabel>
                <FormInput
                    placeholder="Last name"
                    onChangeText={ this.setLastName }
                />

                <FormLabel>Phone</FormLabel>
                <FormInput
                    placeholder="Phone number"
                    onChangeText={ this.setPhone }
                />

                <FormLabel>Password</FormLabel>
                <FormInput
                    secureTextEntry
                    placeholder="Password"
                    onChangeText={ this.setPassword }
                />

                <Button
                    buttonStyle={{ marginTop: 20 }}
                    backgroundColor="#03A9F4"
                    title="Sign Up"
                    onPress={ this.signUp }
                />

                <Button
                    buttonStyle={{ marginTop: 20 }}
                    backgroundColor="transparent"
                    textStyle={{ color: "#bcbec1" }}
                    title="Sign In"
                    onPress={() => this.props.navigation.navigate("SignIn")}
                />
            </Card>
        );
    }
}

export default SignUpForm;