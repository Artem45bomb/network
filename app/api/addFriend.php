<?php
require_once 'login.php';
//не работает 
$_POST = json_decode(file_get_contents('php://input'), true);

if (!empty($_POST['user']) && !empty($_POST['friend'])) {
   try {
      $pdo = new PDO("mysql:host=localhost;dbname=$dbname;port=$port;charset=UTF8", $username, $password);
   } catch (PDOException $exception) {
   print_r($exception->getMessage());
   }

   $query = $pdo->prepare("INSERT INTO friends VALUES (:userId1, :userId2, 'Да')");
   $query->execute([
      ':userId1' => $_POST['user']['id'],
      ':userId2' => $_POST['friend']['id']
   ]);
   $query = $pdo->prepare("INSERT INTO friends VALUES (:userId2, :userId1, 'Да')");
   $query->execute([
      ':userId1' => $_POST['user']['id'],
      ':userId2' => $_POST['friend']['id']
   ]);

   $pdo = null;

}



// Вывод полученного email
