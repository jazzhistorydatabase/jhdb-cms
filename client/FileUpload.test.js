import React from 'react';
import ReactDOM from 'react-dom';
import FileUpload from "./FileUpload";


it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<FileUpload/>, div);
    ReactDOM.unmountComponentAtNode(div);
});
