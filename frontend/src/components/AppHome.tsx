import React from "react";
import Card from 'react-bootstrap/Card';

const AppHome: React.FC = () => {

    return (
        <Card>
            <Card.Header>CSV Importer App</Card.Header>
            <Card.Body>
                <Card.Title>App home</Card.Title>
                <Card.Text>
                    This is the home page.
                </Card.Text>
            </Card.Body>
        </Card>
    );
};

export default AppHome;