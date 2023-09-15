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

   $query = $pdo->prepare("DELETE FROM friends WHERE userId1=:userId1 AND userId2=:userId2");
   $query->execute([
      ':userId1' => $_POST['user']['id'],
      ':userId2' => $_POST['friend']['id']
   ]);
   $query = $pdo->prepare("DELETE FROM friends WHERE userId1=:userId2 AND userId2=:userId1");
   $query->execute([
      ':userId1' => $_POST['user']['id'],
      ':userId2' => $_POST['friend']['id']
   ]);

   $pdo = null;

   $json = json_encode($_POST);
   $fs = fopen('../json/result.json', 'w');
   fwrite($fs, $json);
   fclose($fs);
}



// Вывод полученного email
