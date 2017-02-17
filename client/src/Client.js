function fetchTweets(query, cb) {
  let api = '';
  if (query.indexOf('?max_id') === -1) {
    api = `api/tweets?q=${query}`
  } else {
    api = `api/tweets${query}`
  }
  return fetch(api, {
    accept: 'application/json',
  }).then(checkStatus)
    .then(parseJSON);
}

function fetchTrends(cb) {
  return fetch('api/trends', {
    accept: 'application/json',
  }).then(checkStatus)
    .then(parseJSON);
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    const error = new Error(`HTTP Error ${response.statusText}`);
    error.status = response.statusText;
    error.response = response;
    console.log(error); // eslint-disable-line no-console
    throw error;
  }
}

function parseJSON(response) {
  return response.json();
}

const Client = { fetchTweets, fetchTrends };
export default Client;
