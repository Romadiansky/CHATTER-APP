import React, {Component} from 'react';

//main class / superclass
class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.enterText = this.enterText.bind(this);
    this.enterUsername = this.enterUsername.bind(this);
  }

  //enters new username on "return" key press and sets state with this input value
  enterUsername(ev) {
    if (ev.keyCode === 13 || ev.which === 13) {
      this.props.setUsername(ev.target.value)
    }
  }

  //enters message on "return" key press and sends message to server
  enterText(ev) {
    if ((ev.keyCode === 13 || ev.which === 13) && (ev.target.value !== "")) {
      this.props.sendMessage(ev.target.value);
      ev.target.value = "";
    }
  }

  //renders footer content to page
  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)" onKeyPress={this.enterUsername}/>
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={this.enterText}/>
      </footer>
    );
  }
}

export default ChatBar;