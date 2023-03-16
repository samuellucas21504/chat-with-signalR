import React, { useState } from 'react';
import './styles.css';

export const ChatInput = (props) => {
    const [user, setUser] = useState('');
    const [message, setMessage] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();

        const isUserProvided = user && user !== "";
        const isMessageProvided = message && message !== "";

        if (isUserProvided && isMessageProvided) 
            props.sendMessage(user, message);
        
        else
            alert('Please insert user and message!');
    }

    const onUserUpdate = (e) => {
        setUser(current => e.target.value);
    }

    const onMessageUpdate = (e) => {
        setMessage(current => e.target.value);
    }

    return (
        <form
            onSubmit={onSubmit}
            className='input-wrapper'
            >
            <input
                id='message'
                placeholder='message'
                value={message}
                onChange={onMessageUpdate}
                className='input-message'
            />
            <input
                id='user'
                placeholder='user'
                value={user}
                onChange={onUserUpdate}
                className='input-message'
            />
            <button
                className='input-button'
                >
                    Send
                </button>
        </form>
    );
}