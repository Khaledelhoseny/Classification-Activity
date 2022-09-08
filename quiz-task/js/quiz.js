
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
let projectObject;
if(localStorage.getItem("projectObject"))
{
     projectObject = JSON.parse(localStorage.getItem("projectObject"))
}
else
{
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
      
    word_id = arr[index].id
    window.localStorage.setItem("word_id",word_id)

    return arr[index]
    
}


function changeRandom() {
   const filteredWords = projectObject.wordList.filter(wordObj => !wordObj.submitted)
   console.log("Filtered", filteredWords)
   console.log("Original", projectObject.wordList)
    const randomObject = getRandomIndex(filteredWords)

    // wordText.innerText = randomObject.word
    window.localStorage.setItem("randomObject.word",randomObject.word)
    wordText.innerText = window.localStorage.getItem("randomObject.word")
    
}

wordText.innerText = window.localStorage.getItem("randomObject.word")

// changeRandom()


function incrementProgressBar() {
        const progressBarWidth = progressBar.offsetWidth + 23
        window.localStorage.setItem("progressBarWidth",progressBarWidth)
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
    const rightAns = document.querySelector(`#${projectObject.wordList[window.localStorage.getItem("word_id")].pos}`)
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
        
        if (choiceButton.innerText === projectObject.wordList[window.localStorage.getItem("word_id")].pos) {
            applyBackgroundGreen(choiceButton)
            projectObject.wordList[window.localStorage.getItem("word_id")].score = true
            // filterScores()
            incrementSoreBar()
            localStorage.setItem("projectObject", JSON.stringify(projectObject))
            

        } else if (choiceButton.innerText !== projectObject.wordList[window.localStorage.getItem("word_id")].pos) {
            applyBackgroundRed(choiceButton)
        }
        projectObject.wordList[window.localStorage.getItem("word_id")].submitted = true

        setTimeout(showResult, 1000)
        setTimeout(changeRandom, 1000)
        incrementProgressBar()
      

    }


})


 let scoresArr=[]
function incrementSoreBar(){
        scoresArr = projectObject.wordList.filter(obj => {
        return obj.score === true;
      })
    window.localStorage.setItem("scoresArr.length",scoresArr.length)
    scoreBar.innerText = `${window.localStorage.getItem("scoresArr.length")} of ${wordsNumber}`
    console.log(scoresArr)
}

scoreBar.innerText = `${window.localStorage.getItem("scoresArr.length")} of ${wordsNumber}`




function showResult() {
    if ( progressBar.style.width===`${345}px`) {

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
            changeRandom()
            progressBar.style.width = `0px`
            scoreBar.innerText = `0 of 15`
            for(let i=0 ;i<=projectObject.wordList.length;i++){
                if(projectObject.wordList[i].score===true){
                    delete projectObject.wordList[i].score
                }

             }
             

             

            
        }

    }



}

