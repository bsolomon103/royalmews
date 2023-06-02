
import { useState } from "react";
import "./chatbox.css";
import { BsChatRightTextFill } from "react-icons/bs";
import { RiCloseFill } from "react-icons/ri";
import { IoMdSend } from "react-icons/io";
import ChatboxMessage from "../ChatboxMessage";
//import fetch from 'node-fetch';




const URL = "https://api.eazibots.com/api/response/"


function Chatbox({ userName, operatorName }) {
  
    
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);

    const toggleChatbox = () => {
        setIsOpen(!isOpen);
    };
    
    //const [csrftoken, setcsrftoken] = useState('');
    function getCookie(name){
            let cookieValue = '';
            if (document.cookie && document.cookie !== ''){
                let cookies = document.cookie.split(';');
                for (let i = 0; i < cookies.length; i++){
                    let cookie = cookies[i].trim();
                    if (cookie.substring(0,name.length + 1)===(name + '=')) {
                        cookieValue = decodeURIComponent(cookie.substring(name.length +1));
                        break;
                    }
                }
            }
            return cookieValue;
        }

    
    
    



    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleSend();
        }
    };

    const handleSend = async () => {
        if (text.trim() === "") {
            return;
        }

        setLoading(true);
        const msg1 = { role: "user", name: userName, message: text };
        setMessages((messages) => [...messages, msg1]);
        setText("");
        
        const csrftoken = getCookie('csrftoken');
        console.log(csrftoken)
        

        try {
            const response = await fetch(URL, {
            method: "POST",
            mode: 'cors',
            headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": "M3p1twL1auvNlFZPlSxMd9yaP8kTkXd1",
            "X-Session-ID": "23k34olt7ayyrvb52f81uzw8pud0iyvk"
     
            
            },
            body: JSON.stringify({ msg: text }),
        
  
            });

            const result = await response.json();

            setLoading(false);
            const msg2 = { role: "operator", name: operatorName, message: result };
            //setTimeout(2000)
            setMessages((messages) => [...messages, msg2]);
        } catch (err) {
            setLoading(false);
            console.error("Error:", err);
        }
    };
    
  

   
    

    return (
        <div className="chatbox">
            <div className={`chatbox__support ${isOpen ? "chatbox--active" : ""}`}>
                <div className="chatbox__header">
                    <img src="https://img.icons8.com/color/48/000000/circled-user-female-skin-type-5--v1.png" alt="" />
                    <span className="chatbox__title" style={{ color: "white", font: "4px" }}>
                        <b>
                          I am a clever AI assistant.<br /><br />
                          How can I help ?
                        </b>
                    </span>
                    <button className="chatbox__close" onClick={toggleChatbox}>
                        <RiCloseFill size={20} fill="#FFF" />
                    </button>
                </div>
                <div className="chatbox__messages">
                    {loading && (
                        <div className="loading">
                            <div className="circle circle-1"></div>
                            <div className="circle circle-2"></div>
                            <div className="circle circle-3"></div>
                            {loading}
                        </div>
                    )}
                    {messages
                        .slice()
                        .reverse()
                        .map((msg, index) => {
                            return <ChatboxMessage key={index} msg={msg} />;
                        })}
                </div>
                <div className="chatbox__footer">
                    <div className="chatbox__send">
                        <input
                            type="text"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Write a message...."
                        />
                        <button className="send__button" onClick={handleSend}>
                            <IoMdSend size={30} color="#FFF" />
                        </button>
                    </div>
                    <div className="chatbox__powered">Powered By Aurora</div>
                </div>
            </div>
            <div className="chatbox__toggle">
                <button className="chatbox__button" onClick={toggleChatbox}>
                    <BsChatRightTextFill size={40} color="#FFF" />
                </button>
            </div>
        </div>
    );
}

export default Chatbox;

/*
import { useState } from "react";
import "./chatbox.css";
import { BsChatRightTextFill } from "react-icons/bs";
import { RiCloseFill } from "react-icons/ri";
import { IoMdSend } from "react-icons/io";
import ChatboxMessage from "../ChatboxMessage";

const URL1 = "http://127.0.0.1:8080/api/response/";
const URL2 = "http://127.0.0.1:8080/api/response2/";

function Chatbox({ userName, operatorName }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const toggleChatbox = () => {
    setIsOpen(!isOpen);
  };

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

  const csrftoken = getCookie("csrftoken");
  //console.log(csrftoken);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSend = async () => {
    if (text.trim() === "") {
      return;
    }

    setLoading(true);
    const msg1 = { role: "user", name: userName, message: text };
    setMessages((messages) => [...messages, msg1]);
    setText("");

    try {
      const response1 = await fetch(URL1, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ msg: text }),
      });

      const result1 = await response1.json();

      setLoading(false);
      const msg2 = { role: "operator", name: operatorName, message: result1 };
      setMessages((messages) => [...messages, msg2]);

      await new Promise((resolve) => setTimeout(resolve, 1500)); // Wait for 1.5 seconds

      const response2 = await fetch(URL2, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ msg: result1 }),
      });

      const result2 = await response2.json();

      const msg3 = { role: "operator", name: operatorName, message: result2 };
      setMessages((messages) => [...messages, msg3]);
    } catch (err) {
      setLoading(false);
      console.error("Error:", err);
    }
  };

  return (
    <div className="chatbox">
      <div className={`chatbox__support ${isOpen ? "chatbox--active" : ""}`}>
        <div className="chatbox__header">
          <img
            src="https://img.icons8.com/color/48/000000/circled-user-female-skin-type-5--v1.png"
            alt=""
          />
          <span className="chatbox__title" style={{ color: "white", font: "10px" }}>
            <b>I am Sascia an information assistant designed to get you answers quickly.</b>
          </span>
          <button className="chatbox__close" onClick={toggleChatbox}>
            <RiCloseFill size={20} fill="#FFF" />
          </button>
        </div>
        <div className="chatbox__messages">
          {loading && (
            <div className="loading">
              <div className="circle circle-1"></div>
              <div className="circle circle-2"></div>
              <div className="circle circle-3"></div>
              {loading}
            </div>
          )}
          {messages.slice().reverse().map((msg, index) => {
            return <ChatboxMessage key={index} msg={msg} />;
          })}
        </div>
        <div className="chatbox__footer">
          <div className="chatbox__send">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Write a message...."
            />
            <button className="send__button" onClick={handleSend}>
              <IoMdSend size={30} color="#FFF" />
            </button>
          </div>
          <div className="chatbox__powered">Powered By Aurora</div>
        </div>
      </div>
      <div className="chatbox__toggle">
        <button className="chatbox__button" onClick={toggleChatbox}>
          <BsChatRightTextFill size={40} color="#FFF" />
        </button>
      </div>
    </div>
  );
}

export default Chatbox;
*/
