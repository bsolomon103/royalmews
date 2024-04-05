/*
import React, { useState } from 'react';
import './speech.css'

const SpeechToText = ({ keydown }) => {
  const [transcript, setTranscript] = useState('');
  const [recognition, setRecognition] = useState(null);
  const [isRecording, setIsRecording] = useState(false);

  const toggleRecording = () => {
    if (isRecording) {
      stopListening();
    } else {
      startListening();
    }
  };

  const startListening = () => {
    const recognitionInstance = new window.webkitSpeechRecognition();
    recognitionInstance.onresult = handleRecognitionResult;
    recognitionInstance.start();
    setRecognition(recognitionInstance);
    setIsRecording(true);
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
      //onClick(transcript); // Call the callback function for sending collected speech to server
      //updateMessages(transcript); // Call the callback function to update chatbox messages with transcript
      setIsRecording(false);
      keydown({ key: 'Enter', preventDefault: () => {} }); 
    }
  };

  const handleRecognitionResult = (event) => {
    const currentTranscript = event.results[0][0].transcript;
    setTranscript(currentTranscript);
  };

  return (
    <div>
      <button onClick={toggleRecording} className={isRecording ? 'recording' : ''}>
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </button>
      <p>{transcript}</p>
    </div>
  );
}

export default SpeechToText;

*/

import React, { useState } from 'react';
import './speech.css';
export default function SpeechToText({ sendToServer, updateManualTextInput  }) {
  const [transcript, setTranscript] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  const recognition = new window.webkitSpeechRecognition();

  recognition.onstart = () => {
    setIsRecording(true);
  };

  recognition.onresult = (event) => {
    const currentTranscript = event.results[0][0].transcript;
    setTranscript(currentTranscript);
    updateManualTextInput(currentTranscript);
  };

  recognition.onend = () => {
    setIsRecording(false);
    sendToServer(transcript); // Sending the transcript to the parent component's function
  };

  const toggleRecording = () => {
    if (!isRecording) {
      recognition.start();
    } else {
      recognition.stop();
    }
  };

  return (
    <div>
      <button onClick={toggleRecording} className={isRecording ? 'recording' : ''}>
        {isRecording ? 'Stop Recording' : <img src="https://img.icons8.com/?size=60&id=80422&format=png" alt="Voice Note" width='25px' height='25px' border-radius='50%'/>}
      </button>
    </div>
  );
}


