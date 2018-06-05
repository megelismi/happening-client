import React, { Component } from 'react';

import { onSignIn } from "../../../../auth";
import { validPhone } from "../../../../handlers/formValidation";
import { FORM_ERRORS } from "../../../../constants/form";

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

    _setSubmitting() {
        this.setState({ submitting: true });
    }

    _clearSubmitting() {
        this.setState({ submitting: false })
    }

    signIn() {
        if (this.formIsValid()) {
            this._setSubmitting();

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
                this._clearSubmitting();

                if (response.status === 200) {
                    onSignIn().then(
                        () => navigation.navigate("SignedIn")
                    );
                }

                if (response.status === 500) {
                    console.log('error!', error);
                }
            }).done();
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
                <FormInput placeholder="Phone number" />
                <FormValidationMessage>{ errors.phone }</FormValidationMessage>

                <FormLabel>Password</FormLabel>
                <FormInput secureTextEntry placeholder="Password..." />
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

