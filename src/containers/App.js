import React from 'react';
import { CurrencyConverter, Help } from '../components';
import './App.css';

const App = () => (
  <div className="container">
    <h1>Currency Converter</h1>
    <Help>The conversion is bi-directional. You can change the converted amount as well.</Help>
    <CurrencyConverter />
    <hr />
    <Help>Each widget can be loaded multiple times in the same page and they work independently.</Help>
    <CurrencyConverter />
    <hr />
    <Help>This widget is pointing to an incorrect URL intentionally to show how it handles errors.</Help>
    <CurrencyConverter src="invalid_feed_url" />
  </div>
);

export default App;
