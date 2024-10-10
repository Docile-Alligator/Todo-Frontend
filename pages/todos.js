import React, {useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import PageLayout from '../components/PageLayout';
import Tabs from "../components/Tabs";
import List from "../components/List";
import apiFetch from "../functions/apiFetch";
import Dialog from "../components/Dialog";
import InputField from "../components/InputField";
import {
    clearModifyTodoAlerts,
    setAllList,
    setIncompleteList,
    updateTodoName,
    updateTodoNameError
} from "../actions/todo";
import Alert from "../components/Alert";
import {useDispatch, useSelector} from "react-redux";
import TodoListEntry from "../components/TodoListEntry";
import Button from "../components/Button";
import Link from "next/link";


const Todos = () => {
    const [activeTab, setActiveTab] = useState("incomplete");

    // These two states can be used in the future to show a progress bar.
    const [incompleteLoading, setIncompleteLoading] = useState(true);
    const [allLoading, setAllLoading] = useState(true);

    // These two states are used to track the loading info. E.g. when there is an error loading todos.
    // They will be shown on an Alert component.
    const [incompleteLoadingInfo, setIncompleteLoadingInfo] = useState("");
    const [allLoadingInfo, setAllLoadingInfo] = useState("");

    /*
        These two anchors are for pagination purposes.
        Format: [before, after]
        before is the created field of the first item in the todoState.list.<incomplete or all>.
        after is the created field of the last item in the todoState.list.<incomplete or all>.
        Default value: [undefined, undefined]. In this case, the before and after field will not be used in the API.
    */
    const [incompleteAnchor, setIncompleteAnchor] = useState([]);
    const [allAnchor, setAllAnchor] = useState([]);

    // This is the page size used in each todo list. In the future we can add an option to change it using the corresponding set function.
    const [incompletePageSize, setIncompletePageSize] = useState(3);
    const [allPageSize, setAllPageSize] = useState(3);

    // These two states keep track of the todoID and the new name of the todo item that is being updated.
    const [editTodoID, setEditTodoId] = useState("");
    const [editTodoName, setEditTodoName] = useState("");

    /*
        This state controls the confirm button disabled state in the dialog.
        Users will not be able to abuse the confirm button when performing the edit API call.
    */
    const [isConfirmingEditingName, setIsConfirmingEditingName] = useState(false);

    // Having this dialog ref allows us to perform show/hide operation of the dialog.
    const dialogRef = useRef(null);

    const dispatch = useDispatch();
    /*
        We are reusing this todo state used in the create page because they have similar data field.
        The incomplete list and all list are passed through here.
        Modifications to the todo item will be passed through here as well so that we can update the same item in both lists.
    */
    const todoState = useSelector((state) => state.todo);

    /*
        The function for fetching the incomplete todo list.
        It will show an alert message when something bad happens.
     */
    const fetchIncompleteTodos = async ({before = undefined, after = undefined}) => {
        setIncompleteLoadingInfo("");
        setIncompleteLoading(true);

        // Set the query params here so that it's easier to read and manage.
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
                // Notice we don't update the before and after anchor here since there is no more todo item available to fetch.
                setIncompleteLoadingInfo("No data.");
            } else {
                /*
                    We dispatch a new state even if we don't need to update the all todo list since we have to make sure
                    the same item should be updated in both lists after modification.
                 */
                dispatch(setIncompleteList({ incomplete: result.result }));
                setIncompleteAnchor([result.before, result.after]);
            }
        } catch (error) {
            console.error(error);
            setIncompleteLoadingInfo("Server error.");
        } finally {
            // Now we finished loading the incomplete todo list.
            setIncompleteLoading(false);
        }
    };

    /*
        The function for fetching the incomplete todo list.
        It will show an alert message when something bad happens.
     */
    const fetchAllTodos = async ({before = undefined, after = undefined}) => {
        setAllLoadingInfo("");
        setAllLoading(true);

        // Set the query params here so that it's easier to read and manage.
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
                // Notice we don't update the before and after anchor here since there is no more todo item available to fetch.
                setAllLoadingInfo("No data.");
            } else {
                /*
                    We dispatch a new state even if we don't need to update the incomplete todo list since we have to make sure
                    the same item should be updated in both lists after modification.
                 */
                dispatch(setAllList({ all: result.result }));
                setAllAnchor([result.before, result.after]);
            }
        } catch (error) {
            console.error(error);
            setIncompleteLoadingInfo("Server error.");
        } finally {
            // Now we finished loading the all todo list.
            setAllLoading(false);
        }
    };

    /*
        Return a promise when toggling the completeness so that the component itself can handle the rest.
        This is because we want to show the alert message on the item in the todo list itself.
     */
    const toggleTodoCompleteness = async (todoID, completed) => {
        return apiFetch("/todo", {
            method: "PUT",
            body: {
                todoID: todoID,
                completed: completed
            }
        });
    }

    const showEditTodoDialog = (todoID, todoName) => {
        setIsConfirmingEditingName(false);
        if (dialogRef.current) {
            // Set the corresponding state so when confirming the change, the onConfirmEditTodo will have the correct item to edit.
            setEditTodoId(todoID);
            setEditTodoName(todoName);
            dialogRef.current.showModal();
        }
    }

    const onConfirmEditTodo = async () => {
        setIsConfirmingEditingName(true);
        // Clear the message because we are doing something right now.
        dispatch(clearModifyTodoAlerts());

        const result = apiFetch("/todo", {
            method: "PUT",
            body: {
                todoID: editTodoID,
                newTodoName: editTodoName
            }
        });

        result.then((result) => {
            if (result.status !== 200) {
                dispatch(updateTodoNameError({ error: result.error }));
            } else {
                // Edit name successfully and close the dialog.
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

    /*
        Return a promise when deleting the todo item so that the component itself can handle the rest.
        This is because we want to show the alert message on the item in the todo list itself.
     */
    const deleteTodo = async (todoID) => {
        return apiFetch("/todo", {
            method: "DELETE",
            body: {
                todoID: todoID
            }
        });
    }

    // Load both lists when the page is rendering.
    useEffect(() => {
        fetchIncompleteTodos({});
        fetchAllTodos({});
    }, []);

    /*
        Clear the loading alert info for the previous tab when switch tabs.
        Not clearing alert infos in both tabs at once is for user to see the initial loading info on a non-active tab
     */
    useEffect(() => {
        if (activeTab === "incomplete") {
            setAllLoadingInfo("");
        } else {
            setIncompleteLoadingInfo("");
        }
    }, [activeTab]);

    return (
        <PageLayout title="Todos">
            <Container>
                <div className="content">
                    <Link href="/create">
                        <Button text="Create Todo" size="medium" variant="primary" />
                    </Link>

                    <Tabs tabs={[{
                        title: "incomplete",
                        onClick: () => {
                            setActiveTab("incomplete")
                        },
                        content: <div>
                            {/*Notice here we pass the TodoListEntry to List*/}
                            <List
                                className={"incompleteTodosList"}
                                listEntry={(item) => <TodoListEntry item={item}
                                                                    toggleOnClick={toggleTodoCompleteness}
                                                                    editOnClick={showEditTodoDialog}
                                                                    deleteOnClick={deleteTodo} />
                                }
                                data={todoState.list.incomplete}
                            />
                            <Alert message={incompleteLoadingInfo} onClose={() => setIncompleteLoadingInfo("")} />
                            {/*The three buttons for users to go to the next page, go to the previous page and refresh*/}
                            <img className={"pageIcon"} src="/img/previous-page.png" onClick={() => fetchIncompleteTodos({ before: incompleteAnchor[0] })} />
                            <img className={"pageIcon"} src="/img/next-page.png" onClick={() => fetchIncompleteTodos({ after: incompleteAnchor[1] })} />
                            <img className={"pageIcon"} src="/img/refresh.png" onClick={() => fetchIncompleteTodos({})} />
                        </div>
                    }, {
                        title: "all",
                        onClick: () => {
                            setActiveTab("all")
                        },
                        content: <div>
                            {/*Notice here we pass the TodoListEntry to List*/}
                            <List
                                className={"allTodosList"}
                                data={todoState.list.all}
                                listEntry={(item) => <TodoListEntry item={item}
                                                                    toggleOnClick={toggleTodoCompleteness}
                                                                    editOnClick={showEditTodoDialog}
                                                                    deleteOnClick={deleteTodo} />
                                }
                            />
                            <Alert message={allLoadingInfo} onClose={() => setAllLoadingInfo("")} />
                            {/*The three buttons for users to go to the next page, go to the previous page and refresh*/}
                            <img className={"pageIcon"} src="/img/previous-page.png" onClick={() => fetchAllTodos({ before: allAnchor[0] })} />
                            <img className={"pageIcon"} src="/img/next-page.png" onClick={() => fetchAllTodos({ after: allAnchor[1] })} />
                            <img className={"pageIcon"} src="/img/refresh.png" onClick={() => fetchAllTodos({})} />
                        </div>
                    }]} activeTab={activeTab} />
                </div>
            </Container>

            {/*Notice here we pass the InputField to Dialog*/}
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
                                dispatch(clearModifyTodoAlerts());
                            }} />
                    }
                    isConfirming={isConfirmingEditingName}
                    onClose={() => {
                        dispatch(clearModifyTodoAlerts());
                        if (dialogRef.current) {
                            dialogRef.current.close();
                        }
                    }}
                    onConfirm={onConfirmEditTodo}
                    onClearAlertMessage={() => dispatch(clearModifyTodoAlerts())} />
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