import React, {Component} from 'react';

//defines message class, identifies message type, styles accordingly and renders components to page
class Message extends Component {
  render() {
    let styles = {
      color: this.props.userColor,
      fontStyle: this.props.type === "incomingNotification" ? "italic" : "none",
      fontSize: "10px"
    }
    return (
      <div className="message">
        <span className="message-username" style={styles}>{this.props.username}</span>
        <span className="message-content"style={styles}>{this.props.content}</span>
      </div>
    );
  }
}

export default Message;