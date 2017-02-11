const express = require('express');
const app = express();

app.set('port', (process.env.PORT || 3001));

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

const app_conf = {
  consumer_key: process.env.consumer_key,
  consumer_secret: process.env.consumer_secret,
  access_token: process.env.access_token,
  access_token_secret: process.env.access_token_secret,
  timeout_ms: 60*1000,  // optional HTTP request timeout to apply to all requests.
}

var Twit = require('twit');
var T = new Twit(app_conf);

app.get('/api/tweets', function(req, res) {
  const param = req.query.q;
  const max_id = req.query.max_id;

  switch (true) {
    case ((!param) && (!max_id)):
      res.json({
        error: 'Missing required parameter `q` and `max_id`',
      });
      break;
    case (!max_id):
      searchTweets(param, res);
      break;
    default:
      fetchMoreTweets(param, max_id, res);
    }

});

function searchTweets(param, res) {
  T.get('search/tweets', { q: "#" + param, count: 20 }, function(err, reply) {
    res.json(reply);
  })
}

function fetchMoreTweets(param, max_id, res) {
  T.get('search/tweets', { q: param, max_id: max_id, include_entities: 1, count: 20 }, function(err, reply) {
    res.json(reply);
  })
}

app.get('/api/trends', function(req, res) {
  searchTrends(res);
});

function searchTrends(res) {
  T.get('trends/place', { id: 1 }, function(err, reply) {
    res.json(reply);
  })
}

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
