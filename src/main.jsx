import React from 'react'
import ReactDOM from 'react-dom/client'
import { Converter } from './components'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <div className="container mx-auto">
    <h1>Currency Converter Demo</h1>
    <p>
      The conversion is bi-directional. You can change the converted amount as
      well.
    </p>
    <Converter />
    <p>
      Each widget can be loaded multiple times in the same page and they work
      independently.
    </p>
    <Converter />
    <p>
      This widget is pointing to an incorrect URL intentionally to show how it
      handles errors.
    </p>
    <Converter src="invalid_feed_url" />
  </div>
)
