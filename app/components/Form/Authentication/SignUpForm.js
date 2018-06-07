import React, { Component } from 'react';

import fetcher from '../../../handlers/fetcher';

import {
    Button,
    Card,
    FormInput,
    FormLabel,
    FormValidationMessage
} from 'react-native-elements';

import { FormContext, FormProvider } from '../FormProvider';

import _ from 'lodash';

import { onSignIn } from "../../../auth";
import { validPhone } from "../../../handlers/formValidation";

import { FORM_ERRORS } from "../../../constants/form";

class SignUpForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            phone:    '',
            password: ''
        };

        this.signUp       = this.signUp.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    formIsValid(context) {
        let valid  = true;
        let errors = {};

        if (!validPhone(this.state.phone)) {
            valid = false;

            errors.phone = FORM_ERRORS.invalidPhone;
        }

        const missingErrors = context.getMissingErrors([
            'password',
            'phone'
        ], this.state);

        if (!_.isEmpty(missingErrors)) {
            valid = false;

            errors = {
                ...errors,
                ...missingErrors
            };
        }

        !valid && context.setErrors(errors);

        return valid;
    }

    signUp(context) {
        if (this.formIsValid(context)) {
            !_.isEmpty(context.errors) && context.clearErrors();

            context.setSubmitting();

            fetcher.post('http://127.0.0.1:3000/user/signUp', {
                phone:    this.state.phone,
                password: this.state.password
            }).then(response => {
                context.clearSubmitting();

                console.log('response', response)
            });

            // fetch('http://127.0.0.1:3000/user/signUp', {
            //     method: 'POST',
            //     headers: {
            //         'Accept': 'application/json',
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify({
            //         phone:    this.state.phone,
            //         password: this.state.password
            //     })
            // }).then(response => {
            //     if (!response.ok) {
            //         response.json().then(response => {
            //             if (response.errors) {
            //                 if (response.errors.app) {
            //                     console.log('set app errors');
            //                 }
            //                 else {
            //                     context.setErrors(response.errors);
            //
            //                     context.clearSubmitting();
            //                 }
            //             }
            //         });
            //
            //         throw new Error(response.statusText);
            //     }
            //
            //     return response.json();
            // }).then(jsonResponse => {
            //     context.clearSubmitting();
            //
            //     onSignIn().then(
            //         () => {
            //             this.props.navigation.navigate("SignedIn")
            //         }
            //     );
            // }).catch(err => console.log('error', err));
        }
    }

    handleChange(name, value) {
        this.setState({ [name]: value })
    }

    render() {
        return (
            <FormProvider>
                <FormContext.Consumer>
                    { context => (
                        <Card>
                            <FormLabel>Phone</FormLabel>
                            <FormInput
                                placeholder="Phone number"
                                onChangeText={
                                    value => this.handleChange('phone', value)
                                }
                            />
                            <FormValidationMessage>{ context.errors.phone }</FormValidationMessage>

                            <FormLabel>Password</FormLabel>
                            <FormInput
                                secureTextEntry
                                placeholder="Password"
                                onChangeText={
                                    value => this.handleChange('password', value)
                                }
                            />
                            <FormValidationMessage>{ context.errors.password }</FormValidationMessage>

                            <Button
                                buttonStyle={{ marginTop: 20 }}
                                backgroundColor="#03A9F4"
                                title="Sign Up"
                                onPress={ () => this.signUp(context) }
                            />

                            <Button
                                buttonStyle={{ marginTop: 20 }}
                                backgroundColor="transparent"
                                textStyle={{ color: "#bcbec1" }}
                                title="Sign In"
                                onPress={ () => this.props.navigation.navigate("SignIn") }
                            />
                        </Card>
                    ) }
                </FormContext.Consumer>
            </FormProvider>
        )
    }
}

export default SignUpForm;
