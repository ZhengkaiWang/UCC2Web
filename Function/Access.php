<?php
echo "哈哈";
print_r(PDO::getAvailableDrivers());
header('Content-type: text/html; charset=utf-8');
$conn=odbc_connect("Driver={Microsoft Access Driver (*.mdb)};Dbq=ACS",'','');
// $sql='SELECT * FROM Chart';
// $rst=odbc_exec($conn,$sql);
//
// $compname=odbc_result($rst,1);




 ?>
