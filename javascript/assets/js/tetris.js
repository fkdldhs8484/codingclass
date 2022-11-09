const tetrisWrap = document.querySelector(".tetris__wrap");
const playground = tetrisWrap.querySelector(".playground > ul");
const tetrisStart = tetrisWrap.querySelector(".tetris__start");
const tetrisRestart = tetrisWrap.querySelector(".tetris__restart");
const tetrisInfo = tetrisWrap.querySelector(".tetris__info");
const startBtn = tetrisWrap.querySelector(".start__btn");
const restartBtn = tetrisWrap.querySelector(".restart__btn");
const resultLine = tetrisWrap.querySelector(".tetris__total .line span");
const resultScore = tetrisWrap.querySelector(".tetris__score span");
const tetrisIcon = document.querySelector(".icon4");
const tetrisCloseBtn = document.querySelector(".tetris__close__btn");
let tetrisMusic = new Audio("../assets/audio/m1.mp3");

// variables
let rows = 20;
let cols = 12;
let score = 0;
let duration = 500;
let downInterval;
let tempMovingItem;
let tetrisTime = 0;
let tetrisScore = 0;

// 블록 정보
const movingItem = {
    type: "Imino",
    directioin: 0, //블록 모양
    top: 0,
    left: 0,
};

// 블록 좌표값
const blocks = {
    Tmino: [
        [
            [2, 1],
            [0, 1],
            [1, 0],
            [1, 1],
        ],
        [
            [1, 2],
            [0, 1],
            [1, 0],
            [1, 1],
        ],
        [
            [1, 2],
            [0, 1],
            [2, 1],
            [1, 1],
        ],
        [
            [2, 1],
            [1, 2],
            [1, 0],
            [1, 1],
        ],
    ],
    Imino: [
        [
            [0, 0],
            [0, 1],
            [0, 2],
            [0, 3],
        ],
        [
            [0, 0],
            [1, 0],
            [2, 0],
            [3, 0],
        ],
        [
            [0, 0],
            [0, 1],
            [0, 2],
            [0, 3],
        ],
        [
            [0, 0],
            [1, 0],
            [2, 0],
            [3, 0],
        ],
    ],
    Omino: [
        [
            [0, 0],
            [0, 1],
            [1, 0],
            [1, 1],
        ],
        [
            [0, 0],
            [0, 1],
            [1, 0],
            [1, 1],
        ],
        [
            [0, 0],
            [0, 1],
            [1, 0],
            [1, 1],
        ],
        [
            [0, 0],
            [0, 1],
            [1, 0],
            [1, 1],
        ],
    ],
    Zmino: [
        [
            [0, 0],
            [1, 0],
            [1, 1],
            [2, 1],
        ],
        [
            [1, 0],
            [0, 1],
            [1, 1],
            [0, 2],
        ],
        [
            [0, 0],
            [1, 0],
            [1, 1],
            [2, 1],
        ],
        [
            [1, 0],
            [0, 1],
            [1, 1],
            [0, 2],
        ],
    ],
    Smino: [
        [
            [1, 0],
            [2, 0],
            [0, 1],
            [1, 1],
        ],
        [
            [0, 0],
            [0, 1],
            [1, 1],
            [1, 2],
        ],
        [
            [1, 0],
            [2, 0],
            [0, 1],
            [1, 1],
        ],
        [
            [0, 0],
            [0, 1],
            [1, 1],
            [1, 2],
        ],
    ],
    Jmino: [
        [
            [0, 2],
            [1, 0],
            [1, 1],
            [1, 2],
        ],
        [
            [0, 0],
            [0, 1],
            [1, 1],
            [2, 1],
        ],
        [
            [0, 0],
            [1, 0],
            [0, 1],
            [0, 2],
        ],
        [
            [0, 0],
            [1, 0],
            [2, 0],
            [2, 1],
        ],
    ],
    Lmino: [
        [
            [0, 0],
            [0, 1],
            [0, 2],
            [1, 2],
        ],
        [
            [0, 0],
            [1, 0],
            [2, 0],
            [0, 1],
        ],
        [
            [0, 0],
            [1, 0],
            [1, 1],
            [1, 2],
        ],
        [
            [0, 1],
            [1, 1],
            [2, 0],
            [2, 1],
        ],
    ],
};

// 시작하기
function init() {
    tempMovingItem = { ...movingItem };

    for (let i = 0; i < rows; i++) {
        prependNewLine(); //블록 라인 만들기
    }

    //   renderBlocks(); // 랜덤 블록 출력하기
    // generateNewBlock(); // 블록 만들기
}
// 블록 만들기
function prependNewLine() {
    const li = document.createElement("li");
    const ul = document.createElement("ul");
    for (let j = 0; j < cols; j++) {
        const matrix = document.createElement("li");
        ul.prepend(matrix);
    }
    li.prepend(ul);
    playground.prepend(li);
}
// 블록 출력하기
function renderBlocks(moveType = "") {
    //   const ty = tempMovingItem.type;
    //   const di = tempMovingItem.directioin;
    //   const to = tempMovingItem.top;
    //   const le = tempMovingItem.left;

    const { type, directioin, top, left } = tempMovingItem;

    const movingBlocks = document.querySelectorAll(".moving");
    movingBlocks.forEach((moving) => {
        moving.classList.remove(type, "moving");
    });

    blocks[type][directioin].some((block) => {
        const x = block[0] + left; // 2 0 1 1
        const y = block[1] + top; // 1 1 0 1

        const target = playground.childNodes[y]
            ? playground.childNodes[y].childNodes[0].childNodes[x]
            : null;
        const isAvailable = checkEmpty(target);

        if (isAvailable) {
            target.classList.add(type, "moving");
        } else {
            tempMovingItem = { ...movingItem };
            setTimeout(() => {
                renderBlocks();
                if (moveType === "top") {
                    seizeBlock();
                }
            }, 0);

            return true;
        }

        // console.log({ playground });
    });
    //   블록 누적
    movingItem.left = left;
    movingItem.top = top;
    movingItem.directioin = directioin;
}

