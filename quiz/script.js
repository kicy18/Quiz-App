const quesNo = document.querySelector(".ques-no");
const q = document.querySelector(".ques-no h3");
const ques = document.querySelector(".q");
const option1 = document.querySelector('#o1');
const option2 = document.querySelector('#o2');
const option3 = document.querySelector('#o3');
const option4 = document.querySelector('#o4');
const result = document.querySelector(".result");
const resulttext = document.querySelector(".result h2");
const startBtn = document.querySelector(".first");
const start = document.querySelector(".start");
const optionsContainer = document.querySelector(".option");
const restartBtn = document.querySelector(".restart");
const quit = document.querySelector(".next");

let correct = '';
let c = 1;
let marks = 0;
const totalQuestions = 10;
const maxQuestionLength =  82; 
const baseUrl = 'https://the-trivia-api.com/v2/questions';

function first() {
    startBtn.addEventListener("click", () => {
        quesNo.style.display = "block";
        result.style.display = "none";
        start.style.display = "none";
        load();
    });
}
first();

async function load() {
    if (c > totalQuestions) {
        displayResult();
        return;
    }

    let qN;
    do {
        
        const response = await fetch(baseUrl);
        const data = await response.json();

     
        if (!Array.isArray(data) || data.length === 0) {
            console.error('Invalid data fetched from the API');
            return;
        }

        const no = Math.floor(Math.random() * data.length);
        qN = data[no];

    } while (qN.question.text.length > maxQuestionLength); 

  
    ques.innerHTML = qN.question.text;
    const options = [qN.correctAnswer, ...qN.incorrectAnswers];
    shuffleOptions(options);

    [option1, option2, option3, option4].forEach((option, index) => {
        option.innerHTML = options[index];
        option.removeEventListener('click', handleOptionClick); 
        option.addEventListener('click', handleOptionClick);    
    });

    correct = qN.correctAnswer;

    updateQuestionText();  
}

function shuffleOptions(options) {
    options.sort(() => Math.random() - 0.5);
}

function handleOptionClick() {
    checkAnswer(this);  
}

function checkAnswer(selectedOption) {
    if (iscorrect(selectedOption)) {
        marks += 1;  
    }
    c++;  
    load();  
}

function updateQuestionText() {
    q.innerHTML = `Question ${c} of ${totalQuestions}`;
}

function displayResult() {
    result.style.display = "block";
    quesNo.style.display = "none";
    resulttext.innerHTML = `Quiz Finished! You scored ${marks} out of ${totalQuestions}`;
}


restartBtn.addEventListener("click", () => {
    
    c = 1;
    marks = 0;

    result.style.display = "none";
    quesNo.style.display = "block";
    load();  
});

function iscorrect(selected) {
    return selected.innerHTML === correct;
}
quit.addEventListener("click", ()=>{
    displayResult();
})
