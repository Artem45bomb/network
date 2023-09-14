<?php
//не работает 
$data = json_decode(file_get_contents('php://input'), true);
$email = $data['email'];

echo $email;
// Вывод полученного email
