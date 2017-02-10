////////////////////////////////////////////////////////////////////////////////
// UserDashBoard.jsx
// --------------------------
// This is the parent component for displaying the dashboard user interface.
// 
// It is responsible for AJAX call to the back-end to retrieve the user's
// monitored keywords and associated bills. It is also responsible for
// reacting to user request to add and remove monitored keywords and translating
// it into calls to the back-end
//
////////////////////////////////////////////////////////////////////////////////

const React = require('react');
const UserLegislatorsInfo = require('./UserLegislatorsInfo.jsx');
const UserStateLegislatorsInfo = require('./UserStateLegislatorsInfo.jsx');

class LegislatorsInfo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h3>Your Legislators</h3>
        <UserLegislatorsInfo
          userLat={this.props.userLat}
          userLong={this.props.userLong} />
        <UserStateLegislatorsInfo
          userLat={this.props.userLat}
          userLong={this.props.userLong}
          userState={this.props.userState} />
      </div>
    );
  }
}

module.exports = LegislatorsInfo;