const defaultState = {
    body: {
        todoID: "",
        name: ""
    },
    list: {
        incomplete: [],
        all: []
    },
    alerts: {
        error: "",
        success: ""
    }
};


export default (state = defaultState, action) => {
    switch(action.type) {
        case 'TODO/INCOMPLETE-LIST':
            return {
                ...state,
                list: {
                    incomplete: action.incomplete,
                    all: state.list.all
                }
            };
        case 'TODO/ALL-LIST':
            return {
                ...state,
                list: {
                    incomplete: state.list.incomplete,
                    all: action.all,
                }
            };
        case 'TODO/UPDATE-NAME':
            return {
                ...state,
                body: {
                    ...state.body,
                    todoID: action.todoID,
                    name: action.name
                }
            };
        case 'TODO/CLEAR-UPDATE-NAME-ALERTS':
            return {
                ...state,
                alerts: {
                    ...defaultState.alerts
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