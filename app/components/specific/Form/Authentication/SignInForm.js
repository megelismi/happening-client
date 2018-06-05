import React, { Component } from 'react';

import { onSignIn } from "../../../../auth";
import { validPhone } from "../../../../handlers/formValidation";
import { FORM_ERRORS } from "../../../../constants/form";

import _ from 'lodash';

import { ActivityIndicator } from 'react-native';

import {
    Button,
    Card,
    FormInput,
    FormLabel,
    FormValidationMessage
} from 'react-native-elements';

class SignInForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            phone:      '',
            password:   '',
            errors:     {},
            submitting: false
        };

        this.signIn       = this.signIn.bind(this);
        this.formIsValid  = this.formIsValid.bind(this);
        this.handleChange = this.handleChange.bind(this);
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

    formIsValid() {
        let valid  = true;
        let errors = {};

        if (!validPhone(this.state.phone)) {
            valid = false;

            errors.phone = FORM_ERRORS.invalidPhone;
        }

        const missingErrors = this._getMissingErrors([
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
        this.setState({ submitting: false })
    }

    signIn() {
        if (this.formIsValid()) {
            this._setSubmitting();

            this._clearErrors();

            fetch('http://127.0.0.1:3000/user/signIn', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    phone:    this.state.phone,
                    password: this.state.password
                })
            }).then(response => {
                if (!response.ok) {
                    throw new Error(response);
                }

                return response.json();
            }).then(jsonResponse => {
                console.log('jsonResponse', jsonResponse);

                this._clearSubmitting();

                onSignIn().then(
                    () => {
                        this.props.navigation.navigate("SignedIn")
                    }
                );
            })
            .catch(err => err.json().then(error => console.log('error!', error)))
        }
    }

    handleChange(name, value) {
        this.setState({ [name]: value });
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
                <FormLabel>Phone</FormLabel>
                <FormInput
                    ref={ ref => this.formInput = ref }
                    placeholder="Phone number"
                    onChangeText={ value => this.handleChange('phone', value) }
                />
                <FormValidationMessage>{ errors.phone }</FormValidationMessage>

                <FormLabel>Password</FormLabel>
                <FormInput
                    ref={ ref => this.formInput = ref }
                    secureTextEntry
                    placeholder="Password..."
                    onChangeText={ value => this.handleChange('password', value) }
                />
                <FormValidationMessage>{ errors.password }</FormValidationMessage>

                <Button
                    buttonStyle={{ marginTop: 20 }}
                    backgroundColor="#03A9F4"
                    title="Sign In"
                    onPress={ this.signIn }
                />
            </Card>
        );
    }
}

export default SignInForm;

