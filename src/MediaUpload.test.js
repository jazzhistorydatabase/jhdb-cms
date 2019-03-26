import React from 'react';
import ReactDOM from 'react-dom';
import MediaUpload from './MediaUpload';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MediaUpload/>, div);
    ReactDOM.unmountComponentAtNode(div);
});
