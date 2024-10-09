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

// TODO/UPDATE-LIST-LOADING-INFO
export const updateListLoadingInfo = ({info = ""}) => ({
    type: 'TODO/UPDATE-LIST-LOADING-INFO',
    info
});

// TODO/CLEAR-LIST-LOADING-INFO
export const clearListLoadingInfo = () => ({
    type: 'TODO/CLEAR-LIST-LOADING-INFO',
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

// TODO/UPDATE-COMPLETENESS
export const updateCompleted = ({todoID = "", completed = false}) => ({
    type: 'TODO/UPDATE-COMPLETENESS',
    todoID,
    completed
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