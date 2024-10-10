import React, {useRef} from "react";
import styled from "styled-components";
import {Colours} from "../definitions";


/*
    A simple ul list with the ability to render multiple list item (listEntry).
    We make sure the List and the child views (listEntry) are decoupled so the List does not need to know the logic of rendering child views.
    The only things it requires are the data and the list entry.
 */
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
`;