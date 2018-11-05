import React, {Component} from 'react';
import Message from './Message.jsx';

//defined message list class, get user colors and renders components to page
class MessageList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let messageComponents = this.props.messages.map(message => {
      return (<Message type={message.type} userColor={message.userColor} username={message.username} content={message.content} key={message.id}/>);
    });
    return (
      <main className="messages">
        {messageComponents}
      </main>
    );
  }
}

export default MessageList;