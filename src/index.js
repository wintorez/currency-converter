import 'core-js/es6/map';
import 'core-js/es6/set';
import 'core-js/es6/symbol';
import 'core-js/es6/array';
import 'raf/polyfill';
import 'isomorphic-fetch';

import React from 'react';
import { render } from 'react-dom';
import Help from './components/Help';
import Converter from './components/Converter';

import '../node_modules/bootstrap/dist/css/bootstrap.css';
import './index.css';

render(
  <div className="container">
    <h1>Currency Converter</h1>
    <Help>
      The conversion is bi-directional. You can change the converted amount as
      well.
    </Help>
    <Converter />
    <hr />
    <Help>
      Each widget can be loaded multiple times in the same page and they work
      independently.
    </Help>
    <Converter />
    <hr />
    <Help>
      This widget is pointing to an incorrect URL intentionally to show how it
      handles errors.
    </Help>
    <Converter src="invalid_feed_url" />
  </div>,
  document.getElementById('root'),
);
