import React, { Component } from 'react';

import { FORM_ERRORS } from "../../constants/form";

import { ActivityIndicator } from 'react-native';

export const FormContext = React.createContext();

export class FormProvider extends Component {
    constructor(props) {
        super(props);

        this.state = {
            errors:     {},
            submitting: false
        };

        this.setErrors       = this.setErrors.bind(this);
        this.clearErrors     = this.clearErrors.bind(this);
        this.setSubmitting   = this.setSubmitting.bind(this);
        this.clearSubmitting = this.clearSubmitting.bind(this);
    }

    getMissingErrors(fields, state) {
        let errors = {};

        fields.forEach(field => {
            if (state[field] === '') {
                errors[field] = FORM_ERRORS.required;
            }
        });

        return errors;
    }

    setErrors(errors) {
        console.log('setting errors!', errors);
        this.setState({ errors });
    }

    clearErrors() {
        this.setState({ errors: {} });
    }

    setSubmitting() {
        this.setState({ submitting: true });
    }

    clearSubmitting() {
        this.setState({ submitting: false });
    }

    _getContext() {
        return {
            errors:           this.state.errors,
            submitting:       this.state.submitting,
            getMissingErrors: this.getMissingErrors,
            setErrors:        this.setErrors,
            clearErrors:      this.clearErrors,
            setSubmitting:    this.setSubmitting,
            clearSubmitting:  this.clearSubmitting
        };
    }

    render() {
        return (
            <FormContext.Provider value={ this._getContext() }>
                { this.state.submitting ?
                    <ActivityIndicator size="large" color="#0000ff" />
                : this.props.children }
            </FormContext.Provider>
        )
    }
}