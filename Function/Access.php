<?php
header("Access-Control-Allow-Origin: *");

$typeRcvStr = $_POST['typeStr'];
$serverNameRcvStr = $_POST['serverName'];
$DBNameRcvStr = $_POST['DBName'];
$userNameRcvStr = $_POST['userName'];
$passwordRcvStr = $_POST['passwordStr'];
$SQLRcvStr = $_POST['SQLStr'];

echo $SQLRcvStr;
//连接数据库
//$mysqli = new mysqli($serverNameRcvStr, $userNameRcvStr,$passwordRcvStr,$DBNameRcvStr);
$OdbcConn = odbc_connect("SJ","","" );//连接数据源

//查询
//$mysqli->query("set names utf8");
//$SQLRcvStr = "SELECT * FROM t0002";
$query = $SQLRcvStr;
$result =odbc_exec($OdbcConn,$query);
$arr = array();

while (odbc_fetch_array($result)) {
   $row=odbc_fetch_array($result);
   array_push($arr,$row);
 }
$arr1 = eval('return '.iconv('gbk','utf-8',var_export($arr,true).';'));
$str = json_encode($arr1,JSON_UNESCAPED_UNICODE);
echo $str;
odbc_close($OdbcConn);

 ?>
