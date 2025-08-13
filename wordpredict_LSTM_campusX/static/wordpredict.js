// function predictNextWord() {
//   const input = document.getElementById("inputText").value.trim();
//   const resultDiv = document.getElementById("result");

  // if (input === "") {
  //   resultDiv.textContent = "Please type something first.";
  //   return;
  // }

//   fetch("/predict", {
//     method: "POST",
//     headers : {
//       "Content-Type":"application/json"
//     },
//   })

//   // Dummy prediction – replace this with API call if needed
//   const dummyWord = "future";  // Or dynamic logic

//   resultDiv.textContent = "Predicted Word: " + dummyWord;
// }

// async function getPrediction() {
//     const input = document.getElementById("userInput").value;
//     const resultDiv = document.getElementById("result");
//     if (input === "") {
//     resultDiv.textContent = "Please type something first.";
//     return;
//     }
//     try {
//     const response = await fetch("/predict_next_word", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify({ text: input })
//     });

//     const data = await response.json();
//     document.getElementById("result").innerText = data.prediction;
//   }

// }


const inputField = document.getElementById("userInput");
const resultDiv = document.getElementById("result");

let debounceTimer;

inputField.addEventListener("input", () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        predictNextWord();
    }, 400);
});

async function predictNextWord() {
    const input = inputField.value.trim();
    if (input === "") {
        resultDiv.textContent = "Please type something first.";
        return;
    }

    try {
        const response = await fetch("/predict_next_word", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ text: input })
        });

        if (!response.ok) throw new Error("HTTP error " + response.status);

        const data = await response.json();

        if (Array.isArray(data.predictions)) {
            resultDiv.textContent = "Suggestions: " + data.predictions.join(", ");
        } else {
            resultDiv.textContent = "Prediction: " + data.prediction;
        }
    } catch (err) {
        console.error("Fetch error:", err);
        resultDiv.textContent = "Something went wrong.";
    }
}
