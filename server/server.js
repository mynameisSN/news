import express from 'express';
import axios from 'axios';

import path from 'path';
import fs from 'fs';

// below files needed to render our react component server side
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from '../src/component/App';

const PORT = 8080;
const app = express (); // creating new express app

const router = express.Router ();

// app.get ('https://hn.algolia.com/api/v1/search?tags=front_page', (req, res) => {
//   console.log (res);
// });

const serverRenderedContent = (req, res, next) => {
 
  App.requestInitialData ()
  .then (initialData => {
    // console.log ('initialData JSONE ', initialData);

    // now we will read our build index.html file
    fs.readFile (path.resolve ('./build/index.html'), 'utf8', (err, data) => {
      if (err) {
        console.error (err);
        return res.status (500).send ('An error occurred');
      }
      return res.send (
        data.replace (
          // here data will be our index.html but we replace the mounting point, that is our #root div inside public -> indexx.html
          '<div id="root"></div>',
          `<script>window.__initialData__= ${JSON.stringify (initialData)}</script><div id="root">${ReactDOMServer.renderToString (<App initialData={initialData} />)}</div>`
        )
      );
    });
  });
};
router.use ('^/$', serverRenderedContent); // ^ symbor of begining of the line; $ symbol of ending of the line; serverRenderedContent is resolve funtion, which should accept 3 arguments req, res and next;

router.use (express.static (path.resolve (__dirname, '..', 'build')));

// app.use (
//   express.static (path.resolve (__dirname, '..', 'build'))
// );

//this will route our app
app.use (router);

app.listen (PORT, () => {
  console.log (`SSR run on port ${PORT}`);
});
