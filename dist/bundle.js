(()=>{var e={9:e=>{e.exports={errorMessages:{invalidLength:"Only two notes are allowed to be inserted.",invalidNote:"Invalid note.",invalidGuess:"Invalid guess.guess ranges from 0-12",invalidDataType:"guess must be of type number.",duplicate:"same notes cannot be entered"}}},583:(e,t,s)=>{const{errorMessages:n}=s(9);e.exports={JamBuddy:class{constructor(){this.currentNotes=[],this.notesObj={notes:["A","A#","B","C","C#","D","D#","E","F","F#","G","G#"],flats:{Bb:"A#",Db:"C#",Eb:"D#",Gb:"F#",Ab:"G#"}}}setCurrentNotes(e){if(2!=e.length)throw new Error(n.invalidLength);if(e[0]===e[1])throw new Error(n.duplicate);for(let t=0;t<e.length;t++){if("string"!=typeof e[t])throw new Error(n.invalidDataType);if(-1===this.notesObj.notes.indexOf(e[t])&&!this.notesObj.flats.hasOwnProperty(e[t]))throw new Error(n.invalidNote)}this.currentNotes=e}getCurrentNotes(){return this.currentNotes}getDistance(){const e=[this.currentNotes[0],this.currentNotes[1]];for(let t=0;t<2;t++)for(const s in this.notesObj.flats)s==e[t]&&(e[t]=this.notesObj.flats[s]);return Math.abs(this.notesObj.notes.indexOf(e[0])-this.notesObj.notes.indexOf(e[1]))}checkAnswer(e){if(e>12||e<0)throw new Error(n.invalidGuess);if("number"!=typeof e)throw new Error(n.invalidDataType);const t=this.getDistance(),s=this.notesObj.notes.length;return e===t||s-e==t}#e(){const e=[...this.notesObj.notes,...Object.keys(this.notesObj.flats)],t=[];do{for(let s=0;s<2;s++)t[s]=e[Math.floor(Math.random()*e.length)]}while(t[0]===t[1]);return t}randomizeCurrentNotes(){const e=this.#e();this.setCurrentNotes(e)}}}},803:(e,t,s)=>{const{JamBuddy:n}=s(583),o=new n;let r=0;const l={restartButton:document.querySelector(".restart"),giveUp:document.querySelector(".give-up"),checkGuessButton:document.querySelector(".checkGuess"),randomizeButton:document.querySelector(".button"),guessForm:document.getElementById("guessForm"),guessMessage:document.getElementById("success"),streak:document.getElementById("streak"),outputElement1:document.getElementById("note1"),outputElement2:document.getElementById("note2"),heading:document.getElementById("heading"),allNotes:document.getElementById("all-notes"),guessInput:document.getElementById("input")},i=[["A"],["A#","Bb"],["B"],["C"],["C#","Db"],["D"],["D#","Eb"],["E"],["F"],["F#","Gb"],["G"],["G#","Ab"]],a={Bb:"A#",Db:"C#",Eb:"D#",Gb:"F#",Ab:"G#"};function u(e){return a[e]||e}function d(){o.randomizeCurrentNotes();const e=o.getCurrentNotes();l.outputElement1.textContent=e[0],l.outputElement2.textContent=e[1]}function c(){const e=l.outputElement1.textContent.trim(),t=l.outputElement2.textContent.trim(),s=u(e),n=u(t);let r="notes: <ol>";i.forEach((o=>{const l=o.join(", "),i=o.some((e=>u(e)===s)),a=o.some((e=>u(e)===n));r+=i?`<li style="color: grey;">${e}</li>`:a?`<li style="color: grey;">${t}</li>`:`<li>${l}</li>`})),r+=`</ol>semitone: ${o.getDistance()} & ${Math.abs(o.getDistance()-12)}`,l.allNotes.innerHTML=r}function g(){document.querySelector(".form-container").style.display="none",l.outputElement1.style.display="none",l.outputElement2.style.display="none",l.heading.style.display="none",l.allNotes.style.display="block",l.allNotes.style.margin="20px auto 0",l.allNotes.style.padding="10px 15px",l.allNotes.style.backgroundColor="black",l.allNotes.style.color="white",l.allNotes.style.border="none",l.allNotes.style.borderRadius="2.5rem",l.allNotes.style.fontSize="18px",l.allNotes.style.cursor="pointer",l.allNotes.style.marginLeft="0.5rem"}function m(e){e?(r++,l.guessMessage.textContent="Correct guess!",l.guessMessage.style.color="green",g(),c(),l.restartButton.disabled=!0,l.checkGuessButton.disabled=!0,l.giveUp.disabled=!0):(r=0,l.guessMessage.textContent="Wrong guess!",l.guessMessage.style.color="orange"),l.streak.textContent=`Streak: ${r}`}l.guessForm.addEventListener("submit",(function(e){e.preventDefault();const t=Number(document.getElementById("input").value);if(isNaN(t))return l.guessMessage.textContent="Invalid input: Please enter a number.",l.guessMessage.style.color="red",void setTimeout((()=>l.guessMessage.textContent=""),3e3);try{o.checkAnswer(t)?m(!0):m(!1)}catch(e){l.guessMessage.textContent=e.message,l.guessMessage.style.color="red"}setTimeout((()=>l.guessMessage.textContent=""),3e3)})),l.randomizeButton.addEventListener("click",(function(e){e.preventDefault(),d(),l.outputElement1.style.display="inline-block",l.outputElement2.style.display="inline-block",l.heading.style.display="block",l.allNotes.style.display="none",l.checkGuessButton.disabled=!1,document.querySelector(".form-container").style.display="block",l.giveUp.disabled=!1,l.restartButton.disabled=!0})),document.addEventListener("DOMContentLoaded",(function(){d(),l.giveUp.addEventListener("click",(function(e){e.preventDefault(),r=0,l.giveUp.disabled=!0,l.restartButton.disabled=!1,l.checkGuessButton.disabled=!0,l.randomizeButton.disabled=!0,c(),g()})),l.restartButton.addEventListener("click",(function(){document.querySelector(".form-container").style.display="block",l.outputElement1.style.display="inline-block",l.outputElement2.style.display="inline-block",l.heading.style.display="block",l.allNotes.style.display="none",l.streak&&(l.streak.textContent=`Streak: ${r}`),d(),l.checkGuessButton.disabled=!1,l.randomizeButton.disabled=!1,l.giveUp.disabled=!1,l.restartButton.disabled=!0}))})),e.exports={updateNotesDisplay:d,buddy:o,streakCount:r,domElements:l}}},t={};!function s(n){var o=t[n];if(void 0!==o)return o.exports;var r=t[n]={exports:{}};return e[n](r,r.exports,s),r.exports}(803)})();