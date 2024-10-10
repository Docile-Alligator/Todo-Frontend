const defaultState = {
    body: {
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
                list: {
                    incomplete: state.list.incomplete.map(todo => {
                        return todo.todoID === action.todoID ? { ...todo, name: action.name } : todo;
                    }),
                    all: state.list.all.map(todo => {
                        return todo.todoID === action.todoID ? { ...todo, name: action.name } : todo;
                    })
                }
            };
        case 'TODO/CLEAR-UPDATE-NAME-ALERTS':
            return {
                ...state,
                alerts: {
                    ...defaultState.alerts
                }
            };
        case 'TODO/UPDATE-COMPLETENESS':
            if (action.completed) {
                return {
                    ...state,
                    list: {
                        incomplete: state.list.incomplete.filter(todo => todo.todoID !== action.todoID),
                        all: state.list.all.map(todo => {
                            return todo.todoID === action.todoID ? { ...todo, completed: action.completed } : todo;
                        })
                    }
                };
            } else {
                let hasItem = false;
                for (const item of state.list.incomplete) {
                    if (item.todoID === action.todoID) {
                        hasItem = true;
                        item.completed = action.completed;
                        break;
                    }
                }

                return {
                    ...state,
                    list: {
                        all: state.list.all.map(todo => {
                            if (todo.todoID !== action.todoID) {
                                return todo;
                            }

                            let updated = { ...todo, completed: action.completed };
                            if (hasItem) {
                                return updated;
                            }

                            if (state.list.incomplete.length === 0) {
                                state.list.incomplete.push(updated);
                            } else {
                                for (const [i, v] of state.list.incomplete.entries()) {
                                    if (v.created.localeCompare(todo.created) === 1) {
                                        state.list.incomplete.splice(i, 0, updated);
                                        break;
                                    } else if (i === state.list.incomplete.length - 1) {
                                        state.list.incomplete.splice(i + 1, 0, updated);
                                        break;
                                    }
                                }
                            }
                            return updated;
                        }),
                        incomplete: state.list.incomplete
                    }
                };
            }
        case 'TODO/DELETE-TODO':
            return {
                ...state,
                list: {
                    incomplete: state.list.incomplete.filter(todo => todo.todoID !== action.todoID),
                    all: state.list.all.filter(todo => todo.todoID !== action.todoID),
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