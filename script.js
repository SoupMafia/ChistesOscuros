const jokeElement = document.getElementById('joke');
const questionElement = document.getElementById('question');
const answerElement = document.getElementById('answer');
const getJokeButton = document.getElementById('getJokeButton');
const languageSelect = document.getElementById('languageSelect');

getJokeButton.addEventListener('click', () => {
    getJoke();
});

async function getJoke() {
    try {
        const response = await fetch('https://v2.jokeapi.dev/joke/Dark');
        const data = await response.json();

        let questionText = '';
        let answerText = '';

        if (data.type === 'twopart') {
            questionText = await translateText(data.setup, languageSelect.value);
            answerText = await translateText(data.delivery, languageSelect.value);
        } else {
            questionText = '';
            answerText = await translateText(data.joke, languageSelect.value);
        }

        questionElement.textContent = questionText;
        answerElement.textContent = answerText;
    } catch (error) {
        questionElement.textContent = 'No se pudo obtener un chiste oscuro en este momento.';
        answerElement.textContent = '';
    }
}

async function translateText(text, targetLanguage) {
    const response = await fetch(
        `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLanguage}&dt=t&q=${encodeURIComponent(text)}`
    );
    const data = await response.json();

    // La respuesta es un arreglo anidado, extraemos el texto traducido
    const translatedText = data[0][0][0];

    return translatedText;
}

// Cargar un chiste al cargar la página
getJoke();
