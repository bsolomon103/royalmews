//import React from "react";
import Button, {redirectToURL} from '../Button';
import MyThumbs from '../Thumbs';

import React, { useState, useEffect } from 'react';

import './buttongrid.css'

const ButtonGroup = ({ buttons, onClick }) => {
  const slicedButtons = buttons.slice(0, 6);
  
  return (
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


/*




  const [showButtonGroup, setShowButtonGroup] = useState(false);

  useEffect(() => {
    // Set a timeout to show the button group after 2000 milliseconds (2 seconds)
    const timeoutId = setTimeout(() => {
      setShowButtonGroup(true);
    }, 0);

    // Clean up the timeout if the component unmounts or if you want to cancel it for any reason
    return () => clearTimeout(timeoutId);
  }, []); // The empty dependency array ensures that this effect runs only once, similar to componentDidMount

   return (
    <div className={`button-group ${showButtonGroup ? 'visible' : 'hidden'}`}>
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
*/