<?php

  $typeRcvStr = $_POST['typeStr'];
  $serverNameRcvStr = $_POST['serverName'];
  $DBNameRcvStr = $_POST['DBName'];
  $userNameRcvStr = $_POST['userName'];
  $passwordRcvStr = $_POST['passwordStr'];
  $SQLRcvStr = $_POST['SQLStr'];
  // echo $serverNameRcvStr;
  // echo $DBNameRcvStr;
  // echo $userNameRcvStr;
  // echo $passwordRcvStr;

  //连接数据库
  $mysqli = new mysqli($serverNameRcvStr, $userNameRcvStr,$passwordRcvStr,$DBNameRcvStr);
  //$mysqli = new mysqli("117.185.4.74", "softyoung", "softyoung2017.",$fileNameRcvStr);


  /* check connection */
  if (mysqli_connect_errno()) {
      //printf("Connect failed: %s\n", $mysqli_connect_error);
      exit();
  }
  //printf("Host information: %s\n", $mysqli->host_info);

  //查询
  $mysqli->query("set names utf8");
  $query = $SQLRcvStr;
  $result = $mysqli->query($query);

  //echo $result->num_rows;
  //echo $result->field_count;

  $arr = array();

  while($row = $result->fetch_array())
  {
    array_push($arr,$row);
    //print_r($arr);
    $str = json_encode($arr,JSON_UNESCAPED_UNICODE);
  }

  // print_r($arr);
  echo $str;

  //释放结果集
  $result->free();

  /* close connection */
  $mysqli->close();


 ?>
