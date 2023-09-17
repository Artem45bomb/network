<?php
require_once 'login.php';
//не работает 
$_POST = json_decode(file_get_contents('php://input'), true);

function setJSON($value,$url){
   $json = json_encode($value);
   $fs = fopen($url, 'w');
	fwrite($fs, $json);
	fclose($fs);
}

if (!empty($_POST['user']) && !empty($_POST['friend'])) {
   try {
      $pdo = new PDO("mysql:host=localhost;dbname=$dbname;port=$port;charset=UTF8", $username, $password);
   } catch (PDOException $exception) {
   print_r($exception->getMessage());
   }

   $query = $pdo->prepare("SELECT * FROM friends WHERE userId1=:userId1 AND userId2=:userId2");
   $query->execute([
      ':userId1' => $_POST['user']['id'],
      ':userId2' => $_POST['friend']['id']
   ]);
   $users = $query->fetchAll();
if(count($users)>0){
   $query2 = $pdo->prepare("DELETE FROM friends WHERE userId1=:userId1 AND userId2=:userId2");
   $query2->execute([
      ':userId1' => $_POST['user']['id'],
      ':userId2' => $_POST['friend']['id']
   ]);
   $query3 = $pdo->prepare("DELETE FROM friends WHERE userId1=:userId2 AND userId2=:userId1");
   $query3->execute([
      ':userId1' => $_POST['user']['id'],
      ':userId2' => $_POST['friend']['id']
   ]);
}
   $query4 = $pdo->prepare("SELECT * FROM friends WHERE userId1=:userId1");
   $query4->execute(['userId1' => $_POST['user']['id']]);
   $friends = $query4->fetchAll();
   setJSON($friends,'../json/friends.json');

   $pdo = null;

   
}



// Вывод полученного email
