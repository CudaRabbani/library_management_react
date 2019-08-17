import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from "react-router-dom";
import "../node_modules/noty/lib/noty.css";
import "../node_modules/noty/lib/themes/mint.css";


//import "bootstrap/js/src/collapse.js";

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
    ,
    document.getElementById('root'))
;

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
