// 01 HTML/CSS 디자인 구성
// 02 클릭한 카드 뒤집기
// 03 두개의 카드 뒤집기 확인하기(첫 번째, 두 번째)

const memoryWrap = document.querySelector(".memory__wrap");
const memoryCards = memoryWrap.querySelectorAll(".cards li");

let cardOne, cardTwo;
let disableDeck = false;
let matchedCard = 0;

let sound = [
  "../assets/audio/match.map3",
  "../assets/audio/unmatch.mp4",
  "../assets/audio/success.mp3",
];
let soundMathch = new Audio(sound[0]);
let soundUnMatch = new Audio(sound[1]);
let soundUnSuccess = new Audio(sound[2]);

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
      alert("게임 오버");
    }
    // 일치했을 경우
    cardOne.removeEventListener("click", flipCard);
    cardTwo.removeEventListener("click", flipCard);
    cardOne = cardTwo = ""; // 초기화
    disableDeck = false;

    soundMathch.play();
  } else {
    // 일치하지 않는 경우(틀린 음악, 이미지 (좌,우) 흔들림)
    setTimeout(() => {
      cardOne.classList.add("shakeX");
      cardTwo.classList.add("shakeX");
    }, 500);

    setTimeout(() => {
      cardOne.classList.remove("shakeX", "flip");
      cardTwo.classList.remove("shakeX", "flip");
      cardOne = cardTwo = ""; // 초기화
      disableDeck = false;
    }, 1600);

    soundUnMatch.play();
  }
}

// 카드 섞기
function shuffledCard() {
  cardOne = cardTwo = ""; // 초기화
  disableDeck = false;
  matchedCard = 0;

  let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
  let result = arr.sort(() => (Math.random() > 0.5 ? 1 : -1));

  memoryCards.forEach((card, index) => {
    card.classList.remove("flip");

    setTimeout(() => {
      card.classList.add("flip");
    }, 200 * index);
    // 뒤집
    setTimeout(() => {
      card.classList.remove("flip");
    }, 4000);

    let imgTag = card.querySelector(".back img").src;
    imgTag.src = `/assets/img/Pumpkin&Cat-${arr[index]}.svg`;
  });
}
shuffledCard();

// 카드 클릭
memoryCards.forEach((card) => {
  card.addEventListener("click", flipCard);
});
