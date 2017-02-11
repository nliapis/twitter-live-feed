import { mount } from 'enzyme';
import React from 'react';
import RenderTweets from '../src/RenderTweets';

describe('RenderTweets', () => {
  let wrapper;
  const tweetsData =
    { statuses: [
      {
        text:"RT @lee_cook: Get that promo sis @katyperry #ChainedToTheRhythm #London 🇬🇧 https://t.co/p6Z27Yvt71",
        created_at:"Sat Feb 11 20:54:56 +0000 2017",
        user: {
          name: "KATY PERRY SPAIN",
          screen_name: "@Spain_KatyPerry",
          statuses_count: 3588,
          followers_count: 2307,
          friends_count: 549
        }
      },
      {
        text:"RT @smudgedlippy: Connect 4 Dating is back! 16/3 @Theclockhouse https://t.co/LXwESKQae2! #Peckham #EastDulwich #PeckhamRye #Dating #London…",
        created_at:"Sat Feb 11 20:54:48 +0000 2017",
        user: {
          name: "Jordi 30SomethingLDN",
          screen_name: "@30somethingLDN",
          statuses_count: 21508,
          followers_count: 3270,
          friends_count: 992
        }
      }
    ]
  }

  const tweetsLength = tweetsData.statuses.length;

  describe('when prop `tweetsData` has tweets', () => {
    beforeEach(() => {
      wrapper = mount(
        <RenderTweets tweetsData={tweetsData} />
      );
    });

    it('should display equal number of tweets as `tweetsData` statuses length', () => {
      expect(wrapper.find('.tweet').length).toBe(tweetsLength);
    });

  });

});