import React from 'react';
import './CheckoutButton.css';

function CheckoutButton(sessionKey) {
  
  
  function getCookie(name) {
    let cookieValue = "";
    if (document.cookie && document.cookie !== "") {
      let cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === name + "=") {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const session_key = sessionKey['sessionKey'];
    

    const csrftoken = getCookie("csrftoken");
    const url = 'https://api.eazibots.com/stripeaccounts/create-checkout-session/'
    const response = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    headers: {
      "Content-Type":'application/json',
      "X-CSRFToken": csrftoken,
    },
    body: JSON.stringify({session_key:session_key}),
    credentials: "include"
    }); 
    const result = await response.json();
    
    if (result['checkout_url']) {
      console.log(result)
      // Redirect the user to the received URL
      window.open(result['checkout_url'], '_blank');
    }
    
  
  };

  return (
    
    <form className='checkout' action="/create-checkout-session" method="POST" onSubmit={handleSubmit}>
        <button type="submit">Checkout</button>
    </form>
  );
}

export default CheckoutButton;
