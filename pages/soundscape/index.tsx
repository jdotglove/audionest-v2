import { Fragment, useEffect, useState } from "react";
import { Button, Row, Col, Container, Tabs, Tab } from "react-bootstrap";

import SoundscapeNavbar from "../../src/components/Navbars/SoundscapeNavbar";

declare global {
  interface Window {
    webkitAudioContext: typeof AudioContext;
  }
}

export default function SoundscapeDashboard() {
  // const [currentNotes, setCurrentNotes] = useState([0, 3, 0, 7, 8, 7, 3, 2]);
  // const notes = {
  //   C4: 261.63,
  //   Db4: 277.18,
  //   D4: 293.66,
  //   Eb4: 311.13,
  //   E4: 329.63,
  //   F4: 349.23,
  //   Gb4: 369.99,
  //   G4: 392.0,
  //   Ab4: 415.3,
  //   A4: 440,
  //   Bb4: 466.16,
  //   B4: 493.88,
  //   C5: 523.25,
  // };
  // useEffect(() => {
  //   console.log("here")
  //   const AudioContext = window.AudioContext || window.webkitAudioContext;

  //   // NOTE SELECTS
  //   const noteSelectsDiv = document.querySelector("#note-selects-div");

  //   for (let i = 0; i <= 7; i++) {
  //     const select = document.createElement("select");
  //     select.id = `note ${i + 1}`;
  //     for (let j = 0; j < Object.keys(notes).length; j++) {
  //       const option = document.createElement("option");
  //       option.value = `${j}`;
  //       option.innerText = `${Object.keys(notes)[j]}`;
  //       select.appendChild(option);
  //       select.addEventListener("change", setCurrentNotes);
  //     }
  //     noteSelectsDiv.appendChild(select);
  //   }

    
  //   const noteSelects = document.querySelectorAll("select");
  //   function setNoteSelects() {
  //     for (let i = 0; i < currentNotes.length; i++) {
  //       noteSelects[i].value = `${currentNotes[i]}`;
  //     }
  //   }

  //   console.log(noteSelects.length)

  //   function setCurrentNotes() {
  //     for (let i = 0; i < noteSelects.length; i++) {
  //       currentNotes[i] = Number.parseFloat(noteSelects[i].value);
  //     }
  //   }

  //   setNoteSelects();

  //   const context = new AudioContext();
  //   const masterVolume = context.createGain();
  //   masterVolume.connect(context.destination);

  //   const startButton = document.querySelector("#start");
  //   const stopButton = document.querySelector("#stop");

  //   const volumeControl = document.querySelector("#volume-control");
  //   const attackControl = document.querySelector("#attack-control");
  //   const releaseControl = document.querySelector("#release-control");
  //   let attackTime = 0.3;
  //   let sustainLevel = 0.8;
  //   let releaseTime = 0.3;

  //   masterVolume.gain.value = 0.1;

  //   volumeControl.addEventListener("input", function () {
  //     console.log("here", this.value);
  //     console.log(masterVolume.gain.value);
  //     masterVolume.gain.value = this.value;
  //   });
  //   attackControl.addEventListener("input", function () {
  //     attackTime = parseFloat(this.value);
  //   });

  //   releaseControl.addEventListener("input", function () {
  //     releaseTime = parseFloat(this.value);
  //   });

  //   const waveforms = document.getElementsByName(
  //     "waveform"
  //   ) as unknown as Array<HTMLInputElement>;
  //   let waveform;

  //   function setWaveform() {
  //     for (var i = 0; i < waveforms.length; i++) {
  //       if (waveforms[i].checked) {
  //         waveform = waveforms[i].value;
  //       }
  //     }
  //   }

  //   startButton.addEventListener("click", function () {
  //     const oscillator = context.createOscillator();
  //     const noteGain = context.createGain();
  //     noteGain.gain.setValueAtTime(0, 0);
  //     noteGain.gain.linearRampToValueAtTime(
  //       sustainLevel,
  //       context.currentTime + attackTime
  //     );
  //     noteGain.gain.setValueAtTime(
  //       sustainLevel,
  //       context.currentTime + 1 - releaseTime
  //     );
  //     noteGain.gain.linearRampToValueAtTime(0, context.currentTime + 1);

  //     oscillator.type = waveform;
  //     oscillator.frequency.setValueAtTime(220, 0);
  //     oscillator.start(0);
  //     oscillator.connect(noteGain);
  //     noteGain.connect(masterVolume);
  //     stopButton.addEventListener("click", function () {
  //       oscillator.stop(0);
  //     });
  //     waveforms.forEach((waveformInput) => {
  //       waveformInput.addEventListener("change", function () {
  //         setWaveform();
  //         oscillator.type = waveform;
  //       });
  //     });
  //   });
  // },[currentNotes]);

  return (
    <Fragment>
      <Row>
        <Col>
          <SoundscapeNavbar />
        </Col>
      </Row>
      <Container>
        <Row className="pt-3">
          <Col>
            <Button id="start">Start</Button> <Button id="stop">Stop</Button>
          </Col>
        </Row>
        <label htmlFor="volume-control">Master Volume</label>
        <br />
        <input
          type="range"
          id="volume-control"
          min="0"
          max="1"
          step="0.05"
          defaultValue=".2"
        />
        <br />
        <label htmlFor="tempo-control">Tempo</label>
        <br />
        <input
          type="range"
          id="tempo-control"
          min="60"
          max="300"
          step="5"
          defaultValue="120"
        />
        <br />
        <div id="note-selects-div">
          <h2>Notes</h2>
        </div>
        <div id="oscillator-options">
          <h2>Oscillator</h2>
          <input
            type="radio"
            id="sin-wave"
            name="waveform"
            defaultValue="sine"
            defaultChecked
          />
          <label htmlFor="sin-wave">Sin Wave</label>
          <br />
          <input type="radio" id="square-wave" name="waveform" defaultValue="square" />
          <label htmlFor="square-wave">Square Wave</label>
          <br />
          <input
            type="radio"
            id="triangle-wave"
            name="waveform"
            defaultValue="triangle"
          />
          <label htmlFor="triangle-wave">Triangle Wave</label>
          <br />
          <input
            type="radio"
            id="sawtooth-wave"
            name="waveform"
            defaultValue="sawtooth"
          />
          <label htmlFor="sawtooth-wave">Sawtooth Wave</label>
        </div>
        <div id="envelope-options">
          <h2>Envelope</h2>
          <label htmlFor="attack-control">Attack Time</label>
          <br />
          <input
            type="range"
            id="attack-control"
            defaultValue="0.3"
            min="0"
            max="0.5"
            step="0.02"
          />
          <br />
          <label htmlFor="release-control">Release Time</label>
          <br />
          <input
            type="range"
            id="release-control"
            defaultValue="0.3"
            min="0"
            max="0.5"
            step="0.02"
          />
          <br />
          <label htmlFor="note-length-control">Note Length</label>
          <br />
          <input
            type="range"
            id="note-length-control"
            defaultValue="1"
            min="0.2"
            max="2"
            step="0.05"
          />
          <br />
        </div>
        <div id="vibrato-options">
          <h2>Vibrato</h2>
          <label htmlFor="vibrato-amount-control">Vibrato Amount</label>
          <br />
          <input
            type="range"
            id="vibrato-amount-control"
            defaultValue="0"
            min="0"
            max="5"
            step="0.5"
          />
          <br />
          <label htmlFor="vibrato-amount-control">Vibrato Speed</label>
          <br />
          <input
            type="range"
            id="vibrato-speed-control"
            defaultValue="10"
            min="0"
            max="30"
            step="0.5"
          />
          <br />
        </div>
        <div id="delay-options">
          <h2>Delay</h2>
          <label htmlFor="delay-time-control">Delay Time</label>
          <br />
          <input
            id="delay-time-control"
            type="range"
            min="0"
            max="1"
            step="0.05"
            defaultValue="0"
          />
          <br />
          <label htmlFor="feedback-control">Delay Feedback</label>
          <br />
          <input
            id="feedback-control"
            type="range"
            min="0"
            max=".9"
            step="0.05"
            defaultValue="0"
          />
          <br />
          <label htmlFor="delay-amount-control">Delay Amount</label>
          <br />
          <input
            id="delay-amount-control"
            type="range"
            min="0"
            max=".9"
            step="0.05"
            defaultValue="0"
          />
        </div>
      </Container>
    </Fragment>
  );
}
