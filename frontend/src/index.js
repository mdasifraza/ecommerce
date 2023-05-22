import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';
import { positions, transitions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import Kommunicate from "@kommunicate/kommunicate-chatbot-plugin";

const options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER,
  transition: transitions.SCALE,
}

Kommunicate.init("3bc0ba4a08df44b0e017b6bf9431edf83", {
  automaticChatOpenOnNavigation: true,
  popupWidget: true
});

ReactDOM.render(
  // <React.StrictMode>
  <Provider store={store}>
    <AlertProvider template={AlertTemplate} {...options}>
      <App />
    </AlertProvider>
  </Provider>,
  // </React.StrictMode>,
  document.getElementById('root')
);
