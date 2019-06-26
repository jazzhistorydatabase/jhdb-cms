import React from 'react';
import ReactDOM from 'react-dom';
import MainPageTB from "./MainPageTB";

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MainPageTB/>, div);
    ReactDOM.unmountComponentAtNode(div);
});
