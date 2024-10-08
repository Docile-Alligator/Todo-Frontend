import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import { Colours, Typography } from '../definitions';
import PageLayout from '../components/PageLayout';
import Tabs from "../components/Tabs";
import List from "../components/List";
import apiFetch from "../functions/apiFetch";


const Todos = () => {
    const [activeTab, setActiveTab] = useState("incomplete");

    const [incompleteTodos, setIncompleteTodos] = useState([]);
    const [allTodos, setAllTodos] = useState([]);

    const [incompleteLoading, setIncompleteLoading] = useState(true);
    const [allLoading, setAllLoading] = useState(true);

    const [incompletePage, setIncompletePage] = useState(0);
    const [incompletePageSize, setIncompletePageSize] = useState(25);
    const [allPage, setAllPage] = useState(0);
    const [allPageSize, setAllPageSize] = useState(25);

    const fetchIncompleteTodos = async () => {

        if (activeTab !== "incomplete" || incompleteTodos.length !== 0) {
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
            setIncompleteTodos(result);

            setIncompletePage(incompletePage + 1);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIncompleteLoading(false);
        }
    };

    const fetchAllTodos = async () => {
        if (activeTab !== "all" || allTodos.length !== 0) {
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
            setAllTodos(result);
            console.log(result);

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
        const result = await apiFetch("/todo/toggleCompleted", {
            method: "POST",
            body: {
                todoID: todoID,
                completed: completed
            }
        });

        return result.body;
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
                            data={incompleteTodos}
                            onClicks={{
                                /*toggleOnClick: async (todoID, completed) => {
                                    return Promise.resolve(toggleTodoCompleteness(todoID, completed));
                                },*/
                                toggleOnClick: toggleTodoCompleteness,
                                editOnClick: (todoId) => {
                                    setActiveTab("incomplete");
                                }
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
                            data={allTodos}
                            onClicks={{
                                /*toggleOnClick: async (todoID, completed) => {
                                    toggleTodoCompleteness(todoID, completed);
                                },*/
                                toggleOnClick: toggleTodoCompleteness,
                                editOnClick: () => {
                                    setActiveTab("incomplete");
                                }
                            }}
                        />
                    }]} activeTab={activeTab}/>
                </div>
            </Container>
        </PageLayout>
    );
};

export default Todos;

const Container = styled.div`
    width: 100%;

    .content {
        h1 {
            color: ${Colours.BLACK};
            font-size: ${Typography.HEADING_SIZES.M};
            font-weight: ${Typography.WEIGHTS.LIGHT};
            line-height: 2.625rem;
            margin-bottom: 2rem;
            margin-top: 1rem;
        }

        .saveButton {
            margin-top: 1rem;
        }
    }
`;