import React, { Component } from 'react';
import { connect } from "react-redux";

import { setUser } from "../../../actions/users";

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

        this.signIn        = this.signIn.bind(this);
        this.formIsValid   = this.formIsValid.bind(this);
        this.handleChange  = this.handleChange.bind(this);
        this.handleSuccess = this.handleSuccess.bind(this);
        this.handleFail    = this.handleFail.bind(this);
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

    handleSuccess(user) {
        onSignIn().then(
            () => {
                this.props.setUser(user);

                this.props.navigation.navigate("SignedIn")
            }
        );
    }

    handleFail(error, context) {
        console.log('error!', error)
        if (error instanceof RequestValidationException) {
            console.log('here!')
            error.resolve().then(e => e.errors && context.setErrors(e.errors));
        }
        else {
            throw error;
        }
    }

    signIn(context) {
        if (this.formIsValid(context)) {
            context.setSubmitting();

            context.clearErrors();

            fetcher.post('http://127.0.0.1:3000/user/signIn', {
                phone:    this.state.phone,
                password: this.state.password
            }).then(response => {
                context.clearSubmitting();

                this.handleSuccess(response.user);
            }).catch(error => {
                context.clearSubmitting();

                this.handleFail(error, context);
            });
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

const mapDispatchToProps = dispatch => {
    return {
        setUser: user => dispatch(setUser(user))
    }
};

export default connect(
    null,
    mapDispatchToProps
)(SignInForm);

