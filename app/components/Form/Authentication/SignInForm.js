import React, { Component } from 'react';

import { onSignIn } from "../../../auth";
import { validPhone } from "../../../handlers/formValidation";
import { FORM_ERRORS } from "../../../constants/form";

import _ from 'lodash';

import { FormContext, FormProvider } from '../FormProvider';

import { RequestValidationException } from "../../../handlers/fetcher";

import {
    Button,
    Card,
    FormInput,
    FormLabel,
    FormValidationMessage
} from 'react-native-elements';
import fetcher from "../../../handlers/fetcher";

class SignInForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            phone:    '',
            password: ''
        };

        this.signIn       = this.signIn.bind(this);
        this.formIsValid  = this.formIsValid.bind(this);
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

    _handleSignInSuccess() {
        //call this.props.setUser();
        //navigate to home page
    }

    _handleSignInFail(error, context) {
        if (error instanceof RequestValidationException) {
            error.resolve().then(e => console.log('e!!', e));

            //error.resolve().then( console.log('requestValidationError', error) );
        }
        else {
            throw error;
        }
    }

    signIn(context) {
        if (this.formIsValid(context)) {
            context.setSubmitting();

            context.clearErrors();

            fetcher.post('http://127.0.0.1:3000/user/signUp', {
                phone:    this.state.phone,
                password: this.state.password
            }).then(response => {
                context.clearSubmitting();

                this._handleSignInFail(response.user);
            }).catch(error => {
                context.clearSubmitting();

                this._handleSignInFail(error);
            });

            // fetch('http://127.0.0.1:3000/user/signIn', {
            //     method: 'POST',
            //     headers: {
            //         'Accept':       'application/json',
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
            //     console.log('jsonResponse', jsonResponse);
            //
            //     context.clearSubmitting();
            //
            //     onSignIn().then(
            //         () => {
            //             this.props.navigation.navigate("SignedIn")
            //         }
            //     );
            // })
            // .catch(err => console.log('error', err))
        }
    }

    handleChange(name, value) {
        this.setState({ [name]: value });
    }

    render() {
        return (
            <FormProvider>
                <FormContext.Consumer>
                    { context => (
                        <Card>
                            <FormLabel>Phone</FormLabel>
                            <FormInput
                                value={ this.state.phone }
                                placeholder="Phone number"
                                onChangeText={
                                    value => this.handleChange('phone', value)
                                }
                            />
                            <FormValidationMessage>{ context.errors.phone }</FormValidationMessage>

                            <FormLabel>Password</FormLabel>
                            <FormInput
                                value={ this.state.password }
                                secureTextEntry
                                placeholder="Password..."
                                onChangeText={
                                    value => this.handleChange('password', value)
                                }
                            />
                            <FormValidationMessage>{ context.errors.password }</FormValidationMessage>

                            <Button
                                buttonStyle={{ marginTop: 20 }}
                                backgroundColor="#03A9F4"
                                title="Sign In"
                                onPress={ () => this.signIn(context) }
                            />
                        </Card>
                    ) }
                </FormContext.Consumer>
            </FormProvider>
        );
    }
}

export default SignInForm;

