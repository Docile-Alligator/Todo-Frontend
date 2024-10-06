const defaultState = {
    body: {
        name: ""
    },
    alerts: {
        error: "",
        success: ""
    }
};


export default (state = defaultState, action) => {
    switch(action.type) {
        case 'TODO/UPDATE-NAME':
            return {
                ...state,
                body: {
                    ...state.body,
                    name: action.name
                }
            };
        case 'TODO/ERROR':
            return {
                ...state,
                alerts: {
                    ...defaultState.alerts,
                    error: action.error
                }
            };
        case 'TODO/SUCCESS':
            return {
                ...state,
                alerts: {
                    ...defaultState.alerts,
                    success: action.success
                }
            };
        case 'TODO/CLEAR-ALERTS':
            return {
                ...state,
                alerts: {
                    ...defaultState.alerts
                }
            };
        case 'TODO/CLEAR-BODY':
            return {
                ...state,
                body: {
                    ...defaultState.body
                }
            };
        case 'TODO/CLEAR':
            return {
                ...defaultState
            };
        default:
            return state;
    }
};