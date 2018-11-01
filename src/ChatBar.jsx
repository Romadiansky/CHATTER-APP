import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.enterText = this.enterText.bind(this);
    this.enterUsername = this.enterUsername.bind(this);
  }

  enterUsername(ev) {
    if (ev.keyCode === 13 || ev.which === 13) {
      this.props.setUsername(ev.target.value);
      ev.target.value.bold();
    }
  }



  enterText(ev) {
    if (ev.keyCode === 13 || ev.which === 13) {
      this.props.sendMessage(ev.target.value);
      ev.target.value = "";
    }
  }

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