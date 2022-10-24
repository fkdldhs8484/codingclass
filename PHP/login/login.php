  <!-- 로그인 가입 팝업 -->
  <div class="login__popup">
        <div class="login__inner">
            <div class="login__header">
                <h3>로그인</h3>
            </div>
            <div class="login__contents">
                <form name="login" action="../login/loginSave.php" method="post">
                    <fieldset>
                        <!-- <legend>로그인 입력폼</legend> -->
                        <div>
                            <label for="youEmail"></label>
                            <input type="email" name="youEmail" id="youEmail" placeholder="이메일" class="input__style" required>
                        </div>
                        <div>
                            <label for="youPass"></label>
                            <input type="password" name="youPass" id="youPass" placeholder="비밀번호" class="input__style" required>
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