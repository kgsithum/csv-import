import React, { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { EmployeeType } from "../types/Types";
import { employeesUrl } from '../config';

const ListEmployees: React.FC = () => {
    const [employees, setEmployees] = useState<Array<EmployeeType>>();
    const [error, setError] = useState('');
    const [isEdit, setIsEdit] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState<EmployeeType>();
    const [email, setEmail] = useState<string>();
    const [isValid, setIsValid] = useState(false);
    const [message, setMessage] = useState<string>();

    const fetchEmployees = async () => {
        try{
            const response = await fetch(employeesUrl);
            const data = await response.json();
            setEmployees(data);
        } catch (e) {
            setError('Something went wrong.');
        }
        
    };

    const handleEdit = (employee: EmployeeType) => {
        setIsEdit(true);
        setSelectedEmployee(employee);
        setEmail(employee.email);
    }

    const resetModal = (): void => {
        setIsEdit(false);
        setSelectedEmployee(undefined);
        setEmail(undefined);
    }

    const handleOnChange = (e: any): void => {
        const newEmail = e.target.value
        setEmail(newEmail);
    }

    const handleSubmit = (event: any) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        } else {
            event.preventDefault();
            updateEmailRequest();
        }
    
        setIsValid(true);
    };

    const updateEmailRequest = async () => {
        if (!selectedEmployee) {
            return;
        }
        const apiUrl = `${employeesUrl}/${selectedEmployee.id}`;

        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        };

        try {
            const response = await fetch(apiUrl, requestOptions);
            const data = await response.json();

            if (response.ok) {
                setMessage('Email updated successfully');
                fetchEmployees();
            } else {
                setMessage(data.message || 'Error updating email');
            }
        } catch (error) {
            setMessage('An error occurred');
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    if (error) {
        return (
            <Alert variant='danger'>
                {error}
            </Alert>
        )
    }

    if (isEdit) {
        return (
            <div
              className="modal show"
              style={{ display: 'block', position: 'initial' }}
            >
              <Modal.Dialog>
                <Modal.Header>
                  <Modal.Title>Edit employee</Modal.Title>
                </Modal.Header>
        
                <Modal.Body>
                    {message &&
                        <p>{message}</p>
                    }
                    <Form noValidate validated={isValid} onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Name" value={selectedEmployee?.name} disabled />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control required type="email" placeholder="Email" onChange={(e) => handleOnChange(e)} value={email} />
                        </Form.Group>
                        <Button variant="secondary" onClick={resetModal}>Close</Button>
                        <Button type="submit" variant="primary">Edit</Button>
                    </Form>
                </Modal.Body>
              </Modal.Dialog>
            </div>
          );
    }

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Company</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Salary</th>
                    <th>Action</th>
                </tr>
            </thead>
            {employees && 
            <tbody>
                {employees.map((employee, index) => {
                    return (
                    <tr key={index}>
                        <td>{employee.id}</td>
                        <td>{employee.company}</td>
                        <td>{employee.name}</td>
                        <td>{employee.email}</td>
                        <td>{employee.salary}</td>
                        <td><Button variant="link" onClick={() => handleEdit(employee)}>Edit</Button></td>
                    </tr>
                    )
                })}
            </tbody>
            }
        </Table>
    );
};

export default ListEmployees;