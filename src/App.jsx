import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import Message from './Message.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [{username: "blob", content: "blobbers about", id:"id1"}]
    };
  }

  // // Called after the component was rendered and it was attached to the
  // // DOM. This is a good place to make AJAX requests or setTimeout.
  // componentDidMount() {
  //   // After 3 seconds, set `loading` to false in the state.
  //   setTimeout(() => {
  //     this.setState({loading: false}); // this triggers a re-render!
  //   }, 3000)
  // }
  render() {
    return (
     <div>
      <ChatBar currentUser={this.state.currentUser}/>
      <MessageList messages={this.state.messages}/>
     </div>
    );
  }
}
export default App;
