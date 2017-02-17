import Reflux from 'reflux';
import { fromJS } from 'immutable';
import Client from '../Client';
import TweetsActions from './TweetsActions';

const TweetsStore = Reflux.createStore({
  listenables: [ TweetsActions ],

  getInitialState() {
    return {
      trends: fromJS([]),
      tweets: fromJS([]),
      inputValue: ''
    }
  },

  onFetchTrends() {
    const promise = Client.fetchTrends((trends) => {});
    const that = this;

    promise.then(function(res) {
      that.updateTrends(fromJS(res[0].trends));
    })
  },

  onFetchTweets(value) {
    if (value === this.inputValue) {
      return false;
    }

    const promise = Client.fetchTweets(value, (tweets) => {});
    const that = this;

    promise.then(function(res) {
      that.updateTweets(fromJS(res));
      that.updateInputValue(value)
    })
  },

  onFetchMoreTweets() {
    const value = this.tweets.toJSON().search_metadata.next_results;
    const promise = Client.fetchTweets(value, (tweets) => {});
    const that = this;

    promise.then(function(res) {
      res.statuses = that.tweets.toJSON().statuses.concat(res.statuses)
      that.updateTweets(fromJS(res));
    })
  },

  updateTrends(trends) {
    this.trigger({ trends });
    this.trends = trends;
  },

  updateTweets(tweets) {
    this.trigger({ tweets });
    this.tweets = tweets;
  },

  updateInputValue(inputValue) {
    this.trigger({ inputValue });
    this.inputValue = inputValue;
  }
});

export default TweetsStore;
