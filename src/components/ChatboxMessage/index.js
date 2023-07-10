import Linkify from "react-linkify";
import NameBadge from "../NameBadge";
import "./chatboxMessage.css";





export default function ChatboxMessage({ msg, sessionKey }) {
    const isOperator = msg.role === "operator";

    return (
        <div className={`messages__row ${isOperator ? "messages__row--operator" : "messages__row--visitor"}`}>
            <NameBadge name={msg.name} isOperator={isOperator} />
            <div className={`messages__item ${isOperator ? "messages__item--operator" : "messages__item--visitor"}`}>
                {isOperator ? (
                    <div dangerouslySetInnerHTML={{ __html: msg.message }}/>
                ) : (
                    <Linkify
                        componentDecorator={(decoratedHref, decoratedText, key) => (
                            <a target="blank" style={{ color: "#003366" }} href={decoratedHref} key={key}>
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
}

