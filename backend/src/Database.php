<?php

class Database {
    private mysqli $conn;

    public function __construct($hostname, $username, $password, $database) {
        $this->conn = new mysqli($hostname, $username, $password, $database);
    }

    public function getConnection(): mysqli {
        return $this->conn;
    }
}