# CSV importer App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Description

The CSV Importer App is a web application that allows users to upload CSV files containing employee data. The app processes the CSV file, imports the data into a database, and provides a user interface to manage and view the employee records. Users can also edit an employee's email address and view the average salary of each company.

## Features

- **Data Import**: The app processes the uploaded CSV file and imports the employee data into a database.
- **Employee List**: The app displays a list of employees, showing their details such as name, email, company, and salary.
- **Edit Email Address**: Users can edit an employee's email address directly from the user interface.
- **Company Average Salary**: The app calculates and displays the average salary for each company.

## Technologies Used

- **ReactJS**: The project is built using the React JavaScript library, providing a dynamic user interface and efficient component-based development.
- **TypeScript**: TypeScript is used to add static typing to JavaScript, enhancing code maintainability and reducing errors.
- **ES6**: ES6 features are utilized to write modern JavaScript code for improved readability and maintainability.
- **PHP**: PHP is used to develop backend API.

## Installation

Developed using: `React 18.2.0, PHP 8.0`.

To install the project,

Clone the repository and run,

```sh
cd
csv-import
docker-compose up --build
```

## Instructions

- Open the url in the browser after runing the `docker-compose up --build`.
- `http://localhost:3000`
- The CSV importer app will be loaded.
- There is a demo file ( `CsvImporterApp.mp4` ) available in the `docs/` directory.
- Sample CSV file ( `employees.csv` ) available in `docs/` directory.

## Demo

![example usage](docs/CsvImporterApp.mp4)
![sample CSV](docs/employees.csv)

## Notes

To enhance the CSV Importer App, consider implementing better error handling in the API, unit testing, and security through authentication. 


