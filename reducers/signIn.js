const defaultState = {
    body: {
        username: "",
        password: ""
    },
    alerts: {
        error: "",
        success: ""
    }
};


export default (state = defaultState, action) => {
    switch(action.type) {
        case 'SIGN-IN/UPDATE-USERNAME':
            return {
                ...state,
                body: {
                    ...state.body,
                    username: action.username
                }
            };
        case 'SIGN-IN/UPDATE-PASSWORD':
            return {
                ...state,
                body: {
                    ...state.body,
                    password: action.password
                }
            };
        case 'SIGN-IN/ERROR':
            return {
                ...state,
                alerts: {
                    ...defaultState.alerts,
                    error: action.error
                }
            };
        case 'SIGN-IN/SUCCESS':
            return {
                ...state,
                alerts: {
                    ...defaultState.alerts,
                    success: action.success
                }
            };
        case 'SIGN-IN/CLEAR-ALERTS':
            return {
                ...state,
                alerts: {
                    ...defaultState.alerts
                }
            };
        case 'SIGN-IN/CLEAR':
            return {
                ...defaultState
            };
        default:
            return state;
    }
};