import React from 'react';
import Reflux from 'reflux';
import { fromJS } from 'immutable';
import TweetsStore from './TweetsStore';
import TweetsActions from './TweetsActions';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import Form from '../Form';
import RenderTweets from '../RenderTweets';
import RenderTrends from '../RenderTrends';

export default class Tweets extends Reflux.Component {
  constructor(props) {
    super(props);
    this.state = {
      trends: fromJS([]),
      tweets: fromJS([]),
      inputValue: ''
    };
    this.store = TweetsStore;
  }

  componentDidMount() {
    TweetsActions.fetchTrends();
  }

  render() {
    const tweets = this.state.tweets.toJSON();

    return (
      <div>
        <Form inputValue={this.state.inputValue} />
        <Grid className="layout-container">
          <Row>
            <Col sm={8}>
              <div>
                {
                  tweets.statuses && tweets.statuses.length > 0 ?
                  <RenderTweets tweetsData={this.state.tweets.toJSON()} /> :
                  <div>
                    <span className="loader">
                      <span className="loader-inner"></span>
                    </span>
                  </div>
                }
                <div className="text-center">
                  { tweets.statuses && tweets.statuses.length >= 20 ?
                    <Button bsStyle="primary" bsSize="large" onClick={TweetsActions.fetchMoreTweets}>Load more</Button>
                    : ''
                  }
                </div>
              </div>
            </Col>
            <Col sm={4}>
              <RenderTrends trends={this.state.trends.toJSON()} />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}