<?php
require_once "login.php";

function get_post($string){
   return $_POST[$string];
}

function setError($value,$url){
   $json = json_encode($value);
   $fs = fopen('../json/error.json', 'w');
	fwrite($fs, $json);
	fclose($fs);
}

if($_SERVER['REQUEST_METHOD'] == "POST"){
   if(!empty($_POST['email']) && !empty($_POST['password'])){
   try{
   $pdo = new PDO("mysql:host=localhost;dbname=$dbname; port=$port; charset=UTF8",$username,$password);
   }
   catch(PDOException $exception){
   print_r($exception->getMessage());
   }

   $password = get_post('password');
   $email = get_post('email');

  	$query = $pdo->prepare("SELECT * FROM users WHERE password=:password AND email=:email");
   $query->execute([':password' => $password,':email' => $email]);
	$user=$query->fetchAll();


if (count($user) > 0) {
	foreach($user as $row){
      if($row['ban']==='Да'){
      $pdo = null;
      $json = json_encode( "Вы забанены");
      $fs = fopen('../json/error.json', 'w');
	   fwrite($fs, $json);
	   fclose($fs);
      header("Location: http://127.0.0.1:8080/test/error.html");
      }
      else{
      $json = json_encode($row);
	   $fs = fopen('../json/user.json', 'w');
	   fwrite($fs, $json);
	   fclose($fs);
      $pdo = null;
      header("Location: http://127.0.0.1:8080/test/api/setUsers.php");
      }
	}
} else {
   $json = json_encode( "Пользователь не найден");
   $fs = fopen('../json/error.json', 'w');
	fwrite($fs, $json);
	fclose($fs);
   $pdo = null;
   header("Location: http://127.0.0.1:8080/test/error.html");
}
}

}


?>