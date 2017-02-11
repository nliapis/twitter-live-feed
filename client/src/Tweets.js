import React from 'react';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import Client from './Client';
import Form from './Form';
import RenderTweets from './RenderTweets';
import RenderTrends from './RenderTrends';


const Tweets = React.createClass({
  getInitialState: function() {
    return {
      tweets: {
        metadata: {},
        statuses: []
      },
      trends: [],
      inputValue: '',
      disabledButton: true
    };
  },
  handleSearchChange: function (e) {
    e.preventDefault();
    const value = this.state.inputValue;
    this.callClient(value)
  },

  callClient: function(value) {
    Client.search(value, (tweets) => {
      this.setState({
        tweets: tweets
      })
    });
  },

  fetchTrends: function () {
    var p = Client.fetchTrends((trends) => {});
    var that = this;

    p.then(function(res) {
      that.setState({
        trends: res[0].trends
      })
    })

  },
  componentWillMount: function() {
    this.fetchTrends()
  },

  render: function () {

    return (
      <div>
        <Form
          handleSearchChange={this.handleSearchChange }
          inputValue={this.state.inputValue}
          updateInputValue={this.updateInputValue}
          disabledButton={this.state.disabledButton}
        />
        <Grid className="layout-container">
          <Row>
            <Col sm={8}>
              <div>
                {
                  this.state.tweets.statuses && this.state.tweets.statuses.length > 0 ?
                  <RenderTweets tweetsData={this.state.tweets} /> :
                  <div>
                    <span className="loader">
                      <span className="loader-inner"></span>
                    </span>
                  </div>
                }
                <div className="text-center">
                  { this.state.tweets.statuses && this.state.tweets.statuses.length >= 20 ?
                    <Button bsStyle="primary" bsSize="large" onClick={this.loadMoreTweets}>Load more</Button>
                    : ''
                  }
                </div>
              </div>
            </Col>
            <Col sm={4}>
              <RenderTrends inputValue={this.state.inputValue} trends={this.state.trends} loadTweets={this.loadTweets}/>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  },

  loadTweets: function(tweet) {
    let tweetName = tweet.name;

    if (tweet.name.indexOf('#') === 0){
      tweetName = tweet.name.split('#')[1];
    }
    this.setState({
      inputValue: tweetName,
      disabledButton: false
    })
    this.callClient(tweetName)
  },

  loadMoreTweets: function(e) {
    e.preventDefault();
    Client.search(this.state.tweets.search_metadata.next_results, (tweets) => {
      tweets.statuses = this.state.tweets.statuses.concat(tweets.statuses)
      this.setState({
        tweets: tweets
      })
    });
  },

  updateInputValue: function(evt) {
    const value = evt.target.value;

    if (value.length > 0) {
      this.setState({
        disabledButton: false
      });
    } else {
      this.setState({
        disabledButton: true
      });
    }

    this.setState({
      inputValue: value
    });
  }
});

export default Tweets;
