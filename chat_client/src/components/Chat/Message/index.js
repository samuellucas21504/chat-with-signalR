import React, { useState } from 'react';
import "./styles.css";

export const Message = (props) => (
    <div className='message-wrapper'>
        <div className='message-username'>{props.user}</div>
        <div className='message-content'>{props.message}</div>
    </div>
);