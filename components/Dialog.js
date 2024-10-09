import React, {forwardRef} from 'react';
import styled from 'styled-components';
import Alert from "./Alert";
import {useDispatch, useSelector} from "react-redux";
import Button from "./Button";


const Dialog = forwardRef(({className, message, content, onConfirm, onClose, onClearAlertMessage}, ref) => {
    return (
        <Container className={className} ref={ref}>
            <Alert message={message} onClose={onClearAlertMessage} />
            <div className="contentWrapper">{content}</div>
            <Button text="Close" onClick={onClose} style={{display: "inline"}} size="medium" variant="neutral-light" />
            <Button text="Confirm" onClick={onConfirm} style={{display: "inline"}} size="medium" variant="primary" />
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