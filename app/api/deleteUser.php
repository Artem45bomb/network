<?php 
require_once "login.php";


if(!empty($_POST["id"]) && !empty($_SESSION['user_admin'])){
	$user_admin = $_SESSION['user_admin'];
	$userId = $_POST['id'];
	try{
		$pdo = new PDO("mysql:host=localhost;dbname=$dbname; port=$port; charset=UTF8",$username,$password);
	}
	catch(PDOException $exception){
		print_r($exception->getMessage());
	}
	$user_admin->deleteUser($pdo,$userId);
	$pdo=null;
}