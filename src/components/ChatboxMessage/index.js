import React, { useState, useEffect, useRef } from "react";
import Linkify from "react-linkify";
import NameBadge from "../NameBadge";
import "./chatboxMessage.css";
import MyThumbs from '../Thumbs';



export default function ChatboxMessage({ msg, sessionKey, onClick }) {
  //console.log(sessionKey)
  //console.log(msg)
  const isOperator = msg.role === "operator";
  const [messageContent, setMessageContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const streamReaderRef = useRef(null);
  
  useEffect(() => {
    if (msg.isStreaming) {
      streamReaderRef.current = msg.message.getReader();

      const readStream = async () => {
        try {
          let content = "";

          while (true) {
            const { done, value } = await streamReaderRef.current.read();

            if (done) {
              break;
            }

            content += new TextDecoder().decode(value);

            // Update the message content state
            setMessageContent(content);
          }

          // Set loading to false once streaming is complete
          setIsLoading(false);
        } catch (error) {
          console.error('Error reading stream:', error);
        }
      };

      readStream();
    } else {
      setMessageContent(msg.message);
      setIsLoading(false);
    }

    // Clean up the stream reader on component unmount
    return () => {
      if (msg.isStreaming && streamReaderRef.current) {
        streamReaderRef.current.cancel();
      }
    };
  }, [msg]);
  
  return (
    <div
      className={`messages__row ${
        isOperator ? "messages__row--operator" : "messages__row--visitor"
      }`}
    >
      <NameBadge name={msg.name} isOperator={isOperator} />
      <div
        className={`messages__item ${
          isOperator ? "messages__item--operator" : "messages__item--visitor"
        }`}
        style={{ maxWidth: "85%", wordWrap: "break-word" }}
       
      >
        {isOperator ? (
          <React.Fragment>
            {/*Display streaming content as it arrives */}
            
            {isLoading ? "Loading..." : (
              <Linkify
                componentDecorator={(decoratedHref, decoratedText, key) => (
                <a
                target="_blank"
                rel="noreferrer"
                style={{ color: "#003366"}}
                href={decoratedHref}
                key={key}
                >
                {decoratedText}
              </a>
                )}
              >
                {messageContent}
              </Linkify>
            )}
           
          </React.Fragment>
          
        ) : (
          
          <Linkify
            componentDecorator={(decoratedHref, decoratedText, key) => (
            <span style={{ borderRadius: '5px', overflow: 'hidden' }} key={key}>
                <a
                  target="_blank"
                  rel="noreferrer"
                  style={{ 
                    color: "#003366", 
                    textDecoration: 'none',
                    padding: '5px', // Optional: Add padding for spacing inside the link
                    backgroundColor: '#f0f0f0', // Optional: Add background color for the link
                    display: 'inline-block' // Optional: Ensure the link is treated as a block element
                  }}
                  href={decoratedHref}
                >
                  {decoratedText}
                </a>
            </span>
       
            )}
          >
            {messageContent}
          </Linkify>

      
        )}
      
      </div>
      {isOperator && !isLoading}
    </div>
  );
}


/*

import React, { useState, useEffect, useRef } from "react";
import Linkify from "react-linkify";
import NameBadge from "../NameBadge";
import "./chatboxMessage.css";

export default function ChatboxMessage({ msg, sessionKey }) {
  const isOperator = msg.role === "operator";
  const [messageContent, setMessageContent] = useState("");
  const streamReaderRef = useRef(null);

  useEffect(() => {
    // If the message is a streaming response, update content as chunks arrive
    if (msg.isStreaming) {
      streamReaderRef.current = msg.message.getReader();

      const readStream = async () => {
        try {
          let content = "";

          while (true) {
            const { done, value } = await streamReaderRef.current.read();

            if (done) {
              break;
            }

            // Concatenate new chunk to the existing content
            content += new TextDecoder().decode(value);

            // Update the message content state
            setMessageContent(content);
          }
        } catch (error) {
          console.error('Error reading stream:', error);
        }
      };

      readStream();
    } else {
      // If it's not a streaming response, set the content directly
      setMessageContent(msg.message);
    }

    // Clean up the stream reader on component unmount
    return () => {
      if (msg.isStreaming && streamReaderRef.current) {
        streamReaderRef.current.cancel();
      }
    };
  }, [msg]);

  return (
    <div
      className={`messages__row ${
        isOperator ? "messages__row--operator" : "messages__row--visitor"
      }`}
    >
      <NameBadge name={msg.name} isOperator={isOperator} />
      <div
        className={`messages__item ${
          isOperator ? "messages__item--operator" : "messages__item--visitor"
        }`}
      >
        {isOperator ? (
          // Display streaming content if available, otherwise use HTML
          messageContent ? (
            <div dangerouslySetInnerHTML={{ __html: messageContent }} />
          ) : (
            <div>Loading...</div>
          )
        ) : (
          <Linkify
            componentDecorator={(decoratedHref, decoratedText, key) => (
              <a
                target="_blank"
                style={{ color: "#003366" }}
                href={decoratedHref}
                key={key}
              >
                {decoratedText}
              </a>
            )}
          >
            {messageContent}
          </Linkify>
        )}
      </div>
    </div>
  );
}



import Linkify from "react-linkify";
import NameBadge from "../NameBadge";
import "./chatboxMessage.css";

export default function ChatboxMessage({ msg, sessionKey }) {
  console.log(msg)
  const isOperator = msg.role === "operator";

  return (
    <div
      className={`messages__row ${
        isOperator ? "messages__row--operator" : "messages__row--visitor"
      }`}
    >
      <NameBadge name={msg.name} isOperator={isOperator} />
      <div
        className={`messages__item ${
          isOperator ? "messages__item--operator" : "messages__item--visitor"
        }`}
      >
        {isOperator ? (
          <div dangerouslySetInnerHTML={{ __html: msg.response }} />
        ) : (
          <Linkify
            componentDecorator={(decoratedHref, decoratedText, key) => (
              <a
                target="blank"
                style={{ color: "#003366" }}
                href={decoratedHref}
                key={key}
              >
                {decoratedText}
              </a>
            )}
          >
            {msg.message}
          </Linkify>
        )}
      </div>
    </div>
  );
}*/

