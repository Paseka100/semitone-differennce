const { errorMessages } = require("../src/helper_objects");
const { JamBuddy } = require("../src/jam_buddy");
describe("JamBuddy class", () => {
  let buddy;
  beforeEach(function () {
    buddy = new JamBuddy();
  });

  describe("setCurrentNotes method:", () => {
    it("should throw an error when a invalid note is inserted", () => {
      expect(() => expect(buddy.setCurrentNotes(["K", "Bb"]))).toThrowError(
        errorMessages.invalidNote
      );
    });

    it("should throw an error when same notes are inserted", () => {
      expect(() => expect(buddy.setCurrentNotes(["Bb", "Bb"]))).toThrowError(
        errorMessages.duplicate
      );
    });

    it("should throw an error when two notes are not inserted", () => {
      expect(() => expect(buddy.setCurrentNotes(["A#"]))).toThrowError(
        errorMessages.invalidLength
      );
    });
  });

  describe("getCurrentNotes method:", () => {
    beforeEach(function () {
      buddy.setCurrentNotes(["A", "B"]);
    });

    it("should return the current notes set", () => {
      expect(buddy.getCurrentNotes()).toEqual(["A", "B"]);
    });
  });

  describe("checkAnswer method:", () => {
    beforeEach(function () {
      buddy.setCurrentNotes(["A", "A#"]);
    });

    it("should return true when the guess is correct", () => {
      expect(buddy.checkAnswer(1)).toEqual(true);
      expect(buddy.checkAnswer(11)).toEqual(true);
    });
    it("should throw an error when an invalid datatype is inserted", () => {
      expect(() => expect(buddy.checkAnswer(""))).toThrowError(
        errorMessages.invalidDataType
      );
    });

    it("should return false when the guess is incorrect", () => {
      expect(buddy.checkAnswer(2)).toEqual(false);
    });

    it("should throw an error when an invalid guess is inserted", () => {
      expect(() => expect(buddy.checkAnswer(34))).toThrowError(
        errorMessages.invalidGuess
      );
    });
  });

  describe("randomizeCurrentNotes", () => {
    let notes;
    beforeEach(function () {
      notes = [];
    });

    it("should test the two randomized notes", () => {
      notes = buddy.getCurrentNotes();
      buddy.randomizeCurrentNotes();
      expect(buddy.getCurrentNotes()).not.toBe(notes);
    });
  });
});
