import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import Message from './Message.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // nextID: 10,
      currentUser: {name: "Anonymous"},
      messages: []
    };
    this.sendMessage=this.sendMessage.bind(this);
    // this.incrementID=this.incrementID.bind(this);
    this.socket={};
  }

  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:3001");


    this.socket.onmessage = ev => {
      let appState = this.state;
      appState.messages = appState.messages.concat(JSON.parse(ev.data));
      this.setState(appState);
    };
  }

  sendMessage = text => {
    const newMessage = {
      // id: this.incrementID(),
      type: "postMessage",
      username: (this.state.currentUser.name),
      content: text
    };
    this.socket.send(JSON.stringify(newMessage));
  }

  setUsername = name => {
    const oldUsername = this.state.currentUser.name;
    this.setState({currentUser: {name: name}});
    this.sendNotification(`${oldUsername} changed username to ${name}`);
  }

  sendNotification = text => {
    const newNotification = {
      type: "postNotification",
      content: text
    };
    this.socket.send(JSON.stringify(newNotification));
  }

  render() {
    return (
     <div>
      <ChatBar currentUser={this.state.currentUser} sendMessage={this.sendMessage} setUsername={this.setUsername}/>
      <MessageList messages={this.state.messages}/>
     </div>
    );
  }
}
export default App;

  // incrementID() {
  //   let state = this.state;
  //   let thisID = state.nextID;
  //   state.nextID += 1;
  //   this.setState(state);
  //   return thisID;
  // }
