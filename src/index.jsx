import { createRoot } from 'react-dom/client';
import { MainView } from "./components/main-view/main-view";
import Container from "react-bootstrap/Container";
import { store } from "./redux/store";
import { Provider } from "react-redux";

//Import statement to indicate that you need to bundle `./index.scss`
import "./index.scss";

// const dotenv = require('dotenv');
// dotenv.config({ path: `../config.env` })
import dotenv from 'dotenv';
dotenv.config({path: '../.env'});
// require('dotenv').config({ path: './.env'});
// import 'dotenv/config';
console.log(process.env.SERVER_CONNECTION_URL);

//Main component (will eventually use all the others)
const MyFlixApplication = () => {
  return (
    <Provider store={store}>
      <Container>
        <MainView />
      </Container>
    </Provider>
  );
};

//Finds the root of your app
const container = document.querySelector("#root");
const root = createRoot(container);

//Tells React to render your app in the root DOM element
root.render(<MyFlixApplication />);