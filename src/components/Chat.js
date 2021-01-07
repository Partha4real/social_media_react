import React, { Component } from 'react';
import '../chat.css';

class Chat extends Component {
    constructor (props) {
        super(props);
        this.state ={
            messages: [],  //{content: 'some messages', self: true/false}
            typedMessage: '',
        }
    }
    render() {
        const {typedMessage, messages} = this.state;
        return (
            <div className="chat-container">
                <div className="chat-header">
                    Chat
                    <img src="https://www.flaticon.com/svg/static/icons/svg/660/660252.svg" alt="" height={17} />
                </div>
                <div className="chat-messages">
                    {messages.map((message)=> (
                        <div className={messages.self ? 'chat-bubble self-chat' : 'chat-bubble other-chat'}>{message.content}</div>
                    ))}
                </div>
                <div className="chat-footer">
                    <input type="text" value={typedMessage} onChange={(e) => this.setState({ typedMessage: e.target.value})} />
                    <button onClick={this.handleSubmit}>Send</button>
                </div>
            </div>
        );
    }
}

export default Chat;