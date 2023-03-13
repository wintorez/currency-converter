import React from 'react'
import ReactDOM from 'react-dom/client'
import { Converter } from './components'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <div className="container mx-auto prose">
    <h1>Currency Converter Demo</h1>
    <Converter />
    <Converter />
    <Converter src="invalid_feed_url" />
  </div>
)
