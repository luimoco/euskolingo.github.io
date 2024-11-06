// Ejercicio de tipo escribir
function generateExerciseEscribir(question) {
    const questionElement = document.querySelector(".question");
    questionElement.textContent = question;
}

function comprobar() {
    let respuestaUsuario = document.getElementById("inputRespuestaUsuario").value.toLowerCase();
    // Remove punctuation characters
    respuestaUsuario = respuestaUsuario.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
    // Trim leading and trailing spaces
    respuestaUsuario = respuestaUsuario.trim();
    const correctAnswers = respuesta.split("|");
    let isCorrect = false;
    for (const correctAnswer of correctAnswers) {
        if (respuestaUsuario === correctAnswer.trim()) {
            isCorrect = true;
            break;
        }
    }
    if (isCorrect) {
        document.querySelector(".feedback").innerHTML = "<p>ZORIONAK! " + pregunta + " <span class='correcto'>" + respuesta.replace(/\|/g, "</span> edo <span class='correcto'>") + "</span> da!" + "</p><img src='./ondo.png' width = '64', height = '64' alt='Ondo'>";
    } else {
        document.querySelector(".feedback").innerHTML = "<p><span class='incorrecto'>" + respuestaUsuario + "</span> ez da " + pregunta + ". " + pregunta + ", <span class='correcto'><b>" + respuesta.replace(/\|/g, "</span></b> edo <b><span class='correcto'>") + "</b></span> da.</p><img src='./txarra.png' width = '64', height = '64' alt='Txarra'>";
    }
}

// Funcionalidad para poder usar enter en los ejercicios de tipo Escritura
const inputField = document.getElementById("inputRespuestaUsuario");
if(inputField){
    inputField.addEventListener("keyup", function(event) {
        if (event.key === "Enter") {
            comprobar();
        }
    });
}

/////////////////////////////////////////////////////////////////////////////////
//Ejercicio de tipo ordenar frase
function comprobarOrden() {
    const orderedWords = document.querySelectorAll(".ordered-words button");
    const correctOrder = respuesta.split(" ");
    let respuestaUsuario = ""
    let isCorrect = true;
    for (let i = 0; i < orderedWords.length; i++) {
        respuestaUsuario += orderedWords[i].textContent + " ";
        if (orderedWords[i].textContent !== correctOrder[i]) {
            isCorrect = false;
            break;
        }
    }
    if (isCorrect) {
        document.querySelector(".feedback").innerHTML = "<p>ZORIONAK! " + pregunta + ". " + respuestaUsuario + " da!</p><img src='./ondo.png' width = '64', height = '64' alt='Ondo'>";
    } else {
        respuestaUsuario = "";
        for (let i = 0; i < orderedWords.length; i++) {
            respuestaUsuario += orderedWords[i].textContent + " ";
        }
        document.querySelector(".feedback").innerHTML = "<p>Ez da <span class='incorrecto'>" + respuestaUsuario.slice(0,-1) + "</span>.</p><p>" + pregunta + ". " + respuesta + " da!</p><img src='./txarra.png' width = '64', height = '64' alt='Txarra'>";
    }
}

function generateExerciseOrdenar(question, answer) {
    const questionElement = document.querySelector(".question");
    questionElement.textContent = question;

    const answerWords = answer.split(" ");
    const disorderedWords = shuffleArray(answerWords);

    const orderedWordsDiv = document.querySelector(".ordered-words");
    const disorderedWordsDiv = document.querySelector(".disordered-words");

    disorderedWords.forEach(word => {
        const button = document.createElement("button");
        button.textContent = word;
        button.addEventListener("click", () => moveWord(button));
        disorderedWordsDiv.appendChild(button);
    });
}

function moveWord(wordElement) {
    const orderedWordsDiv = document.querySelector(".ordered-words");
    const disorderedWordsDiv = document.querySelector(".disordered-words");

    if (orderedWordsDiv.contains(wordElement)) {
        disorderedWordsDiv.appendChild(wordElement);
    } else {
        orderedWordsDiv.appendChild(wordElement);
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

//////////////////////MAIN//////////////////////////////
const pregunta = document.getElementById("pregResp").getAttribute("pregunta");
const respuesta = document.getElementById("pregResp").getAttribute("respuesta");
const tipo = document.getElementById("pregResp").getAttribute("tipo");

if (tipo == "ordenar") {
    generateExerciseOrdenar(pregunta, respuesta);
} else if (tipo == "escribir") {
    generateExerciseEscribir(pregunta);
}


function loadRandomExercise() {
    const MIN_EXERCISE_NUMBER = 1;
    const MAX_EXERCISE_NUMBER = 4;
    const randomNum = Math.floor(Math.random() * (MAX_EXERCISE_NUMBER - MIN_EXERCISE_NUMBER + 1)) + MIN_EXERCISE_NUMBER;
    window.location.href = `preg${randomNum}.html`;
}

let buttonClicked = false; // Variable to track if the button has been clicked

function checkAndChangeButton() {
    if (!buttonClicked) {
        if (tipo == "ordenar") {
            comprobarOrden();
        } else if (tipo == "escribir") {
            comprobar();
        }        
        buttonClicked = true;
        const checkButton = document.getElementById("checkButton");
        checkButton.textContent = "Urrengo aldera";
        checkButton.onclick = loadRandomExercise;
    } else {
        loadRandomExercise();
    }
}