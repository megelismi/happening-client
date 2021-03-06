import React, { Component } from 'react';
import { connect } from "react-redux";

import {StyleSheet, View} from "react-native";

import { setUser } from "../../actions/users";

import { onSignIn } from "../../auth";

import { validPhone } from "../../handlers/formValidation";

import { FORM_ERRORS } from "../../constants/form";

import _ from 'lodash';

import { FormContext, FormProvider } from './FormProvider';

import { RequestValidationException } from "../../handlers/fetcher";

import {
    Button,
    FormInput,
    FormValidationMessage,
    FormLabel
} from 'react-native-elements';
import fetcher from "../../handlers/fetcher";

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
        if (error instanceof RequestValidationException) {
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
                        <View style={ styles.signInForm }>
                            <FormLabel>Phone number</FormLabel>

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
                                placeholder="Password"
                                onChangeText={
                                    value => this.handleChange('password', value)
                                }
                            />

                            <FormValidationMessage>{ context.errors.password }</FormValidationMessage>

                            <Button
                                buttonStyle={ styles.signInButton }
                                title="Sign In"
                                onPress={ () => this.signIn(context) }
                            />
                        </View>
                    ) }
                </FormContext.Consumer>
            </FormProvider>
        );
    }
}

const styles = StyleSheet.create({
    signInForm: {
        flex: 1,
        width: "90%"
    },
    signInButton: {
        marginTop: 20,
        backgroundColor: "#3939F9"
    }
});

const mapDispatchToProps = dispatch => {
    return {
        setUser: user => dispatch(setUser(user))
    }
};

export default connect(
    null,
    mapDispatchToProps
)(SignInForm);

