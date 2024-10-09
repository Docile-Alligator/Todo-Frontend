import React, {useRef} from "react";
import styled from "styled-components";
import {Colours, Typography} from "../definitions";
import TodoListItem from "./TodoListItem";

const List = ({className, data, listEntry}) => {
    const items = [];

    for (const item of data) {
        items.push(<div key={item.todoID}>{listEntry(item)}</div>);
    }

    return (
        <Container className={className}>
            {items}
        </Container>
    );
};

export default List;

const Container = styled.ul`
    width: 100%;
    
    ${(props) => {
        if (props.variant === "error") {
            return `
                    background-color: ${Colours.ERROR_LIGHTEST_2};
                    color: ${Colours.ERROR_NEON};

                    a {
                        color: ${Colours.ERROR_NEON};
                        text-decoration: underline;
                    }
                `;
        } else if (props.variant === "success") {
            return `
                    background-color: ${Colours.SUCCESS_LIGHTER};
                    color: ${Colours.SUCCESS_DARK};
                `;
        } else if (props.variant === "info") {
            return `
                    background-color: ${Colours.ACCENT_3_LIGHTER};
                    color: ${Colours.ACCENT_3_DARK};
                `;
        }
    }
    }
`;