<?php
// Load dotenv
require_once __DIR__ . '/vendor/autoload.php';

// Load environment variables from .env file
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();


var_dump($_SERVER['REQUEST_URI']);
var_dump($_ENV['DB_HOST']);