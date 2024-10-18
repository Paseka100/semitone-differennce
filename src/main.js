const { JamBuddy } = require("./jam_buddy");
const buddy = new JamBuddy();

let streakCount = 0;
const domElements = {
  restartButton: document.querySelector(".restart"),
  giveUp: document.querySelector(".give-up"),
  checkGuessButton: document.querySelector(".checkGuess"),
  randomizeButton: document.querySelector(".button"),
  guessForm: document.getElementById("guessForm"),
  guessMessage: document.getElementById("success"),
  streak: document.getElementById("streak"),
  outputElement1: document.getElementById("note1"),
  outputElement2: document.getElementById("note2"),
  heading: document.getElementById("heading"),
  allNotes: document.getElementById("all-notes"),
  guessInput: document.getElementById("input"),
};

const notesArray = [
  ["A"],
  ["A#", "Bb"],
  ["B"],
  ["C"],
  ["C#", "Db"],
  ["D"],
  ["D#", "Eb"],
  ["E"],
  ["F"],
  ["F#", "Gb"],
  ["G"],
  ["G#", "Ab"],
];

const flats = {
  Bb: "A#",
  Db: "C#",
  Eb: "D#",
  Gb: "F#",
  Ab: "G#",
};

function getNoteDisplay(note) {
  return flats[note] || note;
}

function updateNotesDisplay() {
  buddy.randomizeCurrentNotes();
  const randomNotes = buddy.getCurrentNotes();
  domElements.outputElement1.textContent = randomNotes[0];
  domElements.outputElement2.textContent = randomNotes[1];
}

function updateNotesList() {
  const originalNote1= domElements.outputElement1.textContent.trim();
  const originalNote2= domElements.outputElement2.textContent.trim();

  const note1 = getNoteDisplay(originalNote1);
  const note2 = getNoteDisplay(originalNote2)

  let notesHTML = "notes: <ol>";

  notesArray.forEach((noteArray) => {
    const noteHTML = noteArray.join(", ");
    
    const firstNoteValue = noteArray.some(
      (note) => getNoteDisplay(note) === note1
    );
    const secondNoteValue = noteArray.some(
      (note) => getNoteDisplay(note) === note2
    );
    
    if (firstNoteValue) {
      notesHTML += `<li style="color: grey;">${originalNote1}</li>`;
    } else if (secondNoteValue) {
      notesHTML += `<li style="color: grey;">${originalNote2}</li>`;
    } else {
      notesHTML += `<li>${noteHTML}</li>`;
    }
  });

  notesHTML += `</ol>semitone: ${buddy.getDistance()} & ${Math.abs(buddy.getDistance() - 12)}`;

  domElements.allNotes.innerHTML = notesHTML;
}


function showAllNotes() {
  document.querySelector(".form-container").style.display = "none";
  domElements.outputElement1.style.display = "none";
  domElements.outputElement2.style.display = "none";
  domElements.heading.style.display = "none";

  domElements.allNotes.style.display = "block";
  domElements.allNotes.style.margin = "20px auto 0";
  domElements.allNotes.style.padding = "10px 15px";
  domElements.allNotes.style.backgroundColor = "black";
  domElements.allNotes.style.color = "white";
  domElements.allNotes.style.border = "none";
  domElements.allNotes.style.borderRadius = "2.5rem";
  domElements.allNotes.style.fontSize = "18px";
  domElements.allNotes.style.cursor = "pointer";
  domElements.allNotes.style.marginLeft = "0.5rem";
}

function reset() {
  document.querySelector(".form-container").style.display = "block";
  domElements.outputElement1.style.display = "inline-block";
  domElements.outputElement2.style.display = "inline-block";
  domElements.heading.style.display = "block";
  domElements.allNotes.style.display = "none";

  if (domElements.streak)
    domElements.streak.textContent = `Streak: ${streakCount}`;
}

function checkGuess(isCorrect) {
  if (isCorrect) {
    streakCount++;
    domElements.guessMessage.textContent = "Correct guess!";
    domElements.guessMessage.style.color = "green";
    showAllNotes();
    updateNotesList();
  
    domElements.restartButton.disabled = true;

    domElements.checkGuessButton.disabled = true;
    domElements.giveUp.disabled = true;
  } else {
    streakCount = 0;
    domElements.guessMessage.textContent = "Wrong guess!";
    domElements.guessMessage.style.color = "orange";
  }
  domElements.streak.textContent = `Streak: ${streakCount}`;
}

function GiveUpButton() {
  domElements.giveUp.addEventListener("click", function (event) {
    event.preventDefault();
    streakCount = 0;
    domElements.giveUp.disabled = true;
    domElements.restartButton.disabled = false;
    domElements.checkGuessButton.disabled = true;
    domElements.randomizeButton.disabled = true;
    updateNotesList();
    showAllNotes();
  });
}

function RestartButton() {
  domElements.restartButton.addEventListener("click", function () {
    reset();
    updateNotesDisplay();
    domElements.checkGuessButton.disabled = false;
    domElements.randomizeButton.disabled = false;
    domElements.giveUp.disabled = false;
    domElements.restartButton.disabled = true;
  });
}

domElements.guessForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const guess = Number(document.getElementById("input").value);

  if (isNaN(guess)) {
    domElements.guessMessage.textContent =
      "Invalid input: Please enter a number.";
    domElements.guessMessage.style.color = "red";
    setTimeout(() => (domElements.guessMessage.textContent = ""), 3000);
    return;
  }

  try {
    if (buddy.checkAnswer(guess)) {
      checkGuess(true);
    } else {
      checkGuess(false);
    }
  } catch (error) {
    domElements.guessMessage.textContent = error.message;
    domElements.guessMessage.style.color = "red";
  }

  setTimeout(() => (domElements.guessMessage.textContent = ""), 3000);
});

domElements.randomizeButton.addEventListener("click", function (event) {
  event.preventDefault();
  updateNotesDisplay();
  domElements.outputElement1.style.display = "inline-block";
  domElements.outputElement2.style.display = "inline-block";
  domElements.heading.style.display = "block";

  domElements.allNotes.style.display = "none";
  domElements.checkGuessButton.disabled = false
  document.querySelector(".form-container").style.display = "block";
  domElements.giveUp.disabled = false;
  domElements.restartButton.disabled = true;




});

document.addEventListener("DOMContentLoaded", function () {
  updateNotesDisplay();
  GiveUpButton();
  RestartButton();
});

module.exports = { updateNotesDisplay, buddy, streakCount, domElements };
