<?php

class CompanyController 
{
    private CompanyRepository $repository;

    public function __construct(CompanyRepository $repository)
    {
        $this->repository = $repository;
    }

    public function processRequest(string $method, ?string $id): void
    {
        if ($method === 'POST') {
            $request = json_decode(file_get_contents('php://input'), true);
            
            $response = ['id' => 123];
            echo json_encode($response);
        } elseif ($method === 'GET') {
            // Get single resource
            if ($id) {
                $response = ['id' => $id];
            } else { // Get resource list
                $result = $this->repository->getCompanies();
                $response = $result;
            }
            
            echo json_encode($response);
        } else {
            http_response_code(405); // Method Not Allowed
            echo json_encode(array("message" => "Method not allowed"));
        }
        
    }
}