import React from 'react';
import ReactDOM from 'react-dom';
import "./index.css";
import App from './App';
import reportWebVitals from './reportWebVitals';

import { Provider } from 'react-redux';
import store from './redux/store';

const Application = () => (
    <Provider store={store}>
        <App />
    </Provider>
);

// ReactDOM.render(<Application />, document.getElementById('root'));
ReactDOM.hydrate(<Application />, document.getElementById('root'));

reportWebVitals();

