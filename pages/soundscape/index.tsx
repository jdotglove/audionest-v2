import { Fragment, useEffect } from "react";
import { Button, Row, Col, Container, Tabs, Tab } from "react-bootstrap";

import SoundscapeNavbar from "../../../src/components/Navbars/SoundscapeNavbar";

declare global {
  interface Window {
    webkitAudioContext: typeof AudioContext;
  }
}

export default function SoundscapeDashboard() {
  useEffect(() => {
    const AudioContext = window.AudioContext || window.webkitAudioContext;

    const context = new AudioContext();
    const masterVolume = context.createGain();
    masterVolume.connect(context.destination);

    const startButton = document.querySelector('#start');
    const stopButton = document.querySelector('#stop');

    const volumeControl = document.querySelector("#volume-control");
    const attackControl = document.querySelector("#attack-control");
    const releaseControl = document.querySelector("#release-control");
    let attackTime = 0.3;
    let sustainLevel = 0.8;
    let releaseTime = 0.3;

    
    masterVolume.gain.value = 0.1;

    volumeControl.addEventListener("input", function () {
      console.log('here', this.value)
      console.log(masterVolume.gain.value)
      masterVolume.gain.value = this.value;
    });
    attackControl.addEventListener("input", function () {
      attackTime = parseFloat(this.value);
    });

    releaseControl.addEventListener("input", function () {
      releaseTime = parseFloat(this.value);
    });



    const waveforms = document.getElementsByName("waveform") as unknown as Array<HTMLInputElement>;
    let waveform;

    function setWaveform() {
      for (var i = 0; i < waveforms.length; i++) {
        if (waveforms[i].checked) {
          waveform = waveforms[i].value;
        }
      }
    }
    

    startButton.addEventListener('click', function(){
      const oscillator = context.createOscillator();
      const noteGain = context.createGain();
      noteGain.gain.setValueAtTime(0, 0);
      noteGain.gain.linearRampToValueAtTime(sustainLevel, context.currentTime + attackTime);
      noteGain.gain.setValueAtTime(sustainLevel, context.currentTime + 1 - releaseTime);
      noteGain.gain.linearRampToValueAtTime(0, context.currentTime + 1);
      
      oscillator.type = waveform;
      oscillator.frequency.setValueAtTime(220, 0);
      oscillator.start(0);
      oscillator.connect(noteGain);
      noteGain.connect(masterVolume);
      stopButton.addEventListener('click', function() {
        oscillator.stop(0);
      });
      waveforms.forEach((waveformInput) => {
        waveformInput.addEventListener('change', function() {
          setWaveform();
          oscillator.type = waveform;
        });
      });
    });
  });

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
        <Row>
          <Col>
            <span>Master Volume</span>{' '}
            <input
              type="range"
              id="volume-control"
              min="0"
              max="1"
              step="0.05"
              defaultValue="0.1"
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <span>Attack Control</span>{' '}
            <input
              type="range"
              id="attack-control"
              min="0"
              max="1"
              step="0.05"
              defaultValue="0.1"
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <span>Release Control</span>{' '}
            <input
              type="range"
              id="release-control"
              min="0"
              max="1"
              step="0.05"
              defaultValue="0.1"
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <input
              type="radio"
              id="sin-wave"
              name="waveform"
              value="sine"
              defaultChecked
            />{' '}
            <label htmlFor="sin-wave">Sin Wave</label>
          </Col>
        </Row>
        <Row>
          <Col>
            <input
              type="radio"
              id="square-wave"
              name="waveform"
              value="square"
            />{' '}
            <label htmlFor="square-wave">Square Wave</label>
          </Col>
        </Row>
        <Row>
          <Col>
            <input
              type="radio"
              id="triangle-wave"
              name="waveform"
              value="triangle"
            />{' '}
            <label htmlFor="triangle-wave">Triangle Wave</label>
          </Col>
        </Row>
        <Row>
          <Col>
            <input
              type="radio"
              id="sawtooth-wave"
              name="waveform"
              value="sawtooth"
            />{' '}
            <label htmlFor="sawtooth">Sawtooth Wave</label>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
}
