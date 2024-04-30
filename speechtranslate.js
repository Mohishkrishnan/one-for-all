document.addEventListener("DOMContentLoaded", function() {
    const output = document.getElementById("output");
    const selectInputLanguage = document.getElementById("selectInputLanguage");
    const selectOutputLanguage = document.getElementById("selectOutputLanguage");
    const startSpeechBtn = document.getElementById("startSpeech");
    const conbut = document.getElementById("conbut");

    let synth = speechSynthesis;
    let isSpeaking = false;

    function voices() {
        for (let voice of synth.getVoices()) {
            let selected = voice.lang === "en-US" ? "selected" : "";
            let option = `<option value="${voice.lang}" ${selected}>${voice.name} (${voice.lang})</option>`;
            selectInputLanguage.insertAdjacentHTML("beforeend", option);
            selectOutputLanguage.insertAdjacentHTML("beforeend", option);
        }
    }

    synth.addEventListener("voiceschanged", voices);

    function textToSpeech(text, lang) {
        let utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = lang;
        synth.speak(utterance);
    }
    startSpeechBtn.addEventListener("click", () => {
        const recognition = new webkitSpeechRecognition();
        recognition.lang = selectInputLanguage.value; // Set recognition language based on selection
        recognition.interimResults = true;

        recognition.addEventListener('result', e => {
            const transcript = Array.from(e.results)
                .map(result => result[0])
                .map(result => result.transcript)
                .join('');

            output.value = transcript;
        });
        recognition.start();
    });

    conbut.addEventListener("click", () => {
        let inputSpeech = output.value;
        let inputLang = selectInputLanguage.value;
        let outputLang = selectOutputLanguage.value;

        let apiUrl = `https://api.mymemory.translated.net/get?q=${inputSpeech}&langpair=${inputLang}|${outputLang}`;

        fetch(apiUrl)
            .then(res => res.json())
            .then(data => {
                let translatedText = data.responseData.translatedText;
                textToSpeech(translatedText, outputLang);
            })
            .catch(error => {
                console.error('Error translating:', error);
            });
    });
});
