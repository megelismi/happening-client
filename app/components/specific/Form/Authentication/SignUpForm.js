import React, { Component } from 'react';

import { ActivityIndicator } from 'react-native';

import {
    Button,
    Card,
    FormInput,
    FormLabel,
    FormValidationMessage
} from 'react-native-elements';

import _ from 'lodash';

import { onSignIn } from "../../../../auth";
import { validPhone } from "../../../../handlers/formValidation";

import { FORM_ERRORS } from "../../../../constants/form";

class SignUpForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            phone:      '',
            password:   '',
            firstName:  '',
            lastName:   '',
            errors:     {},
            submitting: false
        };

        this.signUp       = this.signUp.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    formIsValid() {
        let valid  = true;
        let errors = {};

        if (!validPhone(this.state.phone)) {
            valid = false;

            errors.phone = FORM_ERRORS.invalidPhone;
        }

        const missingErrors = this._getMissingErrors([
            'firstName',
            'lastName',
            'password',
            'phone'
        ]);

        if (!_.isEmpty(missingErrors)) {
            valid = false;

            errors = {
                ...errors,
                ...missingErrors
            };
        }

        !valid && this._setErrors(errors);

        return valid;
    }

    _getMissingErrors(fields) {
        let errors = {};

        fields.forEach(field => {
            if (this.state[field] === '') {
                errors[field] = FORM_ERRORS.required;
            }
        });

        return errors;
    }

    _setErrors(errors) {
        this.formInput.shake();

        this.setState({ errors });
    }

    _clearErrors() {
        this.setState({ errors: {} });
    }

    _setSubmitting() {
        this.setState({ submitting: true });
    }

    _clearSubmitting() {
        this.setState({ submitting: false });
    }

    signUp() {
        if (this.formIsValid()) {
            !_.isEmpty(this.state.errors) && this._clearErrors();

            this._setSubmitting();

            fetch('http://127.0.0.1:3000/user/signUp', {
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
            }).then(response => {
                this._clearSubmitting();

                if (response.status === 200) {
                    onSignIn().then(
                        () => this.props.navigation.navigate("SignedIn")
                    );
                }
            }).done();
        }
    }

    handleChange(name, value) {
        this.setState({ [name]: value })
    }

    render() {
        const { errors, submitting } = this.state;

        if (submitting) {
           return (
               <ActivityIndicator size="large" color="#0000ff" />
           );
        }

        return (
            <Card>
                <FormLabel>First Name</FormLabel>
                <FormInput
                    ref={ ref => this.formInput = ref }
                    placeholder="First name"
                    onChangeText={
                        value => this.handleChange('firstName', value)
                    }
                />
                <FormValidationMessage>{ errors.firstName }</FormValidationMessage>

                <FormLabel>Last Name</FormLabel>
                <FormInput
                    ref={ ref => this.formInput = ref }
                    placeholder="Last name"
                    onChangeText={
                        value => this.handleChange('lastName', value)
                    }
                />
                <FormValidationMessage>{ errors.lastName }</FormValidationMessage>

                <FormLabel>Phone</FormLabel>
                <FormInput
                    ref={ ref => this.formInput = ref }
                    placeholder="Phone number"
                    onChangeText={
                        value => this.handleChange('phone', value)
                    }
                />
                <FormValidationMessage>{ errors.phone }</FormValidationMessage>

                <FormLabel>Password</FormLabel>
                <FormInput
                    ref={ ref => this.formInput = ref }
                    secureTextEntry
                    placeholder="Password"
                    onChangeText={
                        value => this.handleChange('password', value)
                    }
                />
                <FormValidationMessage>{ errors.password }</FormValidationMessage>

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
                    onPress={ () => this.props.navigation.navigate("SignIn") }
                />
            </Card>
        );
    }
}

export default SignUpForm;
