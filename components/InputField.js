import React from 'react';
import styled from 'styled-components';
import { Colours, Typography } from '../definitions';


// Custom styled input fields, use the "type" prop to control which HTML input type is rendered
const InputField = ({className, type, value, label, placeholder, size="medium", variant="neutral", disabled=false, ...otherProps}) => {
    return (
        <Container className={className} type={type} size={size} variant={variant} disabled={disabled}>
            <label className="formLabel">
                {
                    label &&
                    <div className="labelContainer">{label && <span className="labelText">{label}</span>}</div>
                }
                <div className="inputContainer">
                    {
                        (type === "textarea" &&
                        <textarea className="formField" value={value} disabled={disabled} placeholder={placeholder} {...otherProps} />)
                        ||
                        (<input className={`formField`} type={type} value={value} disabled={disabled} placeholder={placeholder} {...otherProps} />)
                    }
                </div>
            </label>
        </Container>
    );
};

export default InputField;

const Container = styled.div`
    .formField {
        background-color: ${Colours.TRANSPARENT};
        border: none;
        box-sizing: border-box;
        flex-grow: 1;
        font-family: ${Typography.FONTS.BODY};
        font-size: ${Typography.BODY_SIZES.L};
        font-weight: ${Typography.WEIGHTS.MEDIUM};
        padding: 0;
        width: 100%;
        ${(props) => {
            if (props.type !== "textarea") {
                if (props.size === "large") {
                    return `
                        height: 2rem;
                    `;
                }
                else if (props.size === "medium" || props.size === "small") {
                    return `
                        height: 1.5rem;
                    `;
                }
            }
            else {
                return `
                    padding: 0.625rem 1rem;
                `;
            }
        }}
        ${(props) => {
            if (props.variant === "neutral-dark") {
                return `color: ${Colours.WHITE_LIGHT};`;
            }
            else if (props.variant === "translucent") {
                return `
                    color: ${Colours.WHITE};
                `;
            }
            else {
                return `color: ${Colours.BLACK};`;
            }
        }}
    }
    .formField:focus-visible {
        outline: none;
    }
    ${(props) => {
        return `
            .formField::placeholder {
                color: ${Colours.BLACK_LIGHTEST_2};
                opacity: 1;
            }
            .formField:-ms-input-placeholder {
                color: ${Colours.BLACK_LIGHTEST_2};
            }
            .formField::-ms-input-placeholder {
                color: ${Colours.BLACK_LIGHTEST_2};
            }
        `;
    }}
    
    /* Chrome, Safari, Edge, Opera */
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    /* Firefox */
    input[type=number] {
        -moz-appearance: textfield;
    }
    .formLabel {
        font-size: ${Typography.BODY_SIZES.XS};
        font-weight: ${Typography.WEIGHTS.MEDIUM};

        ${(props) => {
            if (props.variant === "neutral-dark") {
                return `color: ${Colours.WHITE_LIGHTEST_2};`;
            }
            else {
                return `color: ${Colours.BLACK_LIGHTEST_2};`;
            }
        }}
    }
    .labelText {
        color: ${Colours.BLACK_LIGHT};
        font-size: ${Typography.BODY_SIZES.L};
        font-weight: ${Typography.WEIGHTS.BOLD};
        line-height: 1.25rem;
    }
    .labelContainer {
        align-items: center;
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.75rem;
    }
    .inputContainer {
        align-items: center;
        border-radius: 0.75rem;
        display: flex;
        overflow: hidden;
        ${(props) => {
            if (props.type !== "textarea") {
                if (props.size === "large" || props.size === "medium") {
                    return `
                        padding: 0.625rem 1rem;
                    `;
                }
                else if (props.size === "small") {
                    return `
                        padding: 0.375rem 1rem;
                    `;
                }
            }
        }}
        ${(props) => {
            // If disabled
            if (props.disabled) {
                return `
                    background-color: ${Colours.GRAY_LIGHTER};
                    border: 1px solid ${Colours.GRAY_LIGHT};
                    color: ${Colours.BLACK_LIGHTEST_2};
                `;
            }
            else {
                return `
                    background-color: ${Colours.BLACK_LIGHTEST_0};
                    border: none;
                `;
            }
        
        }
    }
`;