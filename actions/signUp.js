// SIGN-UP/UPDATE-USERNAME
export const updateSignUpUsername = ({username = ""}) => ({
    type: 'SIGN-UP/UPDATE-USERNAME',
    username
});

// SIGN-UP/UPDATE-PASSWORD
export const updateSignUpPassword = ({password = ""}) => ({
    type: 'SIGN-UP/UPDATE-PASSWORD',
    password
});

// SIGN-UP/UPDATE-CONFIRM-PASSWORD
export const updateSignUpConfirmPassword = ({confirmPassword = ""}) => ({
    type: 'SIGN-UP/UPDATE-CONFIRM-PASSWORD',
    confirmPassword
});

// SIGN-UP/ERROR
export const updateSignUpError = ({error = ""}) => ({
    type: 'SIGN-UP/ERROR',
    error
});

// SIGN-UP/SUCCESS
export const updateSignUpSuccess = ({success = ""}) => ({
    type: 'SIGN-UP/SUCCESS',
    success
});

// SIGN-UP/CLEAR-ALERTS
export const clearSignUpAlerts = () => ({
    type: 'SIGN-UP/CLEAR-ALERTS'
});

// SIGN-UP/CLEAR
export const clearSignUp = () => ({
    type: 'SIGN-UP/CLEAR'
});