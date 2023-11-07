import React from "react";
import Button, {redirectToURL} from '../Button';

import './buttongrid.css'

const ButtonGroup = ({ buttons, onClick }) => {
  const slicedButtons = buttons.slice(0, 6);
  return (
    <div className='button-group'>
    <div className='button-grid'>

      {slicedButtons.map((button, index) => (
        <Button
          key={index}
          label={button.label}
          onClick={() => handleButtonClick(button, onClick)}
          image={button.image}
        />
      ))}
    </div>
    </div>
  );
};

export default ButtonGroup;

function handleButtonClick(button, onClick) {
  if (button.method === "GET" && button.action) {
    onClick(button.value);
    redirectToURL(button.action);
  } else {
    onClick(button.value);// Send the response back to the server
    console.log(button.value)
  }
}


