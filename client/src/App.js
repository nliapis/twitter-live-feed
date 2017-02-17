import React from 'react';
// import Tweets from './Tweets';
import Tweets from './tweets/Tweets';

const App = React.createClass({
  render: function () {
    return (
      <div className='App'>
        <Tweets />
      </div>
    );
  },
});

export default App;
