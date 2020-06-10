import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import LoginForm from '../../components/LoginForm';
import SignupForm from '../../components/SignupForm';
import Typography from '@material-ui/core/Typography';
import SocialButton from '../../components/SocialButton';
import { Formik } from 'formik';
import * as Yup from 'yup';

const loginSchema = Yup.object({
    loginEmail: Yup.string("Enter your email")
        .email("Enter a valid email")
        .required("Email is required"),
    loginPassword: Yup.string("")
        .min(6, "Password must contain at least 6 characters")
        .required("Enter your password"),
})

const signupSchema = Yup.object({
    firstName: Yup.string("Enter your first name")
        .required("First name is required"),
    lastName: Yup.string("Enter your last name")
        .required("Last name is required"),
    phone: Yup.string("Enter your phone number")
        .required("Phone is required"),
    email: Yup.string("Enter your email")
        .email("Enter a valid email")
        .required("Email is required"),
    password: Yup.string("")
        .min(6, "Password must contain at least 6 characters")
        .required("Enter your password"),
})

const loginInit = { loginEmail: "", loginPassword: "" }

const signupInit = { firstName: "", lastName: "", email: "", password: "", phone: "" }

const Login = () => {

    let [isLoginForm, setIsLoginForm] = useState(true);

    const renderSignupLogin = () => {
        if (isLoginForm) {
            return <Formik
                validationSchema={loginSchema}
                initialValues={loginInit}
                render={props => <LoginForm changeRoute={changeRoute} {...props} />}
            />
        } else {
            return <Formik
                validationSchema={signupSchema}
                initialValues={signupInit}
                render={props => <SignupForm changeRoute={changeRoute} {...props} />}
            />
        }
    }

    const changeRoute = () => {
        setIsLoginForm(!isLoginForm);
    }

    return (
        <Grid container className="login-container">
            <Grid className="login-image-container" item xs={6} >
                <img src="/static/assets/loginImage.png" />
            </Grid>
            <Grid className="form-wrapper" item xs={6}>
                <Typography className="title" variant="h2">Welcome to Snappost</Typography>
                <br />
                {renderSignupLogin()}
                <br />

                <div className="form-container">
                    <Typography className="dashline" variant="subtitle1"><span>or</span></Typography>
                </div>

                <br />

                <div className="form-container">
                    <SocialButton />
                </div>
            </Grid>
        </Grid>
    )
}

export default Login;