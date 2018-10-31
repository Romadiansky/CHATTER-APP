import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import Message from './Message.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [{username: "blob", content: "blobbers about", id:1}]
    };
    this.sendMessage=this.sendMessage.bind(this);
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
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 3000);
  }

  sendMessage(text) {
    const newMessage = {id:4, username: "NOT IMPLEMENTED", content: text};
    const messages = this.state.messages.concat(newMessage);
    this.setState({messages: messages})
  }

  render() {
    return (
     <div>
      <ChatBar currentUser={this.state.currentUser} sendMessage={this.sendMessage}/>
      <MessageList messages={this.state.messages}/>
     </div>
    );
  }
}
export default App;
