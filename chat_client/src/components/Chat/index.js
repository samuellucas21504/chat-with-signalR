import { HubConnectionBuilder } from "@microsoft/signalr";
import { useEffect, useState, useRef } from "react";
import { ChatInput } from "./Input";
import { ChatWindow } from "./Window";

export const Chat = () => {
    const url = "https://localhost:7280/chat";
    const [connection, setConnection] = useState(null);
    const [chat , setChat] = useState([]);
    const latestChat = useRef(null);
    const scrollRef = useRef(null);

    latestChat.current = chat;

    useEffect(() => {
        const newConnection = new HubConnectionBuilder()
            .withUrl(`${url}/hub`)
            .withAutomaticReconnect()
            .build();

        setConnection(newConnection);
    }, []);

    useEffect(() => {
        if(connection) {
            connection.start()
                .then(result => {
                    connection.on('ReceiveMessage', message => {
                        const updatedChat = [...latestChat.current];
                        updatedChat.push(message);

                        setChat(updatedChat);
                    });
                })
                .catch(e => console.log("connection failed", e))
                
        }
    }, [connection])

    const sendMessage = async (user, message) => {
        const chatMessage = {
            user: user,
            message: message
        };

        if(connection._connectionStarted) {
            try {
                await fetch(`${url}`, {
                    method: 'POST',
                    body: JSON.stringify(chatMessage),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            }
            catch(e) {
                console.log('Sending message failed', e);
            }
        }
        else {
            alert('No connection server yet');
        }
    }

    return (
    <>
        <ChatWindow chat={chat}  />
        <div ref={scrollRef} />
        <ChatInput sendMessage={sendMessage} />
    </>
    )

    
}