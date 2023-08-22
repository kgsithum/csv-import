import React, { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { CompanyType } from "../types/Types";
import { companiesUrl } from '../config';
import Alert from 'react-bootstrap/Alert';

const ListCompanies: React.FC = () => {
    const [companies, setCompanies] = useState<Array<CompanyType>>();
    const [error, setError] = useState('');

    const fetchCompanies = async () => {
        try{
            const response = await fetch(companiesUrl);
            const data = await response.json();
            setCompanies(data);
        } catch (e) {
            setError('Something went wrong.');
        }
        
    };

    useEffect(() => {
        fetchCompanies();
    }, []);

    if (error) {
        return (
            <Alert variant='danger'>
                {error}
            </Alert>
        )
    }
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Average salary</th>
                    <th>Action</th>
                </tr>
            </thead>
            {companies &&
            <tbody>
                {companies.map((company, index) => {
                    return (
                    <tr key={index}>
                        <td>{company.id}</td>
                        <td>{company.name}</td>
                        <td>{company.avgSalary}</td>
                        <td><Button variant="link">Edit</Button></td>
                    </tr>
                    )
                })}
            </tbody>
            }
        </Table>
    );
};

export default ListCompanies;