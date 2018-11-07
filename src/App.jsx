import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import Message from './Message.jsx';
import MessageList from './MessageList.jsx';
import NavBar from './NavBar.jsx';

//array of pre-approved brand colors for client to select from
const colors = [
"#7a47ff", "#ff9a55", "#47a4ff", "#47cfff", "#55acff", "#3fde92", "#de7f3f", "#ffd755", "#ba55ff", "#6c55ff", "#55ffbd", "#de443f", "#55ffb5", "#ff55f5", "#ff5580", "#8f3fde", "#a57cce", "#967cce", "#7c97ce", "#7cccce", "#96ce7c", "#4ca722", "#a72222", "#22a78c", "#2279a7", "#f5a6db", "#d9a6f5", "#ada6f5", "#a6e1f5", "#f9e41f"
]

//main app class, defines state, binds 'this'
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usercount: 0,
      currentUser: {name: "Anonymous"},
      userColor: colors[Math.floor((Math.random() * colors.length))],
      messages: []
    };
    this.sendMessage=this.sendMessage.bind(this);
    this.socket={};
  }

  //handles what happens in the mount stage of the lifecycle
  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:3001");

    //handles what happens when a message is received: data gets parsed, type gets identified and acted on appropriately, window scrolls to bottom
    this.socket.onmessage = ev => {
      let dataObject = JSON.parse(ev.data);
      let appState = this.state;
      if (dataObject.type === "usercountUpdate") {
        appState.usercount = dataObject.usercount;
      } else {
        appState.messages = appState.messages.concat(JSON.parse(ev.data));
      }
      this.setState(appState);
      window.scroll(0, document.body.scrollHeight);
    };
  }

  //sends message to server with the appropriate type
  sendMessage = text => {
    const newMessage = {
      type: "postMessage",
      username: this.state.currentUser.name,
      content: text,
      userColor: this.state.userColor
    };
    this.socket.send(JSON.stringify(newMessage));
  }

  //sets username by updating state, sending notification to server and displaying notification
  setUsername = name => {
    const oldUsername = this.state.currentUser.name;
    name = name ? name : "Anonymous";
    if (name !== oldUsername) {
      this.setState({currentUser: {name: name}});
      this.sendNotification(`${oldUsername} changed username to ${name}`);
    }
  }

  //sends notification to server including type and content breakdown
  sendNotification = text => {
    const newNotification = {
      type: "postNotification",
      content: text
    };
    this.socket.send(JSON.stringify(newNotification));
  }

  //renders all relevant components to our page
  render() {
    return (
     <div>
      <NavBar usercount={this.state.usercount}/>
      <ChatBar currentUser={this.state.currentUser} sendMessage={this.sendMessage} setUsername={this.setUsername}/>
      <MessageList messages={this.state.messages}/>
     </div>
    );
  }
}
export default App;