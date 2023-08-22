import React from "react";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import ListEmployees from "./ListEmployees";
import ListCompanies from "./ListCompanies";

const List: React.FC = () => {

    return (
        <Tabs
            defaultActiveKey="employee"
            id="list-tab"
            className="mb-3"
        >
            <Tab eventKey="employee" title="Employees">
                <ListEmployees />
            </Tab>
            <Tab eventKey="company" title="Companies">
                <ListCompanies />
            </Tab>
        </Tabs>
    );
};

export default List;