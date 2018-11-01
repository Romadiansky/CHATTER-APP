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

  // // Called after the component was rendered and it was attached to the
  // // DOM. This is a good place to make AJAX requests or setTimeout.
  // componentDidMount() {
  //   // After 3 seconds, set `loading` to false in the state.
  //   setTimeout(() => {
  //     this.setState({loading: false}); // this triggers a re-render!
  //   }, 3000)
  // }
  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:3001");

    // this.socket.connect = (event) => {
    //   console.log("connected");
    // }

    // this.socket.onmessage = (event) => {
    //   console.log(event);
    //   // code to handle incoming message
    // }

    this.socket.onmessage = ev => {
      let appState = this.state;
      appState.messages = appState.messages.concat(JSON.parse(ev.data));
      this.setState(appState);
    };

    // console.log("componentDidMount <App />");
    // setTimeout(() => {
    //   console.log("Simulating incoming message");
    //   const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
    //   const messages = this.state.messages.concat(newMessage)
    //   // Update the state of the app component.
    //   // Calling setState will trigger a call to render() in App and all child components.
    //   this.setState({messages: messages})
    // }, 3000);
  }

  sendMessage = text => {
    const newMessage = {
      // id: this.incrementID(),
      username: (this.state.currentUser.name),
      content: text
    };
    this.socket.send(JSON.stringify(newMessage));
    // const messages = this.state.messages.concat(newMessage);
    // this.setState({messages: messages})
  }

  setUsername = name => {
    this.setState({currentUser: {name: name}});
  }

  // incrementID() {
  //   let state = this.state;
  //   let thisID = state.nextID;
  //   state.nextID += 1;
  //   this.setState(state);
  //   return thisID;
  // }

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
