<?php

class EmployeeRepository 
{
    private mysqli $conn;

    public function __construct(Database $database)
    {
        $this->conn = $database->getConnection();
    }

    public function getEmployees(): array | null {
        $query = "SELECT e.*, c.name AS company FROM employee e INNER JOIN company c ON e.company_id = c.id ORDER BY e.name ASC";
        $result = $this->conn->query($query);
        
        $employees = [];
        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $employees[] = $row;
            }

            return $employees;
        }

        return null;
    }

    public function editEmployee(int $id, string $newEmail): bool {
        $st = $this->conn->prepare("UPDATE employee SET email = ?, updated_at = ? WHERE id = ?");
        $updatedAt = date("Y-m-d H:i:s");
        $st->bind_param("ssi", $newEmail, $updatedAt, $id);
        $result = $st->execute();
        $st->close();
        return $result;
    }

    public function insertEmployee(array $data): bool
    {
        $companyName = $data[0];
        $empName = $data[1];
        $email = $data[2];
        $salary = (int) $data[3];

        //Get the company
        $stmtC = $this->conn->prepare("SELECT * FROM company WHERE name = ? LIMIT 1");
        $stmtC->bind_param("s", $companyName);
        $stmtC->execute();

        $result = $stmtC->get_result();
        $company = $result->fetch_assoc();

        if (!$company) {
            // Company does not exist, insert it and return the inserted ID
            $stmtInsert = $this->conn->prepare("INSERT INTO company (name) VALUES (?)");
            $stmtInsert->bind_param("s", $companyName);
            $insertResult = $stmtInsert->execute();

            if ($insertResult) {
                $companyId = $stmtInsert->insert_id;
            } else {
                // Unable to insert the company
                $stmtInsert->close();
                return false;
            }
        } else {
            $companyId = $company['id'];
        }

        // Insert into database
        $stmt = $this->conn->prepare("INSERT INTO employee (company_id, name, email, salary) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("issi", $companyId, $empName, $email, $salary);
        $result = $stmt->execute();

        $stmt->close();

        return $result;
    }
}