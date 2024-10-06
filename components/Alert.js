import React from 'react';
import styled from 'styled-components';
import { Colours, Typography } from '../definitions';


const Alert = ({className, message, variant="error", onClose, ...otherProps}) => {
    return (
        <Container className={className} variant={variant} message={message}>
            <div className="alertBody">
                <div className="message">{message}</div>
            </div>
            {
                typeof onClose === "function" &&
                <div className="iconContainer" onClick={onClose}>
                    &#10006;
                </div>
            }
        </Container>
    );
};

export default Alert;

const Container = styled.div`
    align-items: center;
    border-radius: 0.75rem;
    box-sizing: border-box;
    display: flex;
    margin: 0.5rem 0rem;
    padding: 0.625rem 1rem;

    ${(props) => {
            if (!props.message) {
                return `
                    display: none;
                `;
            }
        }
    }

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
            }
            else if (props.variant === "success") {
                return `
                    background-color: ${Colours.SUCCESS_LIGHTER};
                    color: ${Colours.SUCCESS_DARK};
                `;
            }
            else if (props.variant === "info") {
                return `
                    background-color: ${Colours.ACCENT_3_LIGHTER};
                    color: ${Colours.ACCENT_3_DARK};
                `;
            }
        }
    }

    .alertBody {
        align-items: center;
        display: flex;
        flex-grow: 1;
        font-size: ${Typography.BODY_SIZES.S};
        font-weight: ${Typography.WEIGHTS.MEDIUM};
        line-height: 1rem;
        justify-content: space-between;
        padding: 0rem 0.5rem;
    }

    .iconContainer {
        color: ${props => props.variant === "success" ? Colours.SUCCESS_DARK : Colours.ERROR_NEON};
        cursor: pointer;
        height: 1rem;
        width: 1rem;
    }
`;