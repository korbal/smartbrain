# Smart Brain

Welcome to Smart Brain, a web app that allows users to register, submit portrait images, and have the app detect and draw a box around any faces found in the image using the Clarifai API's face detection model. This was a project in zerotomastery.io's course. The course was not entirely a code along, I had to overcome a few challenges:

- The Clarifai REST API integration. The course was really outdated in that regard, but it was great practice.
- Finding a proper host. I wanted to host everything on render.com, but only the database lives there (heroku is not free anymore)
- I had to deal with CORS issues due to the fact that the frontend is hosted on Netlify, the backend on Cyclic.
- Moving the API calls from the initial frontend to the backend
- Setting up ENV variables properly on the servers
- Deploying and debugging due to differences between local and remote server
- Had to learn a ton of new technologies: node, postgres, knew.js,

Overall it was a great experience and good learning opportunity.

Possible future improvements:

- Redesign frontend with Tailwind
- Move to Supabase
- Store submitted images for a gallery view
- Add documentation
- Display a leaderboard on the home page wihout authentication

## Frontend

The frontend of the app is built using React.js and is hosted on Netlify at balint-ztm-smartbrain.netlify.com

## Backend

The backend of the app is a Node.js server running Express. It can be accessed at https://smartbrain.cyclic.app/ and has the following endpoints:

/signin: Allows users to sign in to their account
/register: Allows new users to register for an account
/profile/:userId: Allows users to view their profile, including any images they have submitted
/image: Endpoint for keeping trqack of the number of images the user submitted
/imageurl: Endpoint for handling Clarifai API calls to protect the API secret

## Database

The number of images submitted by users are stored in their profile and then persisted in a Postgres database hosted on Render.com Unfortunately Render.com deletes free databases after 90 days, so this will not work after 17th April, 2023. I will have to decide how to handle this, but most probable to move it to Supabase.

## Usage

Visit [balint-ztm-smartbrain.netlify.com](balint-ztm-smartbrain.netlify.com).
Register for an account or sign in to an existing one
Submit images to be analyzed by providing a URL
See how many images you submitted on the home page

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [https://smartbrain.cyclic.app/](https://smartbrain.cyclic.app/) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
