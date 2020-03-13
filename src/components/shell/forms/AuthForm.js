/*
 * Copyright (c) 2020-present unTill Pro, Ltd.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import LoginSchema from 'schemas/LoginSchema';

import {
    Form,
    FormRow,
    TextInput,
    Link,
    Button,
    Label
} from 'base/components';

import {
    doAuth,
    hideAuthModal,
    showForgotModal
} from 'actions';

class AuthForm extends Component {

    closeForm() {
        this.props.hideAuthModal();
    }

    submitForm(values) {
        const { login, password } = values;

        this.props.doAuth(login, password);
    }

    forgotPassword() {
        this.props.showForgotModal();
    }

    render() {
        return (
            <div className="ushell-login-block-form">

                <Formik
                    initialValues={{ 
                        login: '', 
                        password: '' 
                    }}
                    
                    validationSchema={LoginSchema}

                    onSubmit={(values, { setSubmitting }) => {
                        this.submitForm(values);
                        setTimeout(() => {
                            setSubmitting(false);
                        }, 1000);
                    }}
                >
                    {
                        ({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            isSubmitting,
                        }) => (
                                <Form>
                                    <form onSubmit={handleSubmit}>
                                        <div className="ushell-auth-form-row">
                                            <div className="grid row-1 col-2 gap-24">
                                                <div className="cell">
                                                    <FormRow>
                                                        <Label
                                                            error={errors.login && touched.login && errors.login}
                                                            text="Username"
                                                        />

                                                        <TextInput 
                                                            error={errors.login && touched.login && errors.login}
                                                            value={values.login}
                                                            type="text"
                                                            placeholder="Username"
                                                            name="login"
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}

                                                        />
                                                    </FormRow>
                                                </div>
                                                <div className="cell">
                                                    <FormRow>
                                                        <Label
                                                            error={errors.login && touched.login && errors.login}
                                                            text="Password"
                                                            right={
                                                                <Link 
                                                                    href="#forgot"
                                                                    text="Forgot password?"
                                                                    onClick={this.forgotPassword.bind(this)}
                                                                    className="forgot_link"
                                                                />
                                                            }
                                                        />
                                                        <TextInput 
                                                            error={errors.password && touched.password && errors.password}
                                                            value={values.password}
                                                            label="Username"
                                                            type="password"
                                                            name="password"
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            placeholder="Password"
                                                        />
                                                    </FormRow>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid row-1 col-1">
                                            <div className="cell align-right">
                                                <Button 
                                                    text="Close"
                                                    onClick={this.closeForm.bind(this)}
                                                    title="Close"
                                                />

                                                <Button 
                                                    primary
                                                    text="Sign in"
                                                    onClick={handleSubmit}
                                                    title="Sign in"
                                                    disabled={isSubmitting}
                                                />
                                            </div>
                                        </div>
                                    </form>
                                </Form>
                            )
                    }
                </Formik>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

export default connect(mapStateToProps, {
     doAuth, 
     hideAuthModal,
     showForgotModal
})(AuthForm);