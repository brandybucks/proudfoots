////////////////////////////////////////////////////////////////////////////////
// LegislationSearch.jsx
// --------------------------
// This is the component that bundle the search bar and the results together
//
// Search related AJAX calls to the Sunlight server are made at this component
// level
//
////////////////////////////////////////////////////////////////////////////////
// var googleTrends = require('google-trends-api');

const React = require('react');
const SearchBar = require('./SearchBar.jsx');
const SearchResults = require('./SearchResults.jsx');
const Trends = require('./Trends.jsx');
// const LegislatorData = require('../data/googTrends.js')
import queryGoogle from '../data/googTrends.js';
import axios from 'axios';

class LegislationSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetchingSearchResults: false,
      searchResults: [],
      searchGoogle: []
    };

    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
  }
  render() {
    return (
      <div>
      <LegislationSearchPresentational
        isFetching={this.state.isFetchingSearchResults}
        billResults={this.state.searchResults}
        onSearchSubmit={this.handleSearchSubmit}
      />

     </div>
    );
  }

  handleSearchSubmit(searchTerms) {
    this.setState({isFetchingSearchResults: true});
    /////////////////////////////////////////////////////////////////
    // queryGoogle(searchTerms, function(data){
    //   console.log(data);
    // })


    ////////////////////////////////////////////////////////////////

    // AJAX call for a full text search to the Sunlight server
    let ajaxSettings = {
      method: 'GET',
      context: this,
      data: {
        query: searchTerms,
        fields: 'bill_id,bill_type,chamber,introduced_on,last_action_at,short_title,official_title,keywords,summary_short,urls,sponsor,sponsor_id,cosponsor_ids,cosponsors.legislator,related_bill_ids,upcoming'
      },
      dataType: 'jsonp',
      success: this.handleSearchComplete.bind(this)

    };

    $.ajax('https://congress.api.sunlightfoundation.com/bills/search', ajaxSettings);
  }

  handleSearchComplete(data) {
    this.setState({
      isFetchingSearchResults: false,
      searchResults: data.results
    });

  }
}

class LegislationSearchPresentational extends React.Component {
  render() {
    return (
      <div>
        <h3>Bill Search</h3>
        <SearchBar onSubmit={this.props.onSearchSubmit}/>
        {!this.props.isFetching &&
          <SearchResults
            isFetching={this.props.isFetching}
            billResults={this.props.billResults}
            />
        }
      </div>
    );
  }
}
module.exports = LegislationSearch;