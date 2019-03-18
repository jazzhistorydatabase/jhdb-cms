import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<mainPageTB />, div);
  ReactDOM.unmountComponentAtNode(div);
});
