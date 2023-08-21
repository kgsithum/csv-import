<?php

try {
    $connect = new mysqli('mysql', 'db_user', 'dbuserpwd', 'db_employee');

    echo "CONNECTED";

} catch (Exeption $e) {
    throw new Exception($e->getMessage());
}
