import React, { useState } from 'react';
import styled from 'styled-components';
import { Colours, Typography } from '../definitions';
import PageLayout from '../components/PageLayout';
import Tabs from "../components/Tabs";


const Todos = () => {
    const [activeTab, setActiveTab] = useState("incomplete");

    return (
        <PageLayout title="Create todo">
            <Container>
                <div className="content">
                    <Tabs tabs={[{title: "incomplete", onClick: () => {setActiveTab("incomplete")}}, {title: "all", onClick: () => {setActiveTab("all")}}]} activeTab={activeTab} />
                </div>
            </Container>
        </PageLayout>
    );
};

export default Todos;

const Container = styled.div`
    width: 100%;

    .content {
        h1 {
            color: ${Colours.BLACK};
            font-size: ${Typography.HEADING_SIZES.M};
            font-weight: ${Typography.WEIGHTS.LIGHT};
            line-height: 2.625rem;
            margin-bottom: 2rem;
            margin-top: 1rem;
        }

        .saveButton {
            margin-top: 1rem;
        }
    }
`;