
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


const wordText = document.querySelector("#word")
const choices_buttons = document.querySelectorAll("button")
const score_bar = document.querySelector(".bar")
let count_success = 0;
let count_clicked = 0;

///------------------------------------------




let myObject = JSON.parse(jsonFile)
const wordsArray = []
function generateArray() {
    for (let x of myObject.wordList) {
        wordsArray.push(x.word)
    }
}

generateArray()

function get_random_index(elemnt) {
    return Math.floor(Math.random() * elemnt.length)
}

function get_random(list_of_elements) {
    index = get_random_index(list_of_elements);
    // return list_of_elements[index][0].toUpperCase() + list_of_elements[index].substring(1);
    return list_of_elements[index]
}





function increment_scoreBar() {
    if (count_clicked < 16) {
        const score_bar_width = score_bar.offsetWidth + 23
        score_bar.style.width = `${score_bar_width}px`
    }

}


function change_random() {
    wordText.innerText = get_random(wordsArray)
}

change_random()


function updateWordsArray() {
    wordsArray.splice(wordsArray.indexOf(wordText.innerText), 1)
    myObject.wordList.splice(index, 1)
}



function succes_action(button) {
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
    console.log(count_success += 1)
    count_clicked += 1
}




function wrong_action(button) {
    console.log(myObject.wordList[index].pos)

    const rightAns = document.querySelector(`#${myObject.wordList[index].pos}`)
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
    count_clicked += 1
}








choices_buttons.forEach(function (button) {
    button.addEventListener("click", check_answer)

    function check_answer() {
        if (button.innerText === myObject.wordList[index].pos) {
            succes_action(button)
        } else if (button.innerText !== myObject.wordList[index].pos) {
            wrong_action(button)
        }


        increment_scoreBar()
        setTimeout(change_random, 1000)
        updateWordsArray()
        showProgress()
        showResult()


    }


})


const scoreResult = document.querySelector(".score_container p")
function showProgress() {
    scoreResult.innerText = `${count_success} of 15 `
}



function showResult() {
    if (count_clicked == 15) {

        document.querySelector("#big_container").style.display = "none"
        const result_container = document.createElement("div")
        result_container.classList.add("result")

        const result_text = document.createElement("h1")
        result_text.innerText = `your score is ${Math.floor((count_success / 15) * 100)}% `
        result_container.appendChild(result_text)
        const try_again_btn = document.createElement("button")
        result_container.appendChild(try_again_btn)

        try_again_btn.innerText = "try again"
        document.body.appendChild(result_container);

        document.querySelector(".result button").addEventListener("click", reset_quiz)
        function reset_quiz() {
            console.log("try again button ")
            result_container.remove()
            document.querySelector("#big_container").style.display = "block"
            score_bar.style.width = `0px`
            count_clicked = 0
            count_success = 0
            scoreResult.innerText = "0 of 15"



        }



    }



}

