////////////////////////////////////////////////////////////////////////////////
// NavigationBar.jsx
// --------------------------
// This is the persistent navigation bar at the top of the dashboard page.
//
// It uses Bootstrap's collapse feature to create nav menu that is responsive
// to mobile devices.
//
////////////////////////////////////////////////////////////////////////////////

const React = require('react');
const ReactRouter = require('react-router');
const Link = ReactRouter.Link;

class NavigationBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed btn-sm" data-toggle="collapse" data-target="#navbar-collapse-1" aria-expanded="false">
                <span className="glyphicon glyphicon-align-justify" aria-hidden="true"></span>
            </button>
            <a className="navbar-brand" href="#">
              Legislation Watch
            </a>
          </div>

          <div className="navbar-collapse collapse" id="navbar-collapse-1">
            <ul className="nav navbar-nav">
              <li><Link to="/trends" className="nav-link">Trends</Link></li>
              <li><Link to="/chat" className="nav-link">Chat</Link></li>
              <li><Link to="/meetups" className="nav-link">Meetup</Link></li>
               <li><a href="https://www.change.org" className="nav-link">Petition</a></li>
               <li><Link to="/monitor" className="nav-link">Monitor</Link></li>
              <li><Link to="/search" className="nav-link">Search</Link></li>
              <li><Link to="/legislators" className="nav-link">Legislators</Link></li>
            </ul>

            <div className="navbar-right">
              <p className="navbar-text nav-link">[{this.props.username}]</p>

              <ul className="nav navbar-nav">
                <li><Link to="/logout" className="nav-link">Logout</Link></li>
              </ul>
            </div>
          </div>

        </div>
      </nav>
    );
  }
}

module.exports = NavigationBar;