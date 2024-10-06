import React from 'react';
import styled from 'styled-components';


// Form wrapper component
const Form = ({onSubmit, children, ...otherProps}) => {
    return (
        <FormElement onSubmit={onSubmit} {...otherProps}>
            {children}
        </FormElement>
    );
}

export default Form;

const FormElement = styled.form`
    
`;