import React from "react";
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import App from './App';
import store from './redux/store/index';
import { GoogleOAuthProvider } from "@react-oauth/google";
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="554332329432-0b6a0dh2ihgrkj5obs34lmnngpfvrq4j.apps.googleusercontent.com">
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);