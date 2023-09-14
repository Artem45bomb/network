<?php
session_start();

require_once "login.php";

function get_post($string){
  return $_POST[$string];
}

function mysql_entities_fix_string($pdo,$string){
  return htmlentities(get_post($pdo,$string));
}

class User{
  function __construct(
  protected string $id,
  protected string $name,
  protected string $email){
  }

  public function getId(){
    return $this->id;
  }
  public function getName(){
    return $this->name;
  }
  public function getEmail(){
    return $this->email;
  }
}

class User_Admin  extends User{
  public function banUser($pdo,$idUser){
    $query = $pdo->prepare("UPDATE FROM users SET ban = 'Да' WHERE id = :idUser");
    $query->bindValue(':idUser', $idUser);
    $query->execute();
  }

  public function deleteUser($pdo,$idUser){
    $query = $pdo->prepare("DELETE FROM users WHERE id = :idUser");
    $query->bindValue(':idUser', $idUser);
    $query->execute();
  }
}

echo "<pre>";
print_r($_POST);
echo "</pre>";


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

  $query2 = $pdo->prepare("SELECT * FROM  admins WHERE password=:password AND email=:email");
  $query2->execute([':password' => $password,':email' => $email]);

	$user=$query->fetchAll();
  $user_admin = $query2->fetchALL();

  if (count($user) > 0 ) {
    $json = json_encode( 'Вы уже зарегистрировались');
    $pdo = null;
    header("Location: http://127.0.0.1:8080/test/error.html");
	}
  else{
  if(count($user_admin) > 0)
  {
    $user_admin = new User_Admin(1,$password,$email);
    $_SESSION['user_admin'] = $user_admin;
  }
  else
  {
    $user = new User(1,$password,$email);
    $_SESSION['user'] = $user;
  }
  $query = $pdo->prepare("INSERT INTO users VALUES (NULL, :passwords,:email,'Нет')");
  $query->execute([':passwords' => $password,':email' => $email]);

  $pdo = null;

  $json = json_encode($_POST);
  $fs = fopen('../json/user.json', 'w');
  fwrite($fs, $json);
  fclose($fs);
  header("Location: http://127.0.0.1:8080/test/api/setUsers.php");
  }

  
  }
}

?>