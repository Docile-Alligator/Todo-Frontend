import React, {useState} from "react";
import styled from "styled-components";
import {useDispatch} from "react-redux";
import {deleteTodo, updateCompleteness} from "../actions/todo";
import Alert from "./Alert";

const TodoListEntry = ({className, item, toggleOnClick, editOnClick, deleteOnClick}) => {
    const [alertInfo, setAlertInfo] = useState("");
    const dispatch = useDispatch();

    return (
        <Container className={className}>
            <Alert message={alertInfo} onClose={() => setAlertInfo("")} />
            <div className="listToggleItemContentWrapper">
                <div className="listToggleItemContent">
                    <p className="listToggleItemTitle">{item.name}</p>
                    <p className="listToggleItemSubtitle">{item.created}</p>
                </div>
                <div className="listToggleItemControls">
                    <img className="listToggleItemToggle"
                         onClick={() => {
                             setAlertInfo("");

                             toggleOnClick(item.todoID, !item.completed)
                             .then((result) => {
                                 if (result.status === 200) {
                                     dispatch(updateCompleteness({todoID: item.todoID, completed: !item.completed}));
                                 } else {
                                     setAlertInfo(result.error);
                                 }
                             })
                             .catch((error) => {
                                 setAlertInfo(error.message)
                             });
                         }} src={item.completed ? "/img/checked.png" : "/img/unchecked.png"} />
                    <img className="listToggleItemEdit"
                         onClick={() => {
                             editOnClick(item.todoID, item.name);
                         }} src="/img/edit.png" />
                    <img className="listToggleItemDelete"
                         onClick={() => {
                             setAlertInfo("");

                             deleteOnClick(item.todoID)
                                 .then((result) => {
                                     if (result.status === 200) {
                                         dispatch(deleteTodo({todoID: item.todoID}));
                                     } else {
                                         setAlertInfo(result.error);
                                     }
                                 }).catch((error) => {
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
    .listToggleItemContentWrapper {
        display: flex;
        line-height: 32px;
        align-items: center;
    }
    
    .listToggleItemContent {
        flex-grow: 1;
    }

    .listToggleItemContent p {
        text-align: left;
    }
    
    .listToggleItemControls img {
        display: block;
        width: 2rem;
    }
`;