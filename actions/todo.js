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

// TODO/CLEAR-MODIFY-TODO-ALERTS
export const clearModifyTodoAlerts = () => ({
    type: 'TODO/CLEAR-ALERTS'
});

// TODO/UPDATE-COMPLETENESS
export const updateCompleteness = ({todoID = "", completed = false}) => ({
    type: 'TODO/UPDATE-COMPLETENESS',
    todoID,
    completed
});

// TODO/DELETE-TODO
export const deleteTodo = ({todoID = ""}) => ({
    type: 'TODO/DELETE-TODO',
    todoID
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