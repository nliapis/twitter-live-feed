import React from 'react';
import { Button } from 'react-bootstrap';
import TweetsActions from './tweets/TweetsActions';

export default class RenderTrends extends React.Component {

  renderTrendsList(trends) {
    return (
      trends.map((tweet, idx) => (
        <Button className="trends-button"
          key={idx}
          bsStyle="info"
          bsSize="xsmall"
          onClick={this.loadTweets.bind(null, tweet)}>
          {tweet.name}
        </Button>
      )
    ))
  }

  loadTweets(tweet) {
    let tweetName = tweet.name;

    if (tweet.name.indexOf('#') === 0){
      tweetName = tweet.name.split('#')[1];
    }

    TweetsActions.fetchTweets(tweetName)
  }

  render() {
    return (
      <div>{this.renderTrendsList(this.props.trends)}</div>
    );
  }
}


