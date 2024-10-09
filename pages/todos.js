import React, {useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import { Colours, Typography } from '../definitions';
import PageLayout from '../components/PageLayout';
import Tabs from "../components/Tabs";
import List from "../components/List";
import apiFetch from "../functions/apiFetch";
import Dialog from "../components/Dialog";
import InputField from "../components/InputField";
import {show} from "react-modal/lib/helpers/ariaAppHider";
import {
    clearTodoAlerts,
    clearUpdateTodoNameALerts, setAllList,
    setIncompleteList, updateCompleted, updateCompleteness,
    updateTodoName,
    updateTodoNameError
} from "../actions/todo";
import Alert from "../components/Alert";
import {useDispatch, useSelector} from "react-redux";


const Todos = () => {
    const [activeTab, setActiveTab] = useState("incomplete");

    const [incompleteLoading, setIncompleteLoading] = useState(true);
    const [allLoading, setAllLoading] = useState(true);

    const [incompletePage, setIncompletePage] = useState(0);
    const [incompletePageSize, setIncompletePageSize] = useState(25);
    const [allPage, setAllPage] = useState(0);
    const [allPageSize, setAllPageSize] = useState(25);

    const [editTodoID, setEditTodoId] = useState("");
    const [editTodoName, setEditTodoName] = useState("");

    const dialogRef = useRef(null);

    const dispatch = useDispatch();
    const todoState = useSelector((state) => state.todo);

    const fetchIncompleteTodos = async () => {
        if (activeTab !== "incomplete" || todoState.list.incomplete.length !== 0) {
            return;
        }

        const params = new URLSearchParams({
            page: incompletePage,
            pageSize: incompletePageSize,
            findIncomplete: true
        });

        try {
            const response = await apiFetch(`/todo?${params.toString()}`, {
                method: "GET"
            });
            const result = response.body;
            dispatch(setIncompleteList({ incomplete: result }));

            setIncompletePage(incompletePage + 1);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIncompleteLoading(false);
        }
    };

    const fetchAllTodos = async () => {
        if (activeTab !== "all" || todoState.list.all.length !== 0) {
            return;
        }

        const params = new URLSearchParams({
            page: allPage,
            pageSize: allPageSize
        });

        try {
            const response = await apiFetch(`/todo?${params.toString()}`, {
                method: "GET"
            });
            const result = response.body;
            dispatch(setAllList({ all: result }));

            setAllPage(allPage + 1);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setAllLoading(false);
        }
    };

    useEffect(() => {
        fetchIncompleteTodos();
    }, [activeTab]);

    useEffect(() => {
        fetchAllTodos();
    }, [activeTab]);

    const toggleTodoCompleteness = async (todoID, completed) => {
        const result = apiFetch("/todo/toggleCompleted", {
            method: "POST",
            body: {
                todoID: todoID,
                completed: completed
            }
        });

        result.then((result) => {
            if (result.status === 200) {
                dispatch(updateCompleted({ todoID: todoID, completed: completed }));
            } else {
                console.log(result.error);
            }
        }).catch((error) => {
            console.log(error);
        })

        return result.body;
    }

    const showEditTodoDialog = (todoID, todoName) => {
        if (dialogRef.current) {
            setEditTodoId(todoID);
            setEditTodoName(todoName);
            dialogRef.current.showModal();
        }
    }

    const onConfirmEditTodo = async () => {
        dispatch(clearUpdateTodoNameALerts());

        const result = apiFetch("/todo/editName", {
            method: "POST",
            body: {
                todoID: editTodoID,
                newTodoName: editTodoName
            }
        });

        result.then((result) => {
            if (result.status !== 200) {
                dispatch(updateTodoNameError({ error: result.error }));
            } else {
                if (dialogRef.current) {
                    dialogRef.current.close();
                }
                dispatch(updateTodoName({ todoID: editTodoID, name: editTodoName }));
            }
        }).catch((error) => {
            dispatch(updateTodoNameError({ error: error }));
        });
    }

    return (
        <PageLayout title="Todos">
            <Container>
                <div className="content">
                    <Tabs tabs={[{
                        title: "incomplete",
                        onClick: () => {
                            setActiveTab("incomplete")
                        },
                        content: <List
                            className={"incompleteTodosList"}
                            itemType={"TOGGLE"}
                            data={todoState.list.incomplete}
                            onClicks={{
                                toggleOnClick: toggleTodoCompleteness,
                                editOnClick: showEditTodoDialog
                            }}
                            />
                    }, {
                        title: "all",
                        onClick: () => {
                            setActiveTab("all")
                        },
                        content: <List
                            className={"allTodosList"}
                            itemType={"TOGGLE"}
                            data={todoState.list.all}
                            onClicks={{
                                toggleOnClick: toggleTodoCompleteness,
                                editOnClick: showEditTodoDialog
                            }}
                        />
                    }]} activeTab={activeTab}/>
                </div>
            </Container>

            <Dialog ref={dialogRef}
                    message={todoState.alerts.error}
                    content={
                        <InputField
                            type="textarea"
                            size="medium"
                            required
                            value={editTodoName}
                            onChange={e => {
                                setEditTodoName(e.target.value);
                                dispatch(clearUpdateTodoNameALerts());
                            }}/>
                    }
                    onClose={() => {
                        dispatch(clearUpdateTodoNameALerts());
                        if (dialogRef.current) {
                            dialogRef.current.close();
                        }
                    }}
                    onConfirm={onConfirmEditTodo}
                    onClearAlertMessage={() => dispatch(clearUpdateTodoNameALerts())}
            />
        </PageLayout>
    );
};

export default Todos;

const Container = styled.div`
    width: 100%;
`;