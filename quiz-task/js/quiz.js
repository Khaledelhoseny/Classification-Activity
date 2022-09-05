
const jsonFile = ` {
    "wordList": [
        {
            "id": 1,
            "word": "slowly",
            "pos": "adverb"
        },
        {
            "id": 2,
            "word": "ride",
            "pos": "verb"
        },
        {
            "id": 3,
            "word": "bus",
            "pos": "noun"
        },
        {
            "id": 4,
            "word": "commute",  
            "pos": "verb"
        },
        {
            "id": 5,
            "word": "emissions",
            "pos": "noun"
        },
        {
            "id": 6,
            "word": "walk",
            "pos": "verb"
        },
        {
            "id": 7,
            "word": "fast",
            "pos": "adjective"
        },
        {
            "id": 8,
            "word": "car",
            "pos": "noun"
        },
        {
            "id": 9,
            "word": "crowded",
            "pos": "adjective"
        },
        {
            "id": 10,
            "word": "arrival",
            "pos": "noun"
        },
        {
            "id": 11,
            "word": "emit",
            "pos": "verb"
        },
        {
            "id": 12,
            "word": "independent",
            "pos": "adjective"
        },
        {
            "id": 13,
            "word": "convenient",
            "pos": "adjective"
        },
        {
            "id": 14,
            "word": "lane",
            "pos": "noun"
        },
        {
            "id": 15,
            "word": "heavily",
            "pos": "adverb"
        }
    ]
    
} `

///------------ Globals------------------------

const projectObject = JSON.parse(jsonFile)
const wordText = document.querySelector("#word")
const choices_buttons = document.querySelectorAll("button")
const progressBar = document.querySelector(".progress")
let successCount = 0;
let clickedCount = 0;

///------------------------------------------





function getRandomIndex(elemnt) {
    return Math.floor(Math.random() * elemnt.length)
}

function getRandom(listOfElemnts) {
    index = getRandomIndex(listOfElemnts);
    // return listOfElemnts[index][0].toUpperCase() + listOfElemnts[index].substring(1);
    return listOfElemnts[index]
}


function changeRandom() {
    const randomObject = getRandom(projectObject.wordList)
    wordText.innerText = randomObject.word
}

changeRandom()

function updateWordsArray() {
    projectObject.wordList.splice(index, 1)
}



function incrementProgressBar() {
    if (clickedCount < 16) {
        const progressBarWidth = progressBar.offsetWidth + 23
        progressBar.style.width = `${progressBarWidth}px`
    }

}






function applyBackgroundGreen(button) {
    button.classList.add("succes")
    for (let button of choices_buttons) {
        button.disabled = true;
    }
    setTimeout(() => {
        for (let button of choices_buttons) {
            button.disabled = false;
        }
    }, 1000);
    setTimeout(function () {
        button.classList.remove("succes")

    }, 1000)
    console.log(successCount += 1)
    clickedCount += 1
}



function applyBackgroundRed(button) {
    const rightAns = document.querySelector(`#${projectObject.wordList[index].pos}`)
    rightAns.classList.add("succes")
    setTimeout(function () {
        rightAns.classList.remove("succes")
    }, 1000)
    button.classList.add("wrong")
    for (let button of choices_buttons) {
        button.disabled = true;
    }

    setTimeout(() => {
        for (let button of choices_buttons) {
            button.disabled = false;
        }
    }, 1000);

    setTimeout(function () {
        button.classList.remove("wrong")
    }, 1000)
    clickedCount += 1
}








choices_buttons.forEach(function (choiceButton) {
    choiceButton.addEventListener("click", check_answer)

    function check_answer() {
        if (choiceButton.innerText === projectObject.wordList[index].pos) {
            applyBackgroundGreen(choiceButton)
        } else if (choiceButton.innerText !== projectObject.wordList[index].pos) {
            applyBackgroundRed(choiceButton)
        }


        incrementProgressBar()
        setTimeout(changeRandom, 1000)
        updateWordsArray()
        showScoreBar()
        showResult()

    }


})


const scoreBar = document.querySelector(".ScoreBar p")
function showScoreBar() {
    scoreBar.innerText = `${successCount} of 15 `
}



function showResult() {
    if (clickedCount == 15) {

        document.querySelector("#big_container").style.display = "none"
        const resultContainer = document.createElement("div")
        resultContainer.classList.add("result")

        const resultText = document.createElement("h1")
        resultText.innerText = `your score is ${Math.floor((successCount / 15) * 100)}% `
        resultContainer.appendChild(resultText)
        const tryAgainBtn = document.createElement("button")
        resultContainer.appendChild(tryAgainBtn)

        tryAgainBtn.innerText = "try again"
        document.body.appendChild(resultContainer);

        document.querySelector(".result button").addEventListener("click", reset_quiz)
        function reset_quiz() {
            console.log("try again button ")
            resultContainer.remove()
            document.querySelector("#big_container").style.display = "block"
            progressBar.style.width = `0px`
            clickedCount = 0
            successCount = 0
            scoreBar.innerText = "0 of 15"

        }

    }



}

