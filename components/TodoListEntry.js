import React, {useState} from "react";
import styled from "styled-components";
import {useDispatch} from "react-redux";
import {deleteTodo, updateCompleteness} from "../actions/todo";
import Alert from "./Alert";


/*
    A List Entry that shows a single todo item with multiple options (toggling completeness, editing name and deleting todo).
    The onClick listeners are passed in by the component which generates it (not the List component in general).
 */
const TodoListEntry = ({className, item, toggleOnClick, editOnClick, deleteOnClick}) => {
    // Use the alertInfo to keep track of showing and hiding different messages in an Alert component.
    const [alertInfo, setAlertInfo] = useState("");
    const dispatch = useDispatch();

    return (
        <Container className={className}>
            <Alert message={alertInfo} onClose={() => setAlertInfo("")} />
            <div className="todoListEntryContentWrapper">
                {/*We show the item name and the created time in the list.*/}
                <div className="todoListEntryContent">
                    <p className="todoListEntryTitle">{item.name}</p>
                    <p className="todoListEntrySubtitle">{item.created}</p>
                </div>
                <div className="todoListEntryControls">
                    <img className="todoListEntryToggle"
                         onClick={() => {
                             setAlertInfo("");

                             // Notice we handle the promise result and error here since we want to show the Alert message in this component itself.
                             toggleOnClick(item.todoID, !item.completed)
                                 .then((result) => {
                                     if (result.status === 200) {
                                         // Use redux to update both lists.
                                         dispatch(updateCompleteness({
                                             todoID: item.todoID,
                                             completed: !item.completed
                                         }));
                                     } else {
                                         setAlertInfo(result.error);
                                     }
                                 })
                                 .catch((error) => {
                                     setAlertInfo(error.message)
                                 });
                         }} src={item.completed ? "/img/checked.png" : "/img/unchecked.png"} />
                    <img className="todoListEntryEdit"
                         onClick={() => {
                             editOnClick(item.todoID, item.name);
                         }} src="/img/edit.png" />
                    <img className="todoListEntryDelete"
                         onClick={() => {
                             setAlertInfo("");

                             // Notice we handle the promise result and error here since we want to show the Alert message in this component itself.
                             deleteOnClick(item.todoID)
                                 .then((result) => {
                                     if (result.status === 200) {
                                         // Use redux to update both lists.
                                         dispatch(deleteTodo({todoID: item.todoID}));
                                     } else {
                                         setAlertInfo(result.error);
                                     }
                                 })
                                 .catch((error) => {
                                     setAlertInfo(error.message)
                                 });
                         }} src="/img/delete.png" />
                </div>
            </div>
        </Container>
    );
};

export default TodoListEntry;

const Container = styled.li`
    .todoListEntryContentWrapper {
        display: flex;
        line-height: 32px;
        align-items: center;
    }
    
    .todoListEntryContent {
        flex-grow: 1;
    }

    .todoListEntryContent p {
        text-align: left;
    }
    
    .todoListEntryControls img {
        display: block;
        width: 2rem;
    }
`;