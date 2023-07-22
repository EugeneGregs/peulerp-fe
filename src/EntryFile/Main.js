import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Switch,
  HashRouter,
} from "react-router-dom";
import App from "../InitialPage/App";
import config from "config";
import withRouter from "../hooks/withRouter";

import "../assets/plugins/fontawesome/css/fontawesome.min.css";
import "../assets/plugins/fontawesome/css/all.min.css";
import "../assets/css/bootstrap.min.css";
import "../assets/js/bootstrap.bundle.min.js";
import "../assets/css/font-awesome.min.css";
import "../assets/css/line-awesome.min.css";
import "../assets/css/style.css";
import "semantic-ui-css/semantic.min.css";

const MainApp = () => (
    <Routes>
      <Route path="/" element={<App />} />
    </Routes>
);

export default withRouter(MainApp);
