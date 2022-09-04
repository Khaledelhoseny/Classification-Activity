


let jsonFile = ` {
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
 
let myObject = JSON.parse(jsonFile)

console.log(myObject.wordList)
let wordsArray = []
function generateArray(){
    for(let x of myObject.wordList ){
        wordsArray.push(x.word)   
    }
}

generateArray()





function get_random_index(ele) {

    return Math.floor(Math.random()*ele.length)
  }


  function get_random(list_of_elements){
    index = get_random_index(list_of_elements);
    // return list_of_elements[index][0].toUpperCase() + list_of_elements[index].substring(1);
    return list_of_elements[index]
  }



let wordText = document.querySelector("#word")

let nounText = document.querySelector("#noun")

let verbText = document.querySelector("#verb")

let adverbText = document.querySelector("#adverb")

let buttons = document.querySelectorAll("button")

let adjectiveText = document.querySelector("#adjective")

let bar_score = document.querySelector(".bar")


 

function increment_scoreBar(){
        if(count_clicked < 16 ){ 
            let x = bar_score.offsetWidth+23
            bar_score.style.width = `${x}px`
        }
            
}


function change_random(){
    wordText.innerText = get_random(wordsArray)
}

change_random()


function updateWordsArray(){

    wordsArray.splice(wordsArray.indexOf(wordText.innerText),1)
    myObject.wordList.splice(index,1)
  
}






let count_success = 0 ; 
let count_clicked = 0 ;

buttons.forEach(function (button){
   
    button.addEventListener("click" , checkFunc)
    
    
    function checkFunc(){
    
    if(button.innerText === myObject.wordList[index].pos){
        button.classList.add("succes")

        for (let button of buttons) {
            button.disabled = true;
          }

          setTimeout(() => {
            for (let button of buttons) {
                button.disabled = false;
              }
          }, 2000);
       
        setTimeout(function(){
            button.classList.remove("succes")

        },2000)

        console.log(count_success+=1) 
        count_clicked+=1
        
    }else if(button.innerText !== myObject.wordList[index].pos){
        console.log(myObject.wordList[index].pos)

        let rightAns = document.querySelector(`#${myObject.wordList[index].pos}`)
        rightAns.classList.add("succes")
        setTimeout(function(){
            rightAns.classList.remove("succes")
        },2000)



        button.classList.add("wrong")
        for (let button of buttons) {
            button.disabled = true;
          }

          setTimeout(() => {
            for (let button of buttons) {
                button.disabled = false;
              }
          }, 2000);

        setTimeout(function(){
            button.classList.remove("wrong")
        },2000)
        count_clicked+=1
        
    }

    
    increment_scoreBar()
    setTimeout(change_random,2000)
    updateWordsArray()
    showProgress()
    showResult()
    


}


})

let scoreResult = document.querySelector(".score_container p")
function showProgress(){
   
    scoreResult.innerText = `${count_success} of 15 `
    
}



function showResult(){
        if(count_clicked==15){

            document.querySelector("#big_container").style.display="none"
            let div =  document.createElement("div")
            div.classList.add("result")
            
            let parg = document.createElement("h1")
            parg.innerText = `your score is ${ Math.floor((count_success/15)*100)}% `
            div.appendChild(parg)
            let button = document.createElement("button")
            div.appendChild(button)
            
            button.innerText = "try again"
            document.body.appendChild(div);

            document.querySelector(".result button").addEventListener("click", reset )
            function reset() {

                console.log("try again button ") 
                div.remove()
                document.querySelector("#big_container").style.display="block"
                bar_score.style.width = `0px`
                count_clicked = 0 
                count_success = 0
                scoreResult.innerText = "0 of 15"
                
            

            }
           


            }

            
            
        }
       
 