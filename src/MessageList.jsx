import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let messageComponents = this.props.messages.map(message => {
      console.log(message);
      return (<Message username={message.username} content={message.content} key={message.id}/>);
    });
    return (
      <main className="messages">
        {messageComponents}
      </main>
    );
  }
}

export default MessageList;