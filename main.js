import {
    languagesTemplate,
    readData
}
from "./unit.js";
// varibles...
const language = document.querySelector("#language-user"),
    recording = document.querySelector("#recording>button"),
    result = document.querySelector(".output-text"),
    clear = document.querySelector(".clear"),
    download = document.querySelector(".download")
// events...

document.addEventListener("DOMContentLoaded", options)
// recording.addEventListener("click", record)
// clear.addEventListener("click", clearText)
// download.addEventListener("click", downloadText)

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