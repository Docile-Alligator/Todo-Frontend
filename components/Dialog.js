import React, {forwardRef} from 'react';
import styled from 'styled-components';
import Alert from "./Alert";
import Button from "./Button";


/*
    This Dialog is made as generic as possible, so the content is actually passed in by the parent component.
    In todos page, the content is a simple InputField.
    The onClick listeners are also passed in by the parent component with the same reason behind.
 */
const Dialog = forwardRef(({className, message, content, isConfirming, onConfirm, onClose, onClearAlertMessage}, ref) => {
    return (
        <Container className={className} ref={ref}>
            <Alert message={message} onClose={onClearAlertMessage} />
            <div className="contentWrapper">{content}</div>
            <Button text="Close" onClick={onClose} size="medium" variant="neutral-light" />
            <Button text="Confirm" onClick={onConfirm} size="medium" variant="primary" disabled={isConfirming} />
        </Container>
    );
});

export default Dialog;

const Container = styled.dialog`
    padding: 0.5rem;

    .contentWrapper {
        padding: 0.5rem;
    }
    
    Button {
        margin: 0.5rem;
        display: inline;
    }
`;