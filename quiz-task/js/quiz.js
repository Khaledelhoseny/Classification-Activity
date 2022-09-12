
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
// const projectObject = JSON.parse(jsonFile);


if (localStorage.getItem("projectObject")) {
    projectObject = JSON.parse(localStorage.getItem("projectObject"))
}
else {
    projectObject = JSON.parse(jsonFile)
}

const wordText = document.querySelector("#word")
const choicesButtons = document.querySelectorAll("button")
const progressBar = document.querySelector(".progress")
const scoreBar = document.querySelector(".ScoreBar p")
const wordsNumber = 15

///------------------------------------------







function getRandomIndex(arr) {

    index = Math.floor(Math.random() * arr.length)
   
    // word_id = arr[index].id
    // window.localStorage.setItem("word_id",word_id)
    return arr[index]

}

let randomObject
let filteredWords
let number
function changeRandom() {
    filteredWords = projectObject.wordList.filter(wordObj => !wordObj.submitted)
    console.log("Filtered", filteredWords)
    console.log("Original", projectObject.wordList)
    randomObject = getRandomIndex(filteredWords)
    console.log(randomObject)
    // wordText.innerText = randomObject.word
    window.localStorage.setItem("randomObject.word", randomObject.word)
    wordText.innerText = window.localStorage.getItem("randomObject.word")

    
    number = projectObject.wordList.map(function (e) {
        return e.word;
    }).indexOf(window.localStorage.getItem("randomObject.word"));

    window.localStorage.setItem("number", number)

}
wordText.innerText = window.localStorage.getItem("randomObject.word")

// changeRandom()   


function incrementProgressBar() {
    const progressBarWidth = progressBar.offsetWidth + 23
    window.localStorage.setItem("progressBarWidth", progressBarWidth)
    progressBar.style.width = `${window.localStorage.getItem("progressBarWidth")}px`

}


progressBar.style.width = `${window.localStorage.getItem("progressBarWidth")}px`


function applyBackgroundGreen(button) {
    button.classList.add("succes")
    for (let button of choicesButtons) {
        button.disabled = true;
    }
    setTimeout(() => {
        for (let button of choicesButtons) {
            button.disabled = false;
        }
    }, 1000);
    setTimeout(function () {
        button.classList.remove("succes")
    }, 1000)

}



function applyBackgroundRed(button) {
    const rightAns = document.querySelector(`#${projectObject.wordList[window.localStorage.getItem("number")].pos}`)
    rightAns.classList.add("succes")
    setTimeout(function () {
        rightAns.classList.remove("succes")
    }, 1000)
    button.classList.add("wrong")
    for (let button of choicesButtons) {
        button.disabled = true;
    }

    setTimeout(() => {
        for (let button of choicesButtons) {
            button.disabled = false;
        }
    }, 1000);

    setTimeout(function () {
        button.classList.remove("wrong")
    }, 1000)

}



choicesButtons.forEach(function (choiceButton) {
    choiceButton.addEventListener("click", checkAnswer)

    function checkAnswer() {
    
        if (choiceButton.innerText === projectObject.wordList[window.localStorage.getItem("number")].pos) {

            applyBackgroundGreen(choiceButton)
            projectObject.wordList[window.localStorage.getItem("number")].score = true
            // filterScores()
            incrementSoreBar()


        } else if (choiceButton.innerText !== projectObject.wordList[window.localStorage.getItem("number")].pos) {
            applyBackgroundRed(choiceButton)
        }
        projectObject.wordList[window.localStorage.getItem("number")].submitted = true
        localStorage.setItem("projectObject", JSON.stringify(projectObject))

        setTimeout(showResult, 1000)
        setTimeout(function () {
            if (progressBar.style.width !== `${345}px`) {
                changeRandom()
            }
        }, 1000)
        incrementProgressBar()
       


    }


})


let scoresArr = []
function incrementSoreBar() {
    scoresArr = projectObject.wordList.filter(obj => {
        return obj.score === true;
    })

    window.localStorage.setItem("scoresArr.length", scoresArr.length)
    scoreBar.innerText = `${window.localStorage.getItem("scoresArr.length")} of ${wordsNumber}`
    
}

if(window.localStorage.getItem("scoresArr.length")==null){
    scoreBar.innerText = `0 of ${wordsNumber}`

}else{
scoreBar.innerText = `${window.localStorage.getItem("scoresArr.length")} of ${wordsNumber}`

}





function showResult() {
    if (progressBar.style.width === `${345}px`) {

        const finalResult = Math.floor((scoresArr.length / 15) * 100)
        document.querySelector("#big_container").style.display = "none"
        const resultContainer = document.createElement("div")
        resultContainer.classList.add("result")

        const resultText = document.createElement("h1")
        resultText.innerText = `your score is ${finalResult} % `

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
            localStorage.clear()
            setTimeout(changeRandom,1000)
            progressBar.style.width = `0px`
            scoreBar.innerText = `0 of 15`
            projectObject.wordList.forEach(function (v) { delete v.score });
            projectObject.wordList.forEach(function (v) { delete v.submitted });


        }

    }



}

