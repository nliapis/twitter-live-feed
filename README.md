# `twitter live feed`

### Demo

You can see the demo [here](https://twitter-live-feed-2017.herokuapp.com/)

## Running locally

```
git clone https://github.com/nliapis/twitter-live-feed.git
cd twitter-live-feed
npm i

# copy configuration and replace with your own twitter app keys
cp .env.example .env

cd client
npm i

cd ..
npm start
```

## Overview

`create-react-app` configures a Webpack development server to run on `localhost:3000`. This development server will bundle all static assets located under `client/src/`. All requests to `localhost:3000` will serve `client/index.html` which will include Webpack's `bundle.js`.

To prevent any issues with CORS, the user and her browser will communicate exclusively with the Webpack development server.

Inside `Client.js`, we use Fetch to make a request to the API:

```js
// Inside Client.js
return fetch(`/api/tweets?q=${query}`, {
  // ...
})
```

This request is made to `localhost:3000`, the Webpack dev server. Webpack will infer that this request is actually intended for our API server. We specify in `package.json` that we would like Webpack to proxy API requests to `localhost:3001`:

```js
// Inside client/package.json
"proxy": "http://localhost:3001/",
```

This handy features is provided for us by `create-react-app`.

This setup provides two advantages:

1. If the user's browser tried to request `localhost:3001` directly, we'd run into issues with CORS.
2. The API URL in development matches that in production. You don't have to do something like this:

```js
// Example API base URL determination in Client.js
const apiBaseUrl = process.env.NODE_ENV === 'development' ? 'localhost:3001' : '/'
```

This setup uses [concurrently](https://github.com/kimmobrunfeldt/concurrently) for process management. Executing `npm start` instructs `concurrently` to boot both the Webpack dev server and the API server.

## Reflux Library

The main function of Reflux is to introduce a more functional programming style architecture by eschewing MVC like pattern and adopting a single data flow pattern.

```
+---------+       +--------+       +-----------------+
¦ Actions ¦------>¦ Stores ¦------>¦ View Components ¦
+---------+       +--------+       +-----------------+
     ^                                      ¦
     +--------------------------------------+
```

### Actions

```
fetchTrends
fetchTweets
fetchMoreTweets
```

### Stores

```
TweetsStore
```

## Deploying

### Background

The app is ready to be deployed to Heroku.

In production, Heroku will use `Procfile` which boots just the server:

```
web: npm run server
```

Inside `server.js`, we tell Node/Express we'd like it to serve static assets in production:

```
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}
```

You just need to have Webpack produce a static bundle of the React app (below).

### Steps

We assume basic knowledge of Heroku.

**0. Setup your Heroku account and Heroku CLI**

For installing the CLI tool, see [this article](https://devcenter.heroku.com/articles/heroku-command-line).

**1. Build the React app**

Running `npm run build` creates the static bundle which we can then use any HTTP server to serve:

```
cd client/
npm run build
```

**2. Commit the `client/build` folder to source control**

From the root of the project:

```
git add client/build
git commit -m 'Adding `build` to source control'
```

**3. Create the Heroku app**

```
heroku apps:create twitter-live-feed
```

**4. Push to Heroku**

```
git push heroku master
```

Heroku will give you a link at which to view your live app.

## Running with Docker

Be sure to install Docker and start a Docker-machine if necessary.

Let's create an image named tweeter-live-feed:

```docker build -t tweeter-live-feed .```

Finally, start a container named tweeter-live-feed-instance at port 80.

```docker run -p 80:3000 --name tweeter-live-feed-instance tweeter-live-feed```

