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