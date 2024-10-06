// SIGN-IN/UPDATE-USERNAME
export const updateSignInUsername = ({username = ""}) => ({
    type: 'SIGN-IN/UPDATE-USERNAME',
    username
});

// SIGN-IN/UPDATE-PASSWORD
export const updateSignInPassword = ({password = ""}) => ({
    type: 'SIGN-IN/UPDATE-PASSWORD',
    password
});

// SIGN-IN/CLEAR
export const clearSignIn = () => ({
    type: 'SIGN-IN/CLEAR'
});

// SIGN-IN/ERROR
export const updateSignInError = ({error = ""}) => ({
    type: 'SIGN-IN/ERROR',
    error
});

// SIGN-IN/ERROR
export const updateSignInSuccess = ({success = ""}) => ({
    type: 'SIGN-IN/SUCCESS',
    success
});

// SIGN-IN/CLEAR-ALERTS
export const clearSignInAlerts = () => ({
    type: 'SIGN-IN/CLEAR-ALERTS'
});