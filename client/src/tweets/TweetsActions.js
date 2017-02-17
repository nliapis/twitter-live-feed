import Reflux from 'reflux';

const TweetsActions = Reflux.createActions([
  'fetchTrends',
  'fetchTweets',
  'fetchMoreTweets'
]);

export default TweetsActions;