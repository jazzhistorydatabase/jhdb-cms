import React from 'react';
import ReactDOM from 'react-dom';
import ContributionsListView from "./ContributionsListView";

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ContributionsListView/>, div);
    ReactDOM.unmountComponentAtNode(div);
});
