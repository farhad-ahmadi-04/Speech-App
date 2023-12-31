import {
    languagesTemplate,
    readData,
    resultRecord,
    downloadTool
}
from "./unit.js";
// varibles...
const language = document.querySelector("#language-user"),
    record = document.querySelector("#recording>button"),
    result = document.querySelector(".output-text"),
    clear = document.querySelector(".clear"),
    download = document.querySelector(".download")
// events...

document.addEventListener("DOMContentLoaded", options)
record.addEventListener("click", recordSpeech)
clear.addEventListener("click", clearText)
download.addEventListener("click", downloadText)

// function...

/**
 * getting data from json server file and handel error if has error => 1: if getting data will be seccess, then call searchData function and send preperties. 2: if has getting data will not be seccess, then .log from err
 */
function options() {
    readData().then(res => {
        searchInData(res.languages)
    }).catch(err => {
        console.log(err);
    })
}

/**
 * foreach in data from json file and get preperie that we need  and send it to languagesTemplate= for make template
 * @param {object} data - data from json file
 */
function searchInData(data) {
    data.forEach(item => {
        languagesTemplate(item.code, item.name, language)
    });
}

// ---Prefixed properties---
// Browsers currently support speech recognition with prefixed properties. Therefore at the start of our code we include these lines to allow for both prefixed properties and unprefixed versions that may be supported in future:
let speechRecognition = window.speechRecognition || window.webkitSpeechRecognition,
    recognition,
    recording = false;

/**
 * first of all: handel error. 
 * second: call speechRecognition class and get targhet language.
 *  third set interimResults: true{The **interimResults** property of the SpeechRecognition interface controls whether interim results should be returned ( true ) or not ( false .) Interim results are results that are not yet final (e.g. the SpeechRecognitionResult. isFinal property is false .) The default value for interimResults is false}.
 *  4td: start of recoring.
 * 5td: get result of speech with (onresult event) {The onresult property of the SpeechRecognition interface represents an event handler that will run when the speech recognition service returns a result}.
 * 6th: set activity for finish the speech with (onspeechend event) {The onspeechend property of the SpeechRecognition interface represents an event handler that will run when speech recognised by the speech recognition service has stopped being detected}.
 * 7th: set activity for error the speech with (onerror event) {The onerror property of the SpeechRecognition interface represents an event handler that will run when a speech recognition error occurs}.
 */
function speechToText() {
    try {
        recognition = new speechRecognition();
        recognition.lang = language.value;
        // The **interimResults** property of the SpeechRecognition interface controls whether interim results should be returned ( true ) or not ( false .) Interim results are results that are not yet final (e.g. the SpeechRecognitionResult. isFinal property is false .) The default value for interimResults is false
        recognition.interimResults = true;
        document.querySelector("#recording>button>span").innerHTML = "Listning...";
        // start of recoring
        recognition.start()
        /**
         * The onresult property of the SpeechRecognition interface represents an event handler that will run when the speech recognition service returns a result
         * @param {object} event - using object for search in respons of web speech API 
         */
        recognition.onresult = (event) => {
            resultRecord(event, result, download)
        };

        // The onspeechend property of the SpeechRecognition interface represents an event handler that will run when speech recognised by the speech recognition service has stopped being detected
        recognition.onspeechend = () => {
            // on speech end again call the function to continously listen
            speechToText()
        };
        /**
         * The onerror property of the SpeechRecognition interface represents an event handler that will run when a speech recognition error occurs
         * @param {object} e - for show error
         */
        recognition.onerror = (e) => {
            alert(`Error Occured : ${e.error}`)
        };

    } catch (error) {
        recording = false;
        console.log(error);
    }
}

/**
 * for start and stop the sppech that user can choose it
 */
function recordSpeech() {
    if (!recording) {
        speechToText();
        recording = true;
    } else {
        stopRecording()
    }
}

/**
 * for stop recording and set activity (change text in btn)
 */
function stopRecording() {
    recognition.stop();
    document.querySelector("#recording>button>span").innerHTML = "Start Listening";
    recording = false;
}

/**
 * function for download the text of the recording
 */
function downloadText() {
    // first pass the text then send the file name (file name should be STRING)
    downloadTool(result.innerHTML, "speech.txt")

}

/**
 * clear the text when user click on btn
 */
function clearText() {
    result.innerHTML = "";
    download.disabled = true;
}