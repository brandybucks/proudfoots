////////////////////////////////////////////////////////////////////////////////
// UserStateLegislatorsInfo.jsx
// --------------------------
//
// BASED ON:
//
// This is the "Legislation Side Panel" component that include the user's
// congress and senate representatives based on their location (lat/long)
// information.
//
// It is responsible for the AJAX call to the Sunlight API to retrieve the
// relevant legislator information.
//
// BECOMES:
// the state equivalent, based on calls to sunlight api
// other project at: openstates.org
////////////////////////////////////////////////////////////////////////////////

const React = require('react');

const StateLegislatorInfo = require('./StateLegislatorInfo.jsx');

// governor data from hardcoded js file. TODO: scrape this from somewhere so it's dynamic
const GovernorData = require('../data/GovernorData.js');
const StateAbbreviationMap = require('../data/StateAbbreviationMap.js');

class UserStateLegislatorsInfo extends React.Component {
  constructor(props) {
    super(props);

    // Default State
    this.state = {
      isFetchingElectoralData: true,
      electoralRepresentativesInfo: undefined,
      electoralInfo: undefined,
      governor: undefined,
      governorParty: undefined
    };

    this.render = this.render.bind(this);
  }


  render() {
    let isFechingData = this.state.isFechingData;

    return (
      <div>
      {(this.state.isFetchingElectoralData) &&
        <p>Fetching Data</p>
      }

      {!this.state.isFetchingElectoralData &&
        <UserStateLegislatorsInfoPresentational
          senatorsInfo={this.state.electoralRepresentativesInfo}
          governor={this.state.governor}
          governorParty={this.state.governorParty}
        />
      }
      </div>
    );
  }
  componentDidMount() {

    // do we need this?

    // this.setState({
    //   isFetchingElectoralData: true
    // });

    this.fetchElectoralDataFromExternalSources();
    this.getGovernorByState();
  }

    // TEST DATA
    // userLocation: {
    //   lat: 37.795,
    //   long: -122.40
    // }
  getGovernorByState() {
    var state;

    if (this.props.userState.length === 2) {
      var stateAbbreviation = this.props.userState.toUpperCase();

      state = StateAbbreviationMap[stateAbbreviation];
    } else {
      state = this.props.userState.slice(0, 1).toUpperCase()
        + this.props.userState.slice(1, this.props.userState.length).toLowerCase();
    }


    this.setState({
      governor: GovernorData[state].governor,
      governorParty: GovernorData[state].party});

    // console.log('state', state);
  }

  fetchElectoralDataFromExternalSources() {
    let queryParameters = {
      lat: this.props.userLat,
      long: this.props.userLong
    };

    $.get('https://openstates.org/api/v1/legislators/geo', queryParameters, onElectoralInfoFetchComplete.bind(this), 'jsonp');

    function onElectoralInfoFetchComplete(data, textStatus, jqXHR) {

      this.setState({
        electoralRepresentativesInfo: data,
        isFetchingElectoralData: false});
    }
  }
}

// Temporary Default Props for Testing
// UserStateLegislatorsInfo.defaultProps = {
//   userLat: 37.795,
//   userLong: -122.40
// };

class UserStateLegislatorsInfoPresentational extends React.Component {
  render() {
    return (
      <div className="panel panel-default topMargin">
        <div className="panel-heading red">
          <h3 className="panel-title">Your Local Representatives:</h3>
        </div>

        <div className = "panel-body reduceTop">
          <h3>Governor</h3>
          <div className="panel-heading" >
            <h3 className="panel-title">{this.props.governor} ({this.props.governorParty})</h3>
          </div>

          <h3>State Legislators</h3>
          {this.props.senatorsInfo.map((senatorInfo, index) => {
            return (
              <StateLegislatorInfo key={index} info={senatorInfo} />
            );
          })}
        </div>
      </div>
    );
  }
}

module.exports = UserStateLegislatorsInfo;