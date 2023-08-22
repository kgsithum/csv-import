<?php

class EmployeeController 
{
    private EmployeeRepository $repository;

    public function __construct(EmployeeRepository $repository)
    {
        $this->repository = $repository;
    }

    public function processRequest(string $method, ?string $id): void
    {
        if ($method === 'POST') {
            if (isset($_FILES['file'])) {
                $uploadedFile = $_FILES['file'];
        
                if ($uploadedFile['error'] === UPLOAD_ERR_OK) {
                    // Validate file type (CSV)
                    if ($uploadedFile['type'] !== 'text/csv') {
                        http_response_code(400);
                        echo json_encode(array("message" => "Invalid file type. Please upload a CSV file."));
                        exit();
                    }
        
                    $filePath = $uploadedFile['tmp_name'];
        
                    // Read and process CSV file
                    $handle = fopen($filePath, 'r');
                    if ($handle !== false) {
        
                        $count = 0;
        
                        while (($data = fgetcsv($handle)) !== false) {
                            // Skip CSV heading
                            if ($count !== 0) {
                                $result = $this->repository->insertEmployee($data);
                            }

                            $count++;
                        }
        
                        fclose($handle);
        
                        http_response_code(200);
                        echo json_encode(array("message" => "CSV imported."));
                    } else {
                        http_response_code(500);
                        echo json_encode(array("message" => "Failed to read CSV file."));
                    }
                } else {
                    http_response_code(400);
                    echo json_encode(array("message" => "File upload failed."));
                }
            } else {
                http_response_code(400);
                echo json_encode(array("message" => "No file uploaded."));
            }
        } elseif ($method === 'GET') {
            // Get single employee
            if ($id) {
                // ToDo: implement 
                $response = ['id' => $id];
            } else { // Get employee list
                $result = $this->repository->getEmployees();
                $response = $result;
            }
            
            echo json_encode($response);

        } elseif ($method === 'PUT') {
            $request = json_decode(file_get_contents('php://input'), true);
            
            if (isset($request['email']) && $id) {
                $empId = (int) $id;
                $result = $this->repository->editEmployee($empId, $request['email']);

                if ($result) {
                    echo json_encode(array("message" => "Employee email has been updated."));
                } else {
                    http_response_code(500);
                    echo json_encode(array("message" => "Something went wrong"));
                }
            } else {
                http_response_code(400);
                echo json_encode(array("message" => "Invalid request"));
            }
        } else {
            http_response_code(405); // Method Not Allowed
            echo json_encode(array("message" => "Method not allowed"));
        }
    }
}