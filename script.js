async function searchWord() {
    const word = document.getElementById("wordInput").value.trim();
    const resultDiv = document.getElementById("result");

    if (word === "") {
        resultDiv.innerHTML = "<p>Please enter a word.</p>";
        return;
    }

    const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("Word not found");

        const data = await response.json();
        const wordInfo = data[0];

        resultDiv.innerHTML = `
            <h2>${wordInfo.word}</h2>
            <p><strong>Phonetic:</strong> ${wordInfo.phonetic || "N/A"}</p>
            <p><strong>Definition:</strong> ${wordInfo.meanings[0].definitions[0].definition}</p>
            <p><strong>Example:</strong> ${wordInfo.meanings[0].definitions[0].example || "No example available."}</p>
        `;

        saveToHistory(word);
    } catch (error) {
        resultDiv.innerHTML = "<p>Word not found. Try another word.</p>";
    }
}

// 🌟 Word of the Day Feature
async function getWordOfTheDay() {
    const randomWords = ["serene", "lucid", "arcane", "tenacity", "zephyr", "ephemeral"];
    const randomWord = randomWords[Math.floor(Math.random() * randomWords.length)];
    
    const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${randomWord}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("Word not found");

        const data = await response.json();
        const wordInfo = data[0];

        document.getElementById("wordOfTheDay").innerHTML = `
            <h2>${wordInfo.word}</h2>
            <p><strong>Definition:</strong> ${wordInfo.meanings[0].definitions[0].definition}</p>
        `;
    } catch (error) {
        document.getElementById("wordOfTheDay").innerHTML = "<p>Could not fetch Word of the Day.</p>";
    }
}

// 📌 Save Search History
function saveToHistory(word) {
    let history = JSON.parse(localStorage.getItem("searchHistory")) || [];
    if (!history.includes(word)) {
        history.push(word);
        localStorage.setItem("searchHistory", JSON.stringify(history));
    }
    displayHistory();
}

// 📜 Display Search History
function displayHistory() {
    let history = JSON.parse(localStorage.getItem("searchHistory")) || [];
    let historyList = document.getElementById("historyList");
    historyList.innerHTML = "";
    
    history.forEach(word => {
        let li = document.createElement("li");
        li.textContent = word;
        historyList.appendChild(li);
    });
}

// 🌙 Dark Mode Toggle
document.getElementById("toggleDarkMode").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
});

// Load Dark Mode Preference
if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark-mode");
}

// 🏁 Initialize
window.onload = function () {
    getWordOfTheDay();
    displayHistory();
};
