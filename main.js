window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.interimResults = true;

const transcript_element = document.getElementById("transcript");
const talk_button = document.getElementById("start");
const end_button = document.getElementById("end");

let p = document.createElement("p");
transcript_element.appendChild(p);

recognition.addEventListener("result", e => {
  const trascript = Array.from(e.results)
    .map(result => result[0])
    .map(result => result.transcript)
    .join("");

  //   if (trascript.startsWith("hello")) {
  p.textContent = trascript;
  if (e.results[0].isFinal) {
    p = document.createElement("p");
    p.textContent = trascript;
    transcript_element.appendChild(p);
    p.textContent = "";

    const recognitionWord = "you";

    if (trascript.includes(recognitionWord)) {
      getWord(recognitionWord);
    }
  }
  //   }
});

function getWord(word) {
  let command = document.createElement("p");
  command.classList.add("command");
  command.textContent = `Getting ${word} ...`;
  transcript_element.appendChild(command);
}

/* for if statment that start with specifice word */
// recognition.addEventListener("end", recognition.start);
// recognition.start();

/* for Talk and End Buttons */
talk_button.addEventListener("click", () => {
  talk_button.disabled = true;
  end_button.disabled = false;
  recognition.start();
});

end_button.addEventListener("click", () => {
  talk_button.disabled = false;
  end_button.disabled = true;
  recognition.stop();
});
