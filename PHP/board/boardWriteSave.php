<?php
include '../connect/connect.php';
include '../connect/session.php';
include '../connect/sessionCheck.php';
$boardTitle = $_POST['boardTitle'];
$boardContents = $_POST['boardContents'];
$boardTitle = $connect->real_escape_string($boardTitle); //real_escape_string ->  특수기호..나..방지
$boardContents = $connect->real_escape_string($boardContents);
$boardView = 1;
$regTime = time();
$myMemberID = $_SESSION['myMemberID']; //회원가입
$sql = "INSERT INTO myBoard(myMemberID, boardTitle, boardContents, boardView, regTime) VALUES('$myMemberID', '$boardTitle', '$boardContents', '$boardView', '$regTime')";
$connect->query($sql);
?>
<script>
    location.href = "board.php";
</script>