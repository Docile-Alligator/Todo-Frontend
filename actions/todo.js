// TODO/INCOMPLETE-LIST
export const setIncompleteList = ({incomplete = []}) => ({
    type: 'TODO/INCOMPLETE-LIST',
    incomplete
});

// TODO/ALL-LIST
export const setAllList = ({all = []}) => ({
    type: 'TODO/ALL-LIST',
    all
});

// TODO/UPDATE-NAME
export const updateTodoName = ({todoID = "", name = ""}) => ({
    type: 'TODO/UPDATE-NAME',
    todoID,
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