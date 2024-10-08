import React, {forwardRef} from 'react';
import styled from 'styled-components';
import Alert from "./Alert";
import {useDispatch, useSelector} from "react-redux";


const Dialog = forwardRef(({className, message, content, onConfirm, onClose, onClearAlertMessage}, ref) => {
    return (
        <Container className={className} ref={ref}>
            <Alert message={message} onClose={onClearAlertMessage} />
            <div className="contentWrapper">{content}</div>
            <button onClick={onClose}>Close</button>
            <button onClick={onConfirm}>Confirm</button>
        </Container>
    );
});

export default Dialog;

const Container = styled.dialog`
    padding: 0.5rem;

    .contentWrapper {
        padding: 0.5rem;
    }
    
    button {
        margin: 0.5rem;
    }
`;