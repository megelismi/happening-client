import React, { Component } from 'react';
import { connect } from "react-redux";

import fetcher, {RequestValidationException} from '../../../handlers/fetcher';

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

import { setUser } from "../../../actions/users";

import { FORM_ERRORS } from "../../../constants/form";

import styles from '../../../screens/Auth/authStyles';

class SignUpForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            phone:     '',
            password:  '',
            firstName: '',
            lastName:  ''
        };

        this.signUp        = this.signUp.bind(this);
        this.handleChange  = this.handleChange.bind(this);
        this.handleFail    = this.handleFail.bind(this);
        this.handleSuccess = this.handleSuccess.bind(this);
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
            'phone',
            'firstName',
            'lastName'
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

    signUp(context) {
        if (this.formIsValid(context)) {
            !_.isEmpty(context.errors) && context.clearErrors();

            context.setSubmitting();

            fetcher.post('http://127.0.0.1:3000/user/signUp', {
                phone:     this.state.phone,
                password:  this.state.password,
                firstName: this.state.firstName,
                lastName:  this.state.lastName
            }).then(response => {
                context.clearSubmitting();

                this.handleSuccess(response.user)

            })
            .catch(error => {
                context.clearSubmitting();

                this.handleFail(error, context);
            })
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
                            <FormLabel>First Name</FormLabel>
                            <FormInput
                                placeholder="First Name"
                                onChangeText={
                                    value => this.handleChange('firstName', value)
                                }
                            />
                            <FormValidationMessage>{ context.errors.firstName }</FormValidationMessage>

                            <FormLabel>Last Name</FormLabel>
                            <FormInput
                                placeholder="Last Name"
                                onChangeText={
                                    value => this.handleChange('lastName', value)
                                }
                            />
                            <FormValidationMessage>{ context.errors.lastName }</FormValidationMessage>

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
                                buttonStyle={{ styles.btn.outline }}
                                title="Sign Up"
                                onPress={ () => this.signUp(context) }
                            />

                            <Button
                                buttonStyle={{ styles.btn.link }}
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

const mapDispatchToProps = dispatch => {
    return {
        setUser: user => dispatch(setUser(user))
    }
};

export default connect(
    null,
    mapDispatchToProps
)(SignUpForm);

