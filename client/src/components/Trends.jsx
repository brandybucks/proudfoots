const React = require('react');
const ReactRouter = require('react-router');
const Link = ReactRouter.Link;
import axios from 'axios';

class Trends extends React.Component {
  constructor() {
    super();
    this.state = {
      searchGoogle: []
    }
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);

  }


  handleSearchSubmit() {
    /////////////////////////////////////////////////////////////////
    var context = this;
    axios.post('http://localhost:8080/queryGoogle/', {
        query: 'politic'
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

    // <a href = {x['ht:news_item'][0]['ht:news_item_url'][0]} >
    //   <img src= {x['ht:picture'][0]}  />
    //  <h5>{ x['ht:news_item'][0]['ht:news_item_title'][0]} </h5>
    //  </a>


    //////////////////2nd attempt ///////////////////////////
/*




            <div className = "card">
              <div className="card-image waves-effect waves-block waves-light">
                <img className="activator" src= {x['ht:picture'][0]}/>
              </div>
            <div className="card-content">
              <span className="card-title activator grey-text text-darken-4">{ x['ht:news_item'][0]['ht:news_item_title'][0]}<i className="material-icons right">more_vert</i></span>
              <p><a href={x['ht:news_item'][0]['ht:news_item_url'][0]}>This is a link</a></p>
            </div>
            <div className="card-reveal">
              <span className="card-title grey-text text-darken-4">Card Title<i className="material-icons right">close</i></span>
            <p>Here is some more information about this product that is only revealed once clicked on.</p>
            </div>
          </div>
        )})}
     </div>
*/

    ///////////////////////////////////////////////////////////

  render() {

    return(
      <div className = "card-columns" style={{"margin": 'auto'}}>
        {this.state.searchGoogle.map((x) => {
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