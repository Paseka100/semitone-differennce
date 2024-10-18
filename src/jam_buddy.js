const { errorMessages } = require("./helper_objects");

class JamBuddy {
  constructor() {
    this.currentNotes = [];
    this.notesObj = {
      notes: ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"],
      flats: {
        Bb: "A#",
        Db: "C#",
        Eb: "D#",
        Gb: "F#",
        Ab: "G#",
      },
    };
  }

  setCurrentNotes(listOfNotes) {
    if (listOfNotes.length != 2) {
      throw new Error(errorMessages.invalidLength);
    }

    if (listOfNotes[0] === listOfNotes[1]) {
      throw new Error(errorMessages.duplicate);
    }

    for (let i = 0; i < listOfNotes.length; i++) {
      if (typeof listOfNotes[i] != "string") {
        throw new Error(errorMessages.invalidDataType);
      }
      if (
        this.notesObj.notes.indexOf(listOfNotes[i]) === -1 &&
        !this.notesObj.flats.hasOwnProperty(listOfNotes[i])
      ) {
        throw new Error(errorMessages.invalidNote);
      }
    }

    this.currentNotes = listOfNotes;
  }

  getCurrentNotes() {
    return this.currentNotes;
  }

  getDistance() {
    const finalNotes = [this.currentNotes[0], this.currentNotes[1]];

    for (let i = 0; i < 2; i++) {
      for (const flat in this.notesObj.flats) {
        if (flat == finalNotes[i]) {
          finalNotes[i] = this.notesObj.flats[flat];
        }
      }
    }

    const distance = Math.abs(
      this.notesObj.notes.indexOf(finalNotes[0]) -
        this.notesObj.notes.indexOf(finalNotes[1])
    );

    return distance;
  }

  checkAnswer(guess) {
    if (guess > 12 || guess < 0) {
      throw new Error(errorMessages.invalidGuess);
    }

    if (typeof guess !== "number") {
      throw new Error(errorMessages.invalidDataType);
    }

    const answer = this.getDistance();
    const totalNotes = this.notesObj.notes.length;

    if (guess === answer) {
      return true;
    } else if (totalNotes - guess == answer) {
      return true;
    }
    return false;
  }

  #randomizeNotes() {
    const allNotes = [
      ...this.notesObj.notes,
      ...Object.keys(this.notesObj.flats),
    ];
    const notesToReturn = [];
    do {
      for (let i = 0; i < 2; i++) {
        notesToReturn[i] =
          allNotes[Math.floor(Math.random() * allNotes.length)];
      }
    } while (notesToReturn[0] === notesToReturn[1]);
    return notesToReturn;
  }

  randomizeCurrentNotes() {
    const randomNotes = this.#randomizeNotes();
    this.setCurrentNotes(randomNotes);
  }
}
module.exports = { JamBuddy };
