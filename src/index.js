import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
// Put any other imports below so that CSS from your
// components takes precedence over default styles.
import App from './App';
import reportWebVitals from './reportWebVitals';
//Configure React Router

import { BrowserRouter as Router } from "react-router-dom";



//Configure Amplify
import Amplify from "aws-amplify"
import config from "./aws-exports"

Amplify.configure(config)


ReactDOM.render(
  <React.StrictMode>
    <Router>
       <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
