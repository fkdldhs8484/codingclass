<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PHP 사이트 만들기</title>

   <!-- css -->
   <link rel="stylesheet" href="../assets/css/style.min.css"/>

   <!-- META -->
   <meta name="autor" content="Leeyuna">
   <meta name="description" content="PHP 사이트 만들기 입니다.">
   <meta name="keyWord" content="사이트, 만들기, 튜토리얼, 웹스토리보이">
   <meta name="robots" content="all">

   <!-- 아이콘 -->
   <link rel="icon" href="assets/img/icon_256.png" />
   <link rel="shortcut icon" href="assets/img/icon_256.png" />
   <link rel="icon" type="image/png" sizes="256x256" href="assets/img/icon_256.png" />
   <link rel="icon" type="image/png" sizes="192x192" href="assets/img/icon_192.png" />
   <link rel="icon" type="image/png" sizes="32x32" href="assets/img/icon_32.png" />
   <link rel="icon" type="image/png" sizes="16x16" href="assets/img/icon_16.png" />
</head>

<body>
    <header id="header">
        <div class="header__inner container">
            <div class="left">
                <ul>
                    <li><a href="main.html" class="star"></a></li>
                </ul>
            </div>
            <h1>
                <a href="main.html">PHP BLOG</a>
            </h1>
            <div class="right">
                <ul>
                    <li><a href="main.html">로그인</a></li>
                    <li class="active"><a href="join.html">회원가입</a></li>
                </ul>
            </div>
            <nav class="nav">
                <ul>
                    <li><a href="#"><span>로그인</span></a></li>
                    <li><a href="#"><span>블로그</span></a></li>
                    <li><a href="#"><span>로그아웃</span></a></li>
                    <li><a href="#"><span>연락처</span></a></li>
                </ul>
            </nav>
        </div>
    </header>
    <!-- header -->

    <main id="main">
        <section id="banner">
            <h2>회원가입 페이지입니다.</h2>
            <div class="banner__inner2 container">
                <div class="img">
                    <img src="../assets/img/banner_img2.svg" alt="배너이미지">
                </div>
                <div class="desc">
                    어떤 일이라도 <em>노력</em>하고 즐기면 그 결과는 <em>빛</em>을 바란다고 생각합니다.<br>
<?php
include '../connect/connect.php';
$youEmail = $_POST['youEmail'];
$youNickName = $_POST['youNickName'];
$youName = $_POST['youName'];
$youPass = $_POST['youPass'];
$youBitrh = $_POST['youBitrh'];
$youPhone = $_POST['youPhone'];
$regTime = time();
$youEmail = $connect->real_escape_string(trim($youEmail));
$youNickName = $connect->real_escape_string(trim($youNickName));
$youName = $connect->real_escape_string(trim($youName));
$youPass = $connect->real_escape_string(trim($youPass));
$youBitrh = $connect->real_escape_string(trim($youBitrh));
$youPhone = $connect->real_escape_string(trim($youPhone));
$youPass = sha1('web' . $youPass);
// 회원가입
$sql = "INSERT INTO myAdminMember(youEmail, youNickName, youName, youPass, youBitrh, youPhone, regTime) VALUES('$youEmail', '$youNickName', '$youName', '$youPass', '$youBitrh', '$youPhone', '$regTime' )";
$result = $connect->query($sql);
if ($result) {
    echo '회원가입을 축하합니다. 로그인을 해주세요!';
} else {
    echo '에러발생 -- 관리자에게 문의하세요!';
}
?>
                </div>
                <a href="#">메인으로</a>
            </div>
        </section>
        <!-- banner -->

    </main>
     <!-- main -->

    <footer id="footer">
        <h2>푸터 영역입니다.</h2>
        <div class="footer__inner container">
            <address>Copyright @2022</address>
            <div>blog</div>
        </div>
    </footer>
    <!-- footer -->

</body>
</html>


