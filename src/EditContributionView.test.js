import React from 'react';
import ReactDOM from 'react-dom';
import EditContributionView from "./EditContributionView";


it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<EditContributionView/>, div);
    ReactDOM.unmountComponentAtNode(div);
});
