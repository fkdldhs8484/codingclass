// 01 HTML/CSS 디자인 구성
// 02 클릭한카드 뒤집기
// 03 두개의 카드 뒤집고 확인하기(첫번째카드, 두번째카드)

const memoryWrap = document.querySelector(".memory__wrap");
const memoryCard = document.querySelector(".memory__card");
const memoryCards = document.querySelectorAll(".cards li");
const GameOverPopup = document.querySelector(".memory__gameOver__msg");
// const gameOverH3 = document.querySelector(".memory__gameOver__msg h3");
const gameOverScore = document.querySelector(".gameOver__msg");
const retryBtn = document.querySelector(".memory__retry__btn");
const scoree = document.querySelector(".memory__score > span");

let cardOne, cardTwo;
let disableDeck = false;
let matchedCard = 0;
let matchScore = 100;

let sound = [
    "../assets/audio/match.mp3",
    "../assets/audio/unmatch.mp3",
    "../assets/audio/sucess.mp3",
];
let soundMatch = new Audio(sound[0]);
let soundUnMatch = new Audio(sound[1]);
let soundSuccess = new Audio(sound[2]);

// 카드 뒤집기
function flipCard(e) {
    let clickedCard = e.target;

    // if(!cardTwo){
    //     cardOne = NULL;
    //     cardTwo = NULL;
    // }
    if (clickedCard != cardOne && !disableDeck) {
        clickedCard.classList.add("flip");

        if (!cardOne) {
            return (cardOne = clickedCard);
        }
        cardTwo = clickedCard;
        disableDeck = true;

        // 카드정보 가져오기
        let cardOneImg = cardOne.querySelector(".back img").src;
        let cardTwoImg = cardTwo.querySelector(".back img").src;

        matchcards(cardOneImg, cardTwoImg);
    }
}
// 카드 확인(두개의 이미지 비교)
function matchcards(img1, img2) {
    if (img1 == img2) {
        // 같을 경우
        matchedCard++;

        if (matchedCard == 8) {
            soundSuccess.play();
            memoryCard.style.pointerEvents = "none";
            setTimeout(() => {
                // alert("게임 승리!");
                GameOverPopup.classList.add("show");
                gameOverScore.innerHTML = `<span>${matchScore}</span> 점입니다!`;
            }, 500);
        }
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        cardOne = cardTwo = "";
        disableDeck = false;
        soundMatch.play();
    } else {
        // 일치하지 않으면 틀린음악 + 이미지 쉐이크
        setTimeout(() => {
            cardOne.classList.add("shakeX");
            cardTwo.classList.add("shakeX");
        }, 400);

        setTimeout(() => {
            cardOne.classList.remove("shakeX", "flip");
            cardTwo.classList.remove("shakeX", "flip");
            cardOne = cardTwo = "";
            disableDeck = false;
        }, 1600);
        matchScore = matchScore - 5;
        soundUnMatch.play();
        if (matchScore == 0) {
            memoryCard.style.pointerEvents = "none";
            GameOverPopup.classList.add("show");
            gameOverH3.innerText = "GAME OVER!";
            gameOverScore.innerHTML = `<span>${matchScore}</span> 점입니다!`;
        }
    }
    scoree.innerText = matchScore;
}

// 카드 섞기
function shuffledCard() {
    cardOne = cardTwo = "";
    disableDeck = false;
    matchedCard = 0;
    scoree.innerText = matchScore;

    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    let result = arr.sort(() => (Math.random() > 0.5 ? 1 : -1));

    memoryCards.forEach((card, index) => {
        card.classList.remove("flip");

        setTimeout(() => {
            card.classList.add("flip");
        }, 200 * index);

        setTimeout(() => {
            card.classList.remove("flip");
        }, 5000);

        setTimeout(() => {
            memoryCard.style.pointerEvents = "auto";
        }, 200 * index + 5000);

        // 클릭 카드 뒤집기
        memoryCards.forEach((card) => {
            card.addEventListener("click", flipCard);
        });

        let imgTag = card.querySelector(".back img");
        imgTag.src = `../assets/img/Pumpkin&Cat-${arr[index] + 1}.svg`;
    });
}

// 리셋
function memoryReset() {
    memoryStartPopup.classList.add("show");
    cardOne = cardTwo = "";
    disableDeck = false;
    matchedCard = 0;
    matchScore = 100;
    scoree.innerText = "0";
    memoryCards.forEach((card) => {
        card.classList.remove("flip");
    });
}

// 게임 시작 버튼 클릭
const memoryStartBtn = document.querySelector(".memory__start__btn");
const memoryStartPopup = document.querySelector(".memory__info");

memoryStartBtn.addEventListener("click", () => {
    memoryStartPopup.classList.remove("show");

    soundMatch.play();
    shuffledCard();
});

// 재시작
retryBtn.addEventListener("click", () => {
    GameOverPopup.classList.remove("show");
    memoryReset();
});

// 게임 끄기
const memoryCloseBtn = document.querySelector(".memory__close__btn");

memoryCloseBtn.addEventListener("click", () => {
    memoryReset();
});
