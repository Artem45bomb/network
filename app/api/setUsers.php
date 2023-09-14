<?php
require_once "login.php";

   try{
   $pdo = new PDO("mysql:host=localhost;dbname=$dbname; port=$port; charset=UTF8",$username,$password);
   }
   catch(PDOException $exception){
   print_r($exception->getMessage());
   }
  	$query = $pdo->prepare("SELECT * FROM users ");
   $query->execute();
	$user=$query->fetchAll();

	if (count($user) > 0) {
      $json = json_encode($user);
	   $fs = fopen('../json/users.json', 'w');
	   fwrite($fs, $json);
	   fclose($fs);
		echo "<pre>";
		print_r($user);
		echo "</pre>";
      $pdo = null;
      
   
	}

	header("Location: http://127.0.0.1:8080/test/main.html");




?>