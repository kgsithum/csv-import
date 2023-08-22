<?php
declare(strict_types=1);

// Load dotenv
require_once __DIR__ . '/vendor/autoload.php';
require __DIR__ . '/src/EmployeeRepository.php';
require __DIR__ . '/src/EmployeeController.php';
require __DIR__ . '/src/CompanyRepository.php';
require __DIR__ . '/src/CompanyController.php';
require __DIR__ . '/src/Database.php';

// Load environment variables from .env file
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

// Allow requests from any origin (replace * with your frontend's origin if possible)
header("Access-Control-Allow-Origin: *");
// Allow specific HTTP methods
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT");
header("Access-Control-Allow-Headers: Content-Type");

header("Content-type: application/json; charset=UTF-8");

// Handle the preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit(); // End the script for preflight requests
}

$parts = explode("/", $_SERVER["REQUEST_URI"]);

$resource = $parts[1];
$validResources = ['employees', 'companies'];
if (!in_array($resource, $validResources)) {
    http_response_code(404);
    exit;
}

$id = (isset($parts[2]) && strlen($parts[2])) ? $parts[2] : null;

try {
    $database = new Database($_ENV['DB_HOST'], $_ENV['DB_USER'], $_ENV['DB_PASSWORD'], $_ENV['DB_DB']);
    $conn = $database->getConnection();
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(array("message" => "Unable to connect to the database."));
    exit;
}

switch ($resource) {
    case 'employees':
        $employeeRepository = new EmployeeRepository($database);
        $employeeController = new EmployeeController($employeeRepository);
        
        $employeeController->processRequest($_SERVER['REQUEST_METHOD'], $id);
        exit;
    break;

    case 'companies':
        $companyRepository = new CompanyRepository($database);
        $companyController = new CompanyController($companyRepository);
        
        $companyController->processRequest($_SERVER['REQUEST_METHOD'], $id);
        exit;
    break;

    default:
        http_response_code(404);
        exit;
}