/**
 * 
 * @returns data from json file and then parse it
 */
export async function readData() {
    return await ((await fetch("./data/data.json")).json())
}
/**
 * make tremplate of languages options
 * @param {string} code - language code
 * @param {string} name - name of the language
 * @param {object} position - target position for send elememt to DOM
 * @returns - option element and send it to select element => option has value=code + text=name
 */
export async function languagesTemplate(code, name, position) {
    const option = document.createElement('option');
    option.value = code;
    option.textContent = name;
    position.appendChild(option);
    return option
}
/**
 * finde user speech then analysis and after that, show it in target position 
 * @param {object} event -  using object for search in respons of web speech API 
 * @param {object} position - place of showing texts
 * @param {object} downloadBtn - btn of downloading text => user shoud accece to download text when has text in fild
 */
export function resultRecord(event, position, downloadBtn) {
    // search in object and find text then put it in varibles
    const speechResult = event.results[0][0].transcript;
    // if result is intrim swhow in p else asit is result
    if (event.results[0].isFinal) {
        position.innerHTML += " " + speechResult;
        // remove p when handel the full text
        position.querySelector("p").remove()
    } else {
        if (!document.querySelector(".intrim")) {
            // creat element to put text for analysis
            const intrim = document.createElement("p")
            intrim.className = "intrim"
            // after analysis send it to position
            position.appendChild(intrim)
        }
        // after that change innerhtml
        document.querySelector(".intrim").innerHTML = " " + speechResult
    }
    // something is writen in result lets enable download btn
    downloadBtn.disabled = false
}