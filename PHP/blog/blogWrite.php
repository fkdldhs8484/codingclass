<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PHP 사이트 만들기</title>

    <!-- css -->
    <link rel="stylesheet" href="../assets/css/style.min.css" />

    <!-- META -->
    <meta name="autor" content="Leeyuna">
    <meta name="description" content="PHP 사이트 만들기 입니다.">
    <meta name="keyWord" content="사이트, 만들기, 튜토리얼, 웹스토리보이">
    <meta name="robots" content="all">

    <!-- 아이콘 -->
    <link rel="icon" href="../assets/img/icon_256.png" />
    <link rel="shortcut icon" href="../assets/img/icon_256.png" />
    <link rel="icon" type="image/png" sizes="256x256" href="../assets/img/icon_256.png" />
    <link rel="icon" type="image/png" sizes="192x192" href="../assets/img/icon_192.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="../assets/img/icon_32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="../assets/img/icon_16.png" />

</head>

<body>

    <div id="skip">
        <a href="header">헤더 영역 바로가기</a>
        <a href="main">컨텐츠 영역 바로가기</a>
        <a href="footer">푸터 영역 바로가기</a>
    </div>
    <!-- skip -->

    <header id="header">
        <div class="header__inner container">
            <div class="left">
                <ul>
                    <li><a href="#" class="star"></a></li>
                </ul>
            </div>
            <h1>
                <a href="#">PHP BLOG</a>
            </h1>
            <div class="right">
                <ul>
                    <li><a href="#">로그인</a></li>
                    <li><a href="joinAgree.html">회원가입</a></li>
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
        <section id="blogWrite">
            <h2>블로그 글쓰기</h2>
            <div class="write__inner container">
                <form action="blogWriteSave.php" name="blogWrite" method="post" enctype="multipart/form-data">
                    <fieldset>
                        <legend>블로그 게시글 작성 영역</legend>
                        <div>
                            <label for="blogCategory">카테고리</label>
                            <select name="blogCategory" id="blogCategory">
                                <option value="javascript">javascript</option>
                                <option value="jquery">jquery</option>
                                <option value="html">html</option>
                                <option value="css">css</option>
                            </select>
                        </div>
                        <div>
                            <label for="blogtitle">제목</label>
                            <input type="text" name="blogTitle" id="blogTitle" placeholder="제목을 넣어주세요" required>
                        </div>
                        <div>
                            <label for="blogContents">내용</label>
                            <textarea name="blogContents" id="blogContents" placeholder="내용을 넣어주세요" required></textarea>
                        </div>
                        <div>
                            <label for="blogFile">내용</label>
                            <input type="file" name="blogFile" id="blogFile" accept=".jpg, .jpeg, .png, .gif" placeholder="jpg, jpeg, png,.gif 파일만 넣어주세요">
                        </div>
                        <button type="submit" value="저장하기">저장하기</button>
                    </fieldset>
                </form>
            </div>
        </section>
        <!-- blogWrite -->
    </main>
    <!-- main -->

    <footer id="footer">
        <h2>푸터 영역입니다.</h2>
        <div class="footer__inner container">
            <address>Copyright @2022 webstoryboy</address>
            <div>blog by webstoryboy</div>
        </div>
    </footer>
    <!-- footer -->


    <!-- 로그인 가입 팝업 -->
    <div class="login__popup ">
        <div class="login__inner">
            <div class="login__header">
                <h3>로그인</h3>
            </div>
            <div class="login__contents">
                <form name="login" action="loginSave.php" method="post">
                    <fieldset>
                        <legend>로그인 입력폼</legend>
                        <div>
                            <label for="youEmail">이메일</label>
                            <input type="email" name="youEmail" id="youEmail" placeholder="이메일" class="input__style"
                                required>
                        </div>
                        <div>
                            <label for="youPass">비밀번호</label>
                            <input type="password" name="youPass" id="youPass" placeholder="비밀번호" class="input__style"
                                required>
                        </div>
                        <button type="submit" class="input__button">로그인</button>
                    </fieldset>
                </form>
            </div>
            <div class="login__footer">
                <div class="btn">
                    <a href="#">회원가입</a>
                    <a href="#">아이디 찾기</a>
                    <a href="#">비밀번호 찾기</a>
                </div>
                <ul class="desc">
                    <li>비밀번호 분실시 책임은 알아서 합니다.</li>
                    <li>회원가입하면 이익은 없습니다. 도움되는 것도 없을거예요!</li>
                    <li>개발자가 초급이여서 개인정보는 노출 될 수 있습니다.</li>
                </ul>
                <button type="button" class="btn-close"><span>닫기</span> </button>
            </div>
        </div>
    </div>

</body>

</html>