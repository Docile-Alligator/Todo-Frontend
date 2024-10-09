import React, {useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import PageLayout from '../components/PageLayout';
import Tabs from "../components/Tabs";
import List from "../components/List";
import apiFetch from "../functions/apiFetch";
import Dialog from "../components/Dialog";
import InputField from "../components/InputField";
import {
    clearListLoadingInfo,
    clearUpdateTodoNameALerts,
    setAllList,
    setIncompleteList,
    updateListLoadingInfo,
    updateTodoName,
    updateTodoNameError
} from "../actions/todo";
import Alert from "../components/Alert";
import {useDispatch, useSelector} from "react-redux";
import TodoListEntry from "../components/TodoListEntry";


const Todos = () => {
    const [activeTab, setActiveTab] = useState("incomplete");

    const [incompleteLoading, setIncompleteLoading] = useState(true);
    const [allLoading, setAllLoading] = useState(true);

    const [incompleteAnchor, setIncompleteAnchor] = useState([]);
    const [allAnchor, setAllAnchor] = useState([]);

    const [incompletePageSize, setIncompletePageSize] = useState(25);
    const [allPageSize, setAllPageSize] = useState(25);

    const [editTodoID, setEditTodoId] = useState("");
    const [editTodoName, setEditTodoName] = useState("");

    const [isConfirmingEditingName, setIsConfirmingEditingName] = useState(false);

    const dialogRef = useRef(null);

    const dispatch = useDispatch();
    const todoState = useSelector((state) => state.todo);

    const fetchIncompleteTodos = async ({before = undefined, after = undefined}) => {
        dispatch(clearListLoadingInfo());

        const params = new URLSearchParams({
            before: before,
            after: after,
            pageSize: incompletePageSize,
            findIncomplete: true
        });

        try {
            const response = await apiFetch(`/todo?${params.toString()}`, {
                method: "GET"
            });
            const result = response.body;
            if (result.result.length === 0) {
                dispatch(updateListLoadingInfo({ info: "No data." }));
            } else {
                dispatch(setIncompleteList({ incomplete: result.result }));
                setIncompleteAnchor([result.before, result.after]);
            }
        } catch (error) {
            dispatch(updateListLoadingInfo({ info: error.message }));
        } finally {
            setIncompleteLoading(false);
        }
    };

    const fetchAllTodos = async ({before = undefined, after = undefined}) => {
        dispatch(clearListLoadingInfo());

        const params = new URLSearchParams({
            before: before,
            after: after,
            pageSize: allPageSize
        });

        try {
            const response = await apiFetch(`/todo?${params.toString()}`, {
                method: "GET"
            });
            const result = response.body;
            if (result.result.length === 0) {
                // No todos
                dispatch(updateListLoadingInfo({ info: "No data." }));
            } else {
                dispatch(setAllList({ all: result.result }));
                setAllAnchor([result.before, result.after]);
            }
        } catch (error) {
            dispatch(updateListLoadingInfo({ info: error.message }));
        } finally {
            setAllLoading(false);
        }
    };

    useEffect(() => {
        fetchIncompleteTodos({});
    }, []);

    useEffect(() => {
        fetchAllTodos({});
    }, []);

    useEffect(() => {
        dispatch(clearListLoadingInfo());
    }, [activeTab]);

    const toggleTodoCompleteness = async (todoID, completed) => {
        return apiFetch("/todo/toggleCompleted", {
            method: "POST",
            body: {
                todoID: todoID,
                completed: completed
            }
        });
    }

    const showEditTodoDialog = (todoID, todoName) => {
        setIsConfirmingEditingName(false);
        if (dialogRef.current) {
            setEditTodoId(todoID);
            setEditTodoName(todoName);
            dialogRef.current.showModal();
        }
    }

    const onConfirmEditTodo = async () => {
        setIsConfirmingEditingName(true);
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
            setIsConfirmingEditingName(false);
        }).catch((error) => {
            dispatch(updateTodoNameError({ error: error }));
            setIsConfirmingEditingName(false);
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
                        content: <div>
                            <List
                                className={"incompleteTodosList"}
                                listEntry={(item) => <TodoListEntry item={item}
                                                                    toggleOnClick={toggleTodoCompleteness}
                                                                    editOnClick={showEditTodoDialog}/>
                                }
                                data={todoState.list.incomplete}
                            />
                            <Alert message={todoState.listLoadingInfo} onClose={() => dispatch(clearListLoadingInfo())} />
                            <img className={"pageIcon"} src="/img/previous-page.png" onClick={() => fetchIncompleteTodos({ before: incompleteAnchor[0] })}/>
                            <img className={"pageIcon"} src="/img/next-page.png" onClick={() => fetchIncompleteTodos({ after: incompleteAnchor[1] })}/>
                            <img className={"pageIcon"} src="/img/refresh.png" onClick={() => fetchIncompleteTodos({})}/>
                        </div>
                    }, {
                        title: "all",
                        onClick: () => {
                            setActiveTab("all")
                        },
                        content: <div>
                            <List
                                className={"allTodosList"}
                                data={todoState.list.all}
                                listEntry={(item) => <TodoListEntry item={item}
                                                                    toggleOnClick={toggleTodoCompleteness}
                                                                    editOnClick={showEditTodoDialog}/>
                                }
                            />
                            <Alert message={todoState.listLoadingInfo} onClose={() => dispatch(clearListLoadingInfo())} />
                            <img className={"pageIcon"} src="/img/previous-page.png" onClick={() => fetchAllTodos({ before: allAnchor[0] })}/>
                            <img className={"pageIcon"} src="/img/next-page.png" onClick={() => fetchAllTodos({ after: allAnchor[1] })}/>
                            <img className={"pageIcon"} src="/img/refresh.png" onClick={() => fetchAllTodos({})}/>
                        </div>
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
                    isConfirming={isConfirmingEditingName}
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
    
    .pageIcon {
        width: 3rem;
    }
`;