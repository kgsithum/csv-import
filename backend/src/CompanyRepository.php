<?php

class CompanyRepository 
{
    private mysqli $conn;

    public function __construct(Database $database)
    {
        $this->conn = $database->getConnection();
    }

    public function getCompanies(): array | null {
        $query = "SELECT c.*, ROUND(AVG(e.salary), 2) AS avgSalary 
            FROM company c 
            LEFT JOIN employee e ON c.id = e.company_id
            GROUP BY c.id, c.name
            ORDER BY c.name ASC
        ";
        $result = $this->conn->query($query);
        
        $companies = [];
        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $companies[] = $row;
            }

            return $companies;
        }

        return null;
    }
}