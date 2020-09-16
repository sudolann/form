import React from 'react'
import ReactDOM from 'react-dom'
import {App} from './components/app/App'
import * as serviceWorker from './serviceWorker'
import {BrowserRouter as Router} from 'react-router-dom'

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root'),
)

serviceWorker.unregister()
