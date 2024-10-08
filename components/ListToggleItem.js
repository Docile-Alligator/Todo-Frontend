import React from "react";
import styled from "styled-components";
import {Colours, Typography} from "../definitions";

const ListToggleItem = ({className, item, toggleOnClick, editOnClick, ...otherProps}) => {
    const [completed, setCompleted] = React.useState(item.completed);

    return (
        <Container className={className}>
            <div className="listToggleItemContent">
                <p className="listToggleItemTitle">{item.name}</p>
                <p className="listToggleItemSubtitle">{item.created}</p>
            </div>
            <div className="listToggleItemControls">
                <img className="listToggleItemToggle"
                     onClick={() => {
                         toggleOnClick(item.todoID, !completed)
                             .then((result) => {
                                 console.log(result);
                                 setCompleted(!completed);
                             }).catch((error) => {
                                 console.log(error);
                             }
                         );
                     }} src={completed ? "/img/checked.png" : "/img/unchecked.png"}/>
                <img className="listToggleItemEdit"
                     onClick={editOnClick} src="/img/edit.png"/>
            </div>
        </Container>
    );
};

export default ListToggleItem;

const Container = styled.li`
    line-height: 32px;
    display: flex;
    
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
    .listToggleItemContent {
        vertical-align: middle;
        flex-grow: 1;
    }

    .listToggleItemContent p {
        text-align: left;
    }
    
    .listToggleItemControls {
        vertical-align: top;
        float: right;
    }
    
    .listToggleItemControls img {
        vertical-align: top;
        display: block;
        width: 36px;
    }

    .iconContainer {
        color: ${props => props.variant === "success" ? Colours.SUCCESS_DARK : Colours.ERROR_NEON};
        cursor: pointer;
        height: 1rem;
        width: 1rem;
    }
`;