import React, { useState } from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import List from "./List";
import styles from './AppHome.module.css';
import { employeesUrl } from '../config';
import Alert from 'react-bootstrap/Alert';

const AppHome: React.FC = () => {
    const [isValid, setIsValid] = useState(false);
    const [message, setMessage] = useState<string>();
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
            if (selectedFile.type !== 'text/csv') {
                setMessage('Please select a CSV file.');
            } else {
                setFile(selectedFile);
                setMessage('');
            }
        }
    };

    const handleSubmit = (event: any) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        } else {
            event.preventDefault();
            importCsvRequest();
        }
    
        setIsValid(true);
    };

    const importCsvRequest = async () => {

        if (!file) {
            setMessage('Please select a CSV file.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        const requestOptions = {
            method: 'POST',
            body: formData,
        };

        try {
            const response = await fetch(employeesUrl, requestOptions);
            const data = await response.json();

            if (response.ok) {
                setMessage('CSV imported successfully!');
                window.location.reload();
            } else {
                setMessage(data.message || 'Error importing CSV');
            }
        } catch (error) {
            setMessage('An error occurred');
        }
    };

    return (
        <>
        <Card>
            <Card.Header>CSV Importer App</Card.Header>
            <Card.Body>
                <Card.Title>Import CSV file</Card.Title>
                <Card.Text>
                    Import employees CSV file to store data.
                </Card.Text>
                {message &&
                <Alert variant="dark">
                    {message}
                </Alert>
                }
                <Form noValidate validated={isValid} onSubmit={handleSubmit}>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>CSV file</Form.Label>
                        <Form.Control required type="file" onChange={handleFileChange} />
                    </Form.Group>
                    <Button type="submit" variant="primary">Import CSV</Button>
                </Form>
            </Card.Body>
        </Card>
        <div className={styles.listContainer}>
            <List />
        </div>
        </>
    );
};

export default AppHome;