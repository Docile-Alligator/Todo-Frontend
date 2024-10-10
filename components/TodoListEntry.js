import React, {useState} from "react";
import styled from "styled-components";
import {Colours, Typography} from "../definitions";
import {useDispatch, useSelector} from "react-redux";
import {clearListLoadingInfo, updateCompleted} from "../actions/todo";
import Alert from "./Alert";

const TodoListEntry = ({className, item, toggleOnClick, editOnClick}) => {
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
                         onClick={() => toggleOnClick(item.todoID, !item.completed)
                             .then((result) => {
                                 if (result.status === 200) {
                                     dispatch(updateCompleted({ todoID: item.todoID, completed: !item.completed }));
                                 } else {
                                     setAlertInfo(result.error);
                                 }})
                             .catch((error) => {setAlertInfo(error.message)})
                         } src={item.completed ? "/img/checked.png" : "/img/unchecked.png"}/>
                    <img className="listToggleItemEdit"
                         onClick={() => {
                             editOnClick(item.todoID, item.name);
                         }} src="/img/edit.png"/>
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
    }
    
    .listToggleItemContent {
        vertical-align: middle;
        flex-grow: 1;
    }

    .listToggleItemContent p {
        text-align: left;
    }
    
    .listToggleItemControls {
        vertical-align: top;
        float: right;
    }
    
    .listToggleItemControls img {
        vertical-align: top;
        display: block;
        width: 2rem;
    }
`;