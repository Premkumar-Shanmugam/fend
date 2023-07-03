# News Evaluater

**evaluate-news-nlp** is a _Natural Laguage Processer_ based sentiment analyser of news articles.

## Pre-requisites

- Developer subscription to MeaningCloud's [Sentiment Analysis API](https://www.meaningcloud.com/developer/sentiment-analysis).

## Development

- Create a `.env` file at the root and add the API key for _Sentiment Analysis API_.
  ```properties
  API_KEY = <replace this with the API key>
  ```
- Run command `npm run build-dev` in a terminal. This will instantiate a development server for _Client_ at `http://localhost:8080` with hot reloading.

- In a separate terminal, run command `node ./src/server/index.js`. This will instantiate a development server for _Server_ at `https://localhost:8081`.

## Production

- Command `npm run build-prod` will create a folder named `dist` at the root.
- Deploy the contents of `dist` folder to a webserver. [Netlify](https://www.netlify.com/) and [Heroku](https://www.heroku.com/) are some of the options.
