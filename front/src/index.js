import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Latout from "./Components/Layout";
import GlobalStyle from "./GlobalStyles";
import { BrowserRouter as Router } from "react-router-dom";
import "antd/dist/antd.css";

// redux things
import { createStore, compose, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./reducers/index";
import promiseMiddle from "redux-promise";
import ReduxThunk from "redux-thunk";

//redux conf
const enhancer = compose(applyMiddleware(promiseMiddle, ReduxThunk));

const store = createStore(rootReducer, enhancer);

ReactDOM.render(
  <>
    <Provider store={store}>
      <Router>
        <GlobalStyle />
        <Latout>
          <App />
        </Latout>
      </Router>
    </Provider>
  </>,
  document.getElementById("root")
);
