<?php

use Ramsey\Uuid\Uuid;

require_once 'C:\xampp\htdocs\test\vendor/autoload.php';

$uuid = (string)Uuid::uuid4();

echo $uuid;