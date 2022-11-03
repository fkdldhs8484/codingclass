// 01 HTML/CSS 디자인 구성
// 02 클릭한 카드 뒤집기
// 03 두개의 카드 뒤집기 확인하기(첫 번째, 두 번째)

const memoryWrap = document.querySelector(".memory__wrap");
const memoryCard = memoryWrap.querySelectorAll(".cards li");
const memoryStartBtn = document.querySelector(".memory__start__btn");
const memoryStart = document.querySelector(".memory__start");
const memoryStartPopup = document.querySelector(".memory__info");
const GameOverPopup = document.querySelector(".memory__gameOver");
const gameOverMsg = document.querySelector(".gameOver__msg");
const score = document.querySelector(".memory__score > span");

let cardOne, cardTwo;
let disableDeck = false;
let matchedCard = 0;
let matchedscore = 0;

let sound = [
    "../assets/audio/match.mp3",
    "../assets/audio/unmatch.mp3",
    "../assets/audio/success.mp3",
];
let soundMatch = new Audio(sound[0]);
let soundUnMatch = new Audio(sound[1]);
let soundSuccess = new Audio(sound[2]);

// 게임 시작 버튼 클릭
memoryStartBtn.addEventListener("click", () => {
    memoryStartPopup.classList.remove("show");

    soundMatch.play();
    shuffledCard();
});

// 카드 뒤집기
function flipCard(e) {
    let clickedCard = e.target;
    // && !disableDeck 중복제거
    if (clickedCard !== cardOne && !disableDeck) {
        clickedCard.classList.add("flip");

        // 카드 2개 정보 갖고오기
        if (!cardOne) {
            return (cardOne = clickedCard);
        }

        cardTwo = clickedCard;
        disableDeck = true;

        let cardOneImg = cardOne.querySelector(".back img").src;
        let cardTwoImg = cardTwo.querySelector(".back img").src;

        matchCards(cardOneImg, cardTwoImg);
    }
}

// 카드 확인(두개의 이미지 비교)
function matchCards(img1, img2) {
    if (img1 == img2) {
        // 같을 경우
        matchedCard++;

        // 만약
        if (matchedCard == 8) {
            soundSuccess.play();
            memoryCard.style.pointerEvents = "none";
            // alert("게임 오버");
            matchedscore = matchedscore + 5;
            setTimeout(() => {
                GameOverPopup.classList.add("show");
                gameOverScore.innerHTML = `<span>${matchScore}</span> 점입니다!`;
            }, 500);
        }
        // 일치했을 경우
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        cardOne = cardTwo = ""; // 초기화
        disableDeck = false;
        soundMatch.play(); // 음악
    } else {
        // 일치하지 않는 경우(틀린 음악, 이미지 (좌,우) 흔들림)
        setTimeout(() => {
            cardOne.classList.add("shakeX");
            cardTwo.classList.add("shakeX");
        }, 200);

        setTimeout(() => {
            cardOne.classList.remove("shakeX", "flip");
            cardTwo.classList.remove("shakeX", "flip");
            cardOne = cardTwo = ""; // 초기화
            disableDeck = false;
        }, 1600);

        setTimeout(() => {
            GameOverPopup.classList.add("show");
            gameOverMsg.innerHTML = `<span>${matchedscore}</span> 점입니다!`;
        });

        soundUnMatch.play();
    }
    score.innerText = matchedscore;
}

// 카드 섞기
function shuffledCard() {
    cardOne = cardTwo = ""; // 초기화
    disableDeck = false;
    matchedCard = 0;

    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    let result = arr.sort(() => (Math.random() > 0.5 ? 1 : -1));

    memoryCard.forEach((card, index) => {
        card.classList.remove("flip");

        setTimeout(() => {
            card.classList.add("flip");
        }, 200 * index);

        // 뒤집
        setTimeout(() => {
            card.classList.remove("flip");
        }, 4000);

        let imgTag = card.querySelector(".back img");
        imgTag.src = `../assets/img/Pumpkin&Cat-${arr[index]}.svg`;
    });
}
shuffledCard();

// 카드 클릭
memoryCard.forEach((card) => {
    card.addEventListener("click", flipCard);
});
