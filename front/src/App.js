import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter,
} from "react-router-dom";
import Home from "./Screen/Home";
import Upload from "./Screen/Upload";
import Register from "./Screen/Register";
import HowToUse from "./Screen/HowToUse";
import Header from "./Components/Header";
import withAuthHoc from "./HOC/auth";
import withNotAuthHoc from "./HOC/notauth";

function App(props) {
  return (
    <div>
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/register" exact component={withNotAuthHoc(Register)} />
          <Route path="/upload" exact component={withAuthHoc(Upload)} />
          <Route path="/how-to-use" exact component={HowToUse} />
        </Switch>
      </Router>
    </div>
  );
}

export default withRouter(App);
