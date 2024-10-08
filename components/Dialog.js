import React, {forwardRef} from 'react';
import styled from 'styled-components';
import { Colours, Typography } from '../definitions';


const Dialog = forwardRef(({className, content, onConfirm, onClose}, ref) => {
    return (
        <Container className={className} ref={ref}>
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