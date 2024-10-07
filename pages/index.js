import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { Colours, Typography } from '../definitions';
import Button from '../components/Button';
import PageLayout from '../components/PageLayout';


const Index = () => {
    return (
        <PageLayout title="Dashboard">
            <Container>
                <div className="content">
                    <img className="logo" src="/img/todox-logo-black.svg" />
                    <div className="buttons">
                        <Link className="noLinkStyling" href="/create">
                            <Button text="Create new todo" size="large" variant="primary" isFullWidth />
                        </Link>
                        <Link className="noLinkStyling" href="/todos">
                            <Button text="My todos" size="large" variant="primary" isFullWidth />
                        </Link>
                    </div>
                </div>
            </Container>
        </PageLayout>
    );
};

export default Index;

const Container = styled.div`
    width: 100%;

    .content {
        .logo {
            height: 8.125rem;
            width: 14.625rem;
        }

        .noLinkStyling {
            text-decoration: none;
        }

        .buttons {
            > * {
                display: block;
                margin-bottom: 0.75rem;

                &:last-child {
                    margin-bottom: 0;
                }
            }
        }
    }
`;