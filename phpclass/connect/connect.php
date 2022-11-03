<?php
    $host = "localhost";
    $user = "fkdldhs8484";
    $pw = "dlWjddls8484!";
    $db = "fkdldhs8484";
    $connect = new mysqli($host, $user, $pw, $db);
    $connect -> set_charset("utf8");
    if(mysqli_connect_errno()){
        echo "database connect false";
    } else {
        echo "database connect true";
    }
?>