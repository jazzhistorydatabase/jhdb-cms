This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

You can clone the project by running
### `git clone https://github.com/jazzhistorydatabase/jhdb-cms.git`


## Available Scripts


In the project directory, you can run:

### `npm install`
Installs all dependencies

### `npm dev`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

### `npm start`

Runs app in production mode. This will serve the content in the build` folder statically. To apply code changes, rebuild.

## Automatic Deployment

All commits to the `master` branch are auto-deployed to the [staging environment](https://jhdb-cms.appspot.com)

## Manual Deployment

Authenticated users with the Google Cloud SDK installed can run
`gcloud builds submit --config cloudbuild.yaml .`
This should be used in extreme circumstances only! All releases should be peer reviewed and auto-deployed via pull request.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
