import React, { PropTypes, Component } from 'react';
import Search from './search';
import services from '../../services/services';
import QuoteItem from './quoteItem';
import GifItem from './gifItem';
import Music from './music';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currQuote: '',
      currMood: '',
      currentGif: '',
      currentSearch: '',
      currVideoID: '',
    };

    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSearchButtonClick = this.handleSearchButtonClick.bind(this);
  }

  handleSearchButtonClick() {
    const self = this;
    const query = this.state.currentSearch;
    services.apiCall('wikiInfo', query, (res) => {
      const randomIndex = Math.floor((Math.random() * res.length) + 1);
      self.setState({
        currMood: query,
        currQuote: res[randomIndex],
      });
    });
    services.apiCall('giphyInfo', query, (res) => {
      const randomIndex = Math.floor((Math.random() * res.length) + 1);
      self.setState({
        currentGif: res[randomIndex],
      });
    });
    services.apiCall('musicInfo', query, (res) => {
      self.setState({
        currVideoID: res,
      });
    });
  }

  handleSearchChange(event) {
    this.setState({
      currentSearch: event.target.value,
    });
  }

  render() {
    return (
      <div className="dashboard-content">
        <Search
          handleSearchChange={this.handleSearchChange}
          handleSearchButtonClick={this.handleSearchButtonClick}
        />
        <QuoteItem quote={this.state.currQuote} user={this.props.user} />
        <GifItem gif={this.state.currentGif} user={this.props.user} />
        <Music videoId={this.state.currVideoID} user={this.props.user} />
      </div>
    );
  }
}

Dashboard.propTypes = {
  user: PropTypes.element,
  // quote: PropTypes.element.isRequired,
  // gif: PropTypes.element.isRequired,
};

/* <div className="moodly-content">
  <span className="quote-title"><h2>{this.state.currQuote}</h2></span>
</div>

<img src={this.state.currentGif} alt="" /> */

// Dashboard.propTypes = {
//   handleSearchChange: PropTypes.func.isRequired,
//   handleSearchButtonClick: PropTypes.func.isRequired,
// };

export default Dashboard;
