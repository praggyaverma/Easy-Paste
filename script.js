document.addEventListener("DOMContentLoaded", function() {
    const textForm = document.getElementById("textForm");
    const savedTextsContainer = document.getElementById("savedTexts");

    // Load saved texts from storage
    loadSavedTexts();

    // Event listener for form submission
    textForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const textInput = document.getElementById("textInput");
        const text = textInput.value.trim();
        if (text !== "") {
            saveText(text);
            textInput.value = ""; 
        }
    });

    // Function to save text to storage
    function saveText(text) {
        let savedTexts = JSON.parse(localStorage.getItem("savedTexts")) || [];
        savedTexts.push(text);
        localStorage.setItem("savedTexts", JSON.stringify(savedTexts));
        // Update displayed texts
        loadSavedTexts();
    }

    // Function to load saved texts from storage and display them
    function loadSavedTexts() {
        savedTextsContainer.innerHTML = ""; // Clear previous texts
        let savedTexts = JSON.parse(localStorage.getItem("savedTexts")) || [];
        savedTexts.forEach(function(text, index) {
            const textElement = document.createElement("div");
            textElement.classList.add("saved-text");
            textElement.textContent = text;

            // Add copy button
            const copyButton = document.createElement("button");
            copyButton.classList.add("copy-button");
            copyButton.setAttribute("title", "Copy to Clipboard");
            copyButton.addEventListener("click", function() {
                copyTextToClipboard(text);
                // Add click effect
                copyButton.classList.add("clicked");
                setTimeout(function() {
                    copyButton.classList.remove("clicked");
                }, 100);
            });
            copyButton.innerHTML = "&#128203;"; 

            // Add delete button
            const deleteButton = document.createElement("button");
            deleteButton.classList.add("delete-button");
            deleteButton.setAttribute("title", "Delete");
            deleteButton.addEventListener("click", function() {
                deleteSavedText(index);
            });
            deleteButton.innerHTML = "&#10060;"; 

            // Append elements
            textElement.appendChild(copyButton);
            textElement.appendChild(deleteButton);
            savedTextsContainer.appendChild(textElement);
        });
    }

    // Function to delete saved text
    function deleteSavedText(index) {
        let savedTexts = JSON.parse(localStorage.getItem("savedTexts")) || [];
        savedTexts.splice(index, 1);
        localStorage.setItem("savedTexts", JSON.stringify(savedTexts));
        // Update displayed texts
        loadSavedTexts();
    }

    // Function to copy text to clipboard
    function copyTextToClipboard(text) {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
    }
});
