// TODO/UPDATE-NAME
export const updateTodoName = ({name = ""}) => ({
    type: 'TODO/UPDATE-NAME',
    name
});

// TODO/UPDATE-NAME-ERROR
export const updateTodoNameError = ({error = ""}) => ({
    type: 'TODO/ERROR',
    error
});

// TODO/CLEAR-UPDATE-NAME-ALERTS
export const clearUpdateTodoNameALerts = () => ({
    type: 'TODO/CLEAR-ALERTS'
});

// TODO/CLEAR
export const clearTodo = () => ({
    type: 'TODO/CLEAR'
});

// TODO/CLEAR-BODY
export const clearTodoBody = () => ({
    type: 'TODO/CLEAR-BODY'
});

// TODO/ERROR
export const updateTodoError = ({error = ""}) => ({
    type: 'TODO/ERROR',
    error
});

// TODO/ERROR
export const updateTodoSuccess = ({success = ""}) => ({
    type: 'TODO/SUCCESS',
    success
});

// TODO/CLEAR-ALERTS
export const clearTodoAlerts = () => ({
    type: 'TODO/CLEAR-ALERTS'
});