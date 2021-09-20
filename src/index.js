import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Theme from './styles/theme';
import 'antd/dist/antd.css';
import { ContextProvider } from './context/contex';

ReactDOM.render(
    <ContextProvider>
      <Theme>
        <App />
      </Theme>
    </ContextProvider>,
  document.getElementById('root')
);