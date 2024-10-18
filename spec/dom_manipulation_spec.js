const { JSDOM } = require("jsdom");
const path = require("path");
const fs = require("fs");
const htmlFilePath = path.join(__dirname, "../index.html");
const htmlFile = fs.readFileSync(htmlFilePath, "utf-8");
const { window } = new JSDOM(htmlFile, { runScripts: "dangerously" });
global.window = window;
global.document = window.document;
const { buddy, streakCount, domElements } = require("../src/main");

describe("JamBuddy DOM tests", () => {
  beforeEach(() => {
    domElements.giveUp.click();
    domElements.restartButton.click();
  });

  it("should display the current notes on the screen", () => {
    expect(domElements.outputElement1.textContent).not.toBe("");
    expect(domElements.outputElement2.textContent).not.toBe("");
  });

  it("should test the randomize button", () => {
    const prevNotes1 = domElements.outputElement1.textContent;
    const prevNotes2 = domElements.outputElement2.textContent;
    do {
      domElements.randomizeButton.click();
    } while (
      domElements.outputElement1.textContent == prevNotes1 ||
      domElements.outputElement2.textContent == prevNotes2
    );

    expect(domElements.outputElement1.textContent).not.toBe(prevNotes1);
    expect(domElements.outputElement2.textContent).not.toBe(prevNotes2);
  });

  it("should test the submit button after a wrong answer is inserted", () => {
    domElements.outputElement1.textContent = "A A#";
    buddy.setCurrentNotes(["A", "A#"]);
    domElements.guessInput.value = "4";

    domElements.checkGuessButton.click();

    expect(domElements.guessMessage.textContent).toBe("Wrong guess!");
    expect(domElements.guessMessage.style.color).toBe("orange");
    expect(domElements.streak.textContent).toBe("Streak: 0");
  });

  it("should test the submit button after a correct answer is inserted", () => {
    domElements.outputElement1.textContent = "A A#";
    buddy.setCurrentNotes(["A", "A#"]);
    domElements.guessInput.value = "1";

    domElements.checkGuessButton.click();

    expect(domElements.guessMessage.textContent).toBe("Correct guess!");
    expect(domElements.guessMessage.style.color).toBe("green");
    domElements.randomizeButton.click();

  });

  it("should test the submit button after an invalid answer is inserted", () => {
    domElements.outputElement1.textContent = "A A#";
    buddy.setCurrentNotes(["A", "A#"]);
    domElements.guessInput.value = "1p";

    domElements.checkGuessButton.click();

    expect(domElements.guessMessage.textContent).toBe(
      "Invalid input: Please enter a number."
    );
  });

  it("should test the give-up button", () => {
    domElements.giveUp.click();
    expect(streakCount).toEqual(0);
    expect(domElements.allNotes.style.display).toBe("block");
  });

  it("should test the restart button when the give-up button is not clicked", () => {
    domElements.restartButton.click();
    expect(domElements.restartButton.disabled).toBe(true);
  });

  it("should test the restart button when the give-up button is clicked", () => {
    domElements.giveUp.click();
    expect(domElements.restartButton.disabled).toBe(false);
  });

  it("should test the streak count and notes shown after give up", () => {
    const answer = buddy.getDistance();
    domElements.guessInput.value = answer;
    domElements.checkGuessButton.click();
    expect(domElements.streak.textContent).toBe("Streak: 1");

    expect(domElements.allNotes.style.display).toBe("block");
    domElements.randomizeButton.click();

  });
});
