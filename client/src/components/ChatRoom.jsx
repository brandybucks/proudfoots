const React = require('react');
const io = require('socket.io-client')

class ChatRoom extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      message: ''
    };

    //bind all handlers to this context.
    this.textHandler = this.textHandler.bind(this);
    this.handleMessage = this.handleMessage.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //handle text area change and set to message state.
  textHandler (event) {
    this.setState({
      message: event.target.value
    });
  }

  //for all socket.io events need to handle by componentDidMount.
  componentDidMount() {
    const context = this;
    //socket.io default path is '/' but can also manually define path ('/').
    this.socket = io('/');
    this.socket.on('message', function(message) {
      console.log('message received at front end', message)
      context.setState({
        //this method will insert new message to the first of the message array and the spread operator will set the rest of the messages after the new message.
        messages: [...context.state.messages, message]
      })
      console.log("this thing", context.state.messages)
    })
  }

  //check if Enter key is press or mouse click
  handleSubmit(event) {
    if (event.key === 'Enter') {
      this.handleMessage(event);
      this.setState({
        message: ''
      });
    } else if (event.button === 0) {
      this.handleMessage(event);
      this.setState({
        message: ''
      })
    }
  }

  //this method will create the message object with message and user name then socket.oi will emit the message object to the server socket.
  handleMessage (event) {
    event.preventDefault()
    const body = this.state.message;
    const user = this.props.username;
    const message = {
      body,
      user
    }

    this.setState({
      messages: [...this.state.messages, message]
    });

    this.socket.emit('message', message);
    console.log("message sent from front end");
    var objDiv = document.getElementById('chatroom');
    objDiv.scrollTop = objDiv.scrollHeight;
  }

  render() {
    return(
      <div className="chatlabel">
      <h3>Chat Room</h3>
      <div className="chatroom" id="chatroom">
        <ul id="messages">
          {this.state.messages.map((message, index) => {
            return <li key={index}>
              <b>{message.user}: </b>
              {message.body}
            </li>
          })}
        </ul>
        </div>
          <div className="chatForm">
          <form action="" className="form-group">
            <label>Discuss your thoughts:</label><br />
              <span className="input-group">
                <span className="input-group-addon blue"><span className="glyphicon glyphicon-pencil" aria-hidden="true"></span></span>
                <input id="message" className="form-control" type="text" placeholder="Enter Message" value={this.state.message} onChange={this.textHandler} onKeyDown={this.handleSubmit} autoComplete="off" />
                  <span className="input-group-btn">
                  <button className="btn blue" onClick={this.handleSubmit} >Send</button>
                  </span>
              </span>
          </form><br/>
          </div>
      </div>
    );
  }

}

module.exports = ChatRoom;



