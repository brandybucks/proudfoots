////////////////////////////////////////////////////////////////////////////////
// StateLegislatorInfo.jsx
// --------------------------
// This is the reusable component for display a particular legislator's info.
//
////////////////////////////////////////////////////////////////////////////////

const React = require('react');

class StateLegislatorInfo extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <StateLegislatorInfoPresentational info={this.props.info}
      />
    );
  }
}

class StateLegislatorInfoPresentational extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let info = this.props.info;
    return (
      <div className="panel panel-default" >
        <div className="panel-heading" data-toggle="collapse" data-target={'#' + info.chamber}>
          <h3 className="panel-title">{info.full_name}</h3>
        </div>
      <div id={info.chamber} className="collapse">
        <table className="table">
          <tbody>
            <tr>
              <td>Chamber: {info.chamber} ({info.chamber === 'lower' ? 'Assembly - 1 of 80' : 'Senate - 1 of 40'})</td>
            </tr>

            {info.offices.map((office, index) => {

              return (
                <tr key={index}>
                  <td colSpan='2'>
                    <table className="table">
                      <tr>
                        <td><b>{office.type}</b> Office Address:</td>
                      </tr>
                      <tr>
                        <td>{office.address}</td>
                      </tr>
                      <tr>
                        <td>{office.phone}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              );
            })}


            {info.fax &&
              <tr>
                <td>Fax:</td>
                <td>{info.fax}</td>
              </tr>
            }
            {info.email &&
              <tr>
                <td>Email:</td>
                <td><a href={'mailto:' + info.oc_email}>{info.oc_email}</a></td>
              </tr>
            }
            {info.url &&
            <tr>
              <td>Website: <a href={info.url} target="_blank">{info.url}</a></td>
            </tr>
            }
            {info.contact_form &&
              <tr>
                <td>Contact Form:</td>
                <td><a href={info.contact_form} target="_blank">Link</a></td>
              </tr>
            }
            {info.facebook_id &&
              <tr>
                <td>Facebook ID:</td>
                <td><a href={'http://facebook.com/' + info.facebook_id} target="_blank">{info.facebook_id}</a></td>
              </tr>
            }
            {info.twitter_id &&
              <tr>
                <td>Twitter:</td>
                <td><a href={'http://twitter.com/' + info.twitter_id} target="_blank">{info.twitter_id}</a></td>
              </tr>
            }
            {info.youtube_id &&
              <tr>
                <td>Youtube:</td>
                <td><a href={'http://youtube.com/' + info.youtube_id} target="_blank">{info.youtube_id}</a></td>
              </tr>
            }
          </tbody>
        </table>
      </div>
      </div>
    );
  }
}

module.exports = StateLegislatorInfo;