// 블록이 바닥에 닿았는지 감지하기
function seizeBlock() {
    const movingBlocks = document.querySelectorAll(".moving");
    movingBlocks.forEach((moving) => {
        moving.classList.remove("moving");
        moving.classList.add("seized");
    });
    checkMatch();
}

// 한줄 제거하기
function checkMatch() {
    const childNodes = playground.childNodes;

    // 끝났을때
    childNodes[0].children[0].childNodes.forEach((li) => {
        if (li.classList.contains("seized")) {
            stopTetris = true;
            // tetrisEndMusic.play();
            tetrisGameover();
        }
    });
    childNodes.forEach((child) => {
        let matched = true;
        child.childNodes[0].childNodes.forEach((li) => {
            if (!li.classList.contains("seized")) {
                matched = false;
            }
        });
        if (matched) {
            child.remove();
            prependNewLine();
            tetrisScore++; //점수
            document.querySelector(".tetris__info .tit span").innerText =
                tetrisScore;
        }
    });
    generateNewBlock();
}

// 새로운 불록 만들기
function generateNewBlock() {
    clearInterval(downInterval);

    downInterval = setInterval(() => {
        moveBlock("top", 1);
    }, duration);

    const blockArray = Object.entries(blocks);
    const randomIndex = Math.floor(Math.random() * blockArray.length);
    movingItem.type = blockArray[randomIndex][0];
    movingItem.top = 0;
    movingItem.left = 6;
    movingItem.directioin = 0;
    tempMovingItem = { ...movingItem };
    renderBlocks();
}

// 빈칸 확인하기
function checkEmpty(target) {
    if (!target || target.classList.contains("seized")) {
        return false;
    }
    return true;
}

// 블록 움직이기
function moveBlock(moveType, amount) {
    tempMovingItem[moveType] += amount;
    renderBlocks(moveType);
}

// 모양 바꾸기
function changeDirection() {
    const directioin = tempMovingItem.directioin;
    directioin === 3
        ? (tempMovingItem.directioin = 0)
        : (tempMovingItem.directioin += 1);
    renderBlocks();
}

// 빨리내리기
function dropBlock() {
    clearInterval(downInterval);

    downInterval = setInterval(() => {
        moveBlock("top", 1);
    }, 10);
}

// 이벤트
document.addEventListener("keydown", (e) => {
    switch (e.keyCode) {
        case 39:
            moveBlock("left", 1);
            break;
        case 37:
            moveBlock("left", -1);
            break;
        case 40:
            moveBlock("top", 1);
            break;
        case 38:
            changeDirection();
            break;
        case 32:
            dropBlock();
            break;
        default:
            break;
    }
});

// 게임 오버
function tetrisGameover() {
    tetrisMusic.pause();
    tetrisMusic.currentTime = 0;
    tetrisInfo.classList.remove("show");
    tetrisRestart.classList.add("show");
    // resultLine.innerText = tetrisScore;
    resultScore.innerText = tetrisTime + tetrisScore * 5;
}

// 리셋하기
function resetTetris() {
    tetrisMusic.pause();
    tetrisMusic.currentTime = 0;
    tetrisInfo.classList.remove("show");
    tetrisTime = 0;
    tetrisScore = 0;
    stopTetris = true;
    document.querySelector(".tetris__info .time span").innerText = tetrisTime;

    const tetrisMinos = playground.querySelectorAll("li > ul > li");
    tetrisMinos.forEach((minos) => {
        minos.className = "";
    });
}

// 게임 시작하기
function tetrisStartFunc() {
    stopTetris = false;
    tetrisStart.classList.remove("show");
    // tetrisInfo.classList.add("show");
    document.querySelector(".tetris__restart").classList.remove("show");
    generateNewBlock();
    tetrisMusic.play();
    tetrisMusic.loop = true;
}
// 게임 시작하기
startBtn.addEventListener("click", () => {
    tetrisStartFunc();
});
// 게임 재시작하기
restartBtn.addEventListener("click", () => {
    resetTetris();
    tetrisRestart.classList.remove("show");
    tetrisStart.classList.add("show");
});

// 테트리스 게임
document.querySelector(".icon4").addEventListener("click", () => {
    document.querySelector(".tetris__wrap").style.display = "block";
});
document.querySelector(".tetris__close__btn").addEventListener("click", () => {
    document.querySelector(".tetris__wrap").style.display = "none";
});

// 모달창
tetrisIcon.addEventListener("click", () => {
    resetTetris();
    tetrisStart.classList.toggle("show");
    tetrisRestart.classList.remove("show");
    tetrisStart.classList.add("show");
});
tetrisCloseBtn.addEventListener("click", () => {
    resetTetris();
    tetrisStart.classList.remove("show");
    tetrisRestart.classList.remove("show");
    tetrisStart.classList.add("show");
});

init();
