const React = require('react');
const ReactRouter = require('react-router');
const Link = ReactRouter.Link;
import axios from 'axios';

class Trends extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchGoogle: []
    }
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);

  }


  handleSearchSubmit() {
    /////////////////////////////////////////////////////////////////
    var queryArray=[];

    for (var i = 0; i < this.props.userMonitoredKeywords.length; i++) {
      queryArray.push(this.props.userMonitoredKeywords[i].keyword)
    }

    var context = this;

    axios.post('http://localhost:8080/queryGoogle/', {
        query: queryArray
      })
    .then(function(response){
      console.log('response', response);
      context.setState({searchGoogle: response.data})
    })
    .catch(function(error){
      console.log(error);
    })
  }

  componentWillMount(){
    this.handleSearchSubmit();
  }



  render() {

    return(
      <div className = "card-columns" style={{"margin": 'auto'}}>
        {this.state.searchGoogle.map((x, key) => {
          return(
            <div className = "row">
              <div className="col-md-3">
              <div className="card" style={{width: '318px', "margin": "20px"}}>
                  <a href= {x['ht:news_item'][0]['ht:news_item_url'][0]} >
                <img className="card-img-top" src={x['ht:picture'][0]} alt="Card image cap" style = {{height: "250px", "width": "318"}}/>
                <div className="card-block">

                  <h4 className="card-title" dangerouslySetInnerHTML={{__html:x['ht:news_item'][0]['ht:news_item_title'][0]}}></h4>

                  <p className="card-text" style ={{"color": "#696969"}}dangerouslySetInnerHTML={{__html:x['ht:news_item'][0]['ht:news_item_snippet'][0]}}></p>
                </div>
                    </a>
              </div>
            </div>
            </div>
          )
        })}
      </div>

    )
  }
};

 module.exports = Trends;