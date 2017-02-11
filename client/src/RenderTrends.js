import React from 'react';
import { Button } from 'react-bootstrap';

const RenderTrends = React.createClass({

  renderTrendsList: function(trends) {
    return (
      trends.map((tweet, idx) => (
        <Button className="trends-button"
          key={idx}
          bsStyle="info"
          bsSize="xsmall"
          onClick={this.props.loadTweets.bind(null, tweet)}>
          {tweet.name}
        </Button>
      )
    ))
  },

  render: function () {

    return (
      <div>{this.renderTrendsList(this.props.trends)}</div>
    );
  }
});

export default RenderTrends;
