const React = require('react');

// meetup api notes:

// https://api.meetup.com/2/categories

// {
// "name": "Movements & Politics",
// "sort_name": "Movements & Politics",
// "id": 13,
// "shortname": "Movements"
// },

// https://api.meetup.com1/find/groups2?zip=11211&radius=1&category=253&order=members4

class Meetups extends React.Component {
  constructor(props) {
    super(props);

    // Default State
    this.state = {
      localMeetups: [],
      radius: 25
    };

    this.render = this.render.bind(this);
  }

  createMarkup(markup) {
    return {__html: markup};
  }

  handleSliderChange(event) {
    var values = [1, 5, 10, 25];

    this.setState({
      radius: values[event.target.value - 1]
    });

    $('#rangeSliderNumbers').children().css('color', 'white');

    $('#rangeSliderNumbers span:nth-child(' + (event.target.value) + ')').css('color', '#BFBFAE');

    this.fetchMeetups(values[event.target.value - 1]);
  }



  render() {

    const photoDivStyle = {
      width: '130px',
      float: 'left',
      'marginRight': '10px',
      'marginBottom': '10px'
    };

    const meetupItemDivs = {
      'overflowWrap': 'break-word',
      'wordWrap': 'break-word'
    };

    const radiusSelectStyle = {
      // display: 'inline-block',
      display: 'flex',
      float: 'right',
      marginRight: '15px',
    };

    const radiusNumbers = {
      fontSize: '0.7em',
      color: 'white',
      display: 'flex',
      justifyContent: 'space-between'
    };


    return (
      <div className="panel panel-default topMargin">
        <div className="panel-heading red">
          <h3 className="panel-title">
            Your Local Political and 'Movement' Meetups:
            <div style={radiusSelectStyle}>
              <div style={{'marginRight': '5px'}}>
                Search Radius (miles):
              </div>
              <div>
                <form id="sliderData" style={{'width': '60px'}}>
                  <input
                    onChange={this.handleSliderChange.bind(this)}
                    id="slider1"
                    type="range"
                    min="1"
                    max="4">
                  </input>
                  <span id='rangeSliderNumbers' style={radiusNumbers}>
                    <span>1</span>
                    <span>5</span>
                    <span>10</span>
                    <span style={{'color': '#BFBFAE'}}>25</span>
                  </span>
                </form>
              </div>
            </div>
          </h3>
        </div>

        <div className="panel-body topMargin">
          {this.state.localMeetups.map((meetup, index) => {
            // console.log('meetup', meetup);
            return (
              <div className="panel panel-default" key={meetup.id} >
                <div className="panel-heading" data-toggle="collapse" data-target={'#' + meetup.id}>
                  <h3 className="panel-title">{meetup.name}</h3>
                </div>

                <div id={meetup.id} className="collapse">
                  <table className="table">
                    <tbody>
                      <tr>
                        <td><a href={meetup.link} target="_blank">{meetup.link}</a></td>
                      </tr>
                      <tr>
                        <td>
                          {meetup.photos &&
                            <div style={photoDivStyle}>
                              <img style={{width: '100%', height: 'auto'}} src={meetup.photos[0].photo_link} />
                            </div>
                          }
                          <div style={meetupItemDivs}
                            dangerouslySetInnerHTML={this.createMarkup(meetup.description)}>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.fetchMeetups(25);
  }

  fetchMeetups(searchRadius) {

    function onFetchMeetupsComplete(data, textStatus, jqXHR) {
      this.setState({
        localMeetups: data.body
      });
    }

    $.get('/getMeetups', {searchRadius: searchRadius}, onFetchMeetupsComplete.bind(this));
  }
}

module.exports = Meetups;
