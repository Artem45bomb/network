<?php
require_once "login.php";

function get_post($string){
   return $_POST[$string];
}



function setJSON($value,$url){
   $json = json_encode($value);
   $fs = fopen($url, 'w');
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
      setJSON("Вы забанены",'../json/error.json');
      header("Location: http://127.0.0.1:8080/test/error.html");
      }
      else{
         try{
         $query2 = $pdo->prepare("SELECT * FROM friends WHERE userId1=:userId1");
         $query2->execute(['userId1' => $row['id']]);
         $friends = $query2->fetchAll();
         }
         catch(error){
            echo error."Hello";
         }

            setJSON($friends,'../json/friends.json');

         setJSON($row,'../json/user.json');
         
      $pdo = null;
      header("Location: http://127.0.0.1:8080/test/api/setUsers.php");
      }
	}
} else {
   setJSON("Пользователь не найден",'../json/error.json');
   $pdo = null;
   header("Location: http://127.0.0.1:8080/test/error.html");
}
}

}


?>