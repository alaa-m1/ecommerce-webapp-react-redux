# E-commerce Web Application: React, Redux, React Query, MUI, React Hook Form, Zod schema validation, Firebase, Cypress, SASS, Localization, Theming

## Available Scripts

In the project directory, you can run:

### `pnpm install`
Install project dependencies.

### `pnpm start`
To run this project locally, you need to add .env file with the following variables (From the firebase account):
```
REACT_APP_API_KEY=
REACT_APP_AUTH_DOMAIN=
REACT_APP_PROJECT_ID=
REACT_APP_STORAGE_BUCKET=
REACT_APP_MESSAGING_SENDER_ID=
REACT_APP_APP_ID=
REACT_APP_STRIPE_PUBLISHABLE_KEY=
REACT_APP_STRIPE_SK=
```
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `pnpm cy`
To run Cypress tests for this project locally, you need to add  cypress.env.json  file with the following values:
```
{
  "user_email": "email_address@gmail.com",
  "user_password": "password"
}

```
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `pnpm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


## Production Link
Production link: [https://phoenix-ecommerce.netlify.app/](https://phoenix-ecommerce.netlify.app/).

PWA Production link: [https://phoenix-ecommerce-pwa.netlify.app/](https://phoenix-ecommerce-pwa.netlify.app/).


## Docker Hub

Pull the latest docker image : 
```
docker pull alaa0m1/ecommerce-website-react-reactquery-redux:latest
```

Docker Hub repository link: [https://hub.docker.com/r/alaa0m1/ecommerce-website-react-reactquery-redux/tags](https://hub.docker.com/r/alaa0m1/ecommerce-website-react-reactquery-redux/tags).