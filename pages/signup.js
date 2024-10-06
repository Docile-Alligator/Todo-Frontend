import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styled from 'styled-components';
import { Colours, Typography } from '../definitions';
import { clearSignUp, clearSignUpAlerts, updateSignUpConfirmPassword, updateSignUpError, updateSignUpPassword, updateSignUpSuccess, updateSignUpUsername } from '../actions/signUp';
import apiFetch from '../functions/apiFetch';
import Form from '../components/Form';
import InputField from '../components/InputField';
import Button from '../components/Button';
import PageLayout from '../components/PageLayout';
import Alert from '../components/Alert';


const SignUp = () => {
    const [isSigningUp, setIsSigningUp] = useState(false);
    const signUpState = useSelector((state) => state.signUp);
    const dispatch = useDispatch();
    const router = useRouter();

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!signUpState.body.username) {
            dispatch(updateSignUpError({ error: "You must choose a username" }));
        }
        else if (signUpState.body.password.length < 6) {
            dispatch(updateSignUpError({ error: "Your password must be at least 6 characters long" }));
        }
        else if (signUpState.body.confirmPassword !== signUpState.body.password) {
            dispatch(updateSignUpError({ error: "The passwords must match!" }));
        }
        else {
            setIsSigningUp(true);
            dispatch(clearSignUpAlerts());
            let response = await apiFetch("/user", {
                body: {
                    ...signUpState.body
                }, 
                method: "POST",
                includeCredentials: false
            });
            
            if (response.status === 201) {
                dispatch(clearSignUp());
                dispatch(updateSignUpSuccess({ sucess: "Account creation successful, redirecting..." }));

                router.replace("/");
            }
            else {
                setIsSigningUp(false);
                dispatch(updateSignUpError({ error: response.body.error }));
            }
        }
    };

    return (
        <PageLayout title="Sign up">
            <Container>
                <div className="content">
                    <h1>Sign up</h1>
                    <Alert message={signUpState.alerts.error} onClose={() => dispatch(clearSignUpAlerts())} />
                    <Alert message={signUpState.alerts.success} onClose={() => dispatch(clearSignUpAlerts())} variant="success" />
                    <Form onSubmit={handleSubmit}>
                        <InputField className="input" type="text" placeholder="Username" required value={signUpState.body.username} onChange={e => dispatch(updateSignUpUsername({username: e.target.value}))} />
                        <InputField className="input" type="password" placeholder="Password" required value={signUpState.body.password} onChange={e => dispatch(updateSignUpPassword({password: e.target.value}))} />
                        <InputField className="input" type="password" placeholder="Confirm password" required value={signUpState.body.confirmPassword} onChange={e => dispatch(updateSignUpConfirmPassword({confirmPassword: e.target.value}))} />
                        <Button className="loginButton" type="submit" text="Sign up" size="large" variant="primary" disabled={isSigningUp} isFullWidth />
                    </Form>
                </div>
                <Footer>
                    <p>Already have an account? <Link className="highlightedLink" href="/signin">Sign in</Link></p>
                </Footer>
            </Container>
        </PageLayout>
    );
};

export default SignUp;

const Container = styled.div`
    width: 100%;

    h1 {
        color: ${Colours.BLACK};
        font-size: ${Typography.HEADING_SIZES.M};
        font-weight: ${Typography.WEIGHTS.LIGHT};
        line-height: 2.625rem;
        margin-bottom: 2rem;
        margin-top: 1rem;
    }

    .input {
        margin-bottom: 0.5rem;
    }

    .loginButton {
        margin-bottom: 2.0625rem;
    }

    .signUpOptions {
        margin-bottom: 2rem;

        .signUpOption {
            margin-bottom: 0.5rem;
        }
    }
`;

const Footer = styled.div`
    padding: 1.5rem 0rem;
    text-align: center;

    p {
        font-size: ${Typography.BODY_SIZES.L};
        font-weight: ${Typography.WEIGHTS.MEDIUM};

        .highlightedLink {
            color: ${Colours.ACCENT_1};
        }
    }
`;