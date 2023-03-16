import { Message } from "../Message";
import "./styles.css";

export const ChatWindow = (props) => {
    const chat = props.chat.map(msg =>
        <Message
            key={Date.now() * Math.random()}
            user={msg.user}
            message={msg.message}
        />);
    
    return (
        <div className="chat-window">
            {chat}
        </div>
    )
}