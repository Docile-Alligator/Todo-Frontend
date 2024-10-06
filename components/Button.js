import React from 'react';
import styled from 'styled-components';
import { Colours, Typography } from '../definitions';


// Custom button component, pass in a string for what text should be rendered and set a variant to control the colour scheme
const Button = ({text, type="button", isFullWidth=false, size="large", variant="primary", disabledVariant="neutral", disabled=false, ...otherProps}) => {
    return (
        <ButtonElement type={type} isFullWidth={isFullWidth} size={size} variant={variant} disabledVariant={disabledVariant} disabled={disabled} {...otherProps}>
            <span className="centerContent">
                {text}
            </span>
        </ButtonElement>
    );
}

export default Button;

const ButtonElement = styled.button`
    align-items: center;
    border: none;
    border-radius: 2.75rem;
    display: flex;
    font-family: ${Typography.FONTS.BODY};
    font-weight: ${Typography.WEIGHTS.REGULAR};
    justify-content: center;
    transition: background-color 0.4s;
    ${(props) => {
            if (props.size === "large") {
                return `
                    font-size: ${Typography.BODY_SIZES.L};
                    height: 2.75rem;
                    padding: 0rem 1.25rem;
                `;
            }
            else if (props.size === "medium") {
                return `
                    font-size: ${Typography.BODY_SIZES.S};
                    height: 2.25rem;
                    padding: 0rem 0.875rem;
                `;
            }
            else if (props.size === "small") {
                return `
                    font-size: ${Typography.BODY_SIZES.S};
                    height: 2rem;
                    padding: 0rem 0.875rem;
                `;
            }
        }
    }
    ${props => props.isFullWidth && `
        width: 100%;
    `}
    ${(props) => {
            if (props.disabled) {
                return `
                    background-color: ${Colours.TRANSPARENT};
                    border: 1px solid ${Colours.GRAY_LIGHT};
                    color: ${Colours.BLACK_LIGHTEST_2};
                `;
            }
            else if (props.variant === "primary") {
                return `
                    background-color: ${Colours.PRIMARY};
                    color: ${Colours.BLACK};
                `;
            }
            else if (props.variant === "secondary") {
                return `
                    background-color: ${Colours.BLACK};
                    color: ${Colours.WHITE};
                `;
            }
            else if (props.variant === "neutral-light") {
                return `
                    background-color: ${Colours.BLACK_LIGHTEST_0};
                    color: ${Colours.BLACK};
                `;
            }
        }
    }

    :hover {
        cursor: pointer;
        transition: background-color 0.4s;
        ${(props) => {
                if (props.disabled) {
                    return `
                        cursor: initial;
                    `;
                }
                else if (props.variant === "primary") {
                    return `
                        background-color: ${Colours.PRIMARY_DARK};
                    `;
                }
                else if (props.variant === "secondary") {
                    return `
                        background-color: ${Colours.BLACK_LIGHT};
                    `;
                }
                else if (props.variant === "neutral-light") {
                    return `
                        background-color: ${Colours.BLACK_LIGHTEST_1};
                    `;
                }
            }
        }
    }

    :active {
        ${(props) => {
                if (props.disabled) {
                    return `
                        cursor: initial;
                    `;
                }
                else if (props.variant === "primary") {
                    return `
                        background-color: ${Colours.PRIMARY_DARK};
                    `;
                }
                else if (props.variant === "secondary") {
                    return `
                        background-color: ${Colours.BLACK_LIGHT};
                    `;
                }
                else if (props.variant === "neutral-light") {
                    return `
                        background-color: ${Colours.BLACK_LIGHTEST_1};
                    `;
                }
            }
        }
    }

    span.centerContent {
        align-items: center;
        display: flex;
        flex-grow: 1;
        justify-content: center;
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
`;