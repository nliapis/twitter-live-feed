import React from 'react';
import Linkify from 'react-linkify';

const RenderTweets = React.createClass({
  renderTweesList: function(tweets) {
    return (
      tweets.map((tweet, idx) => (
        <li key={idx} className="tweet" >
          <header className="tweet__header">
            <div className="tweet__bio">
              <div className="tweet__details">
                <div>
                  <a href={`https://twitter.com/${tweet.user.screen_name}`} target="_blank">
                    <span className="tweet__user-name">{tweet.user.name}</span>
                  </a>
                  <span className="tweet__screen-name">@{tweet.user.screen_name} - </span>
                  <span className="tweet__created-at">{(new Date(tweet.created_at)).toLocaleTimeString()}</span>
                </div>
                <Linkify className="tweet__text">{tweet.text}</Linkify>
              </div>
            </div>
          </header>
          <div className="tweet__content">
            <div className="tweet__avatarcontainer">
              <img src={tweet.user.profile_image_url} alt="avatar" className="tweet__avatar" />
            </div>
            <div className="tweet__data">
              <ul>
                <li>
                  {tweet.user.statuses_count}
                  <span>Tweets</span>
                </li>
                <li>
                  {tweet.user.followers_count}
                  <span>Followers</span>
                </li>
                <li>
                  {tweet.user.friends_count}
                  <span>Following</span>
                </li>
              </ul>
            </div>
          </div>
        </li>
      )
    ))
  },

  render: function () {
    const {tweetsData} = this.props;
    return (
      <ul className="list-unstyled tweets-list">
        {this.renderTweesList(tweetsData.statuses)}
      </ul>
    );
  }
});

export default RenderTweets;
