import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Apexcharts from "./apexcharts";
import ChartJs from "./chartjs";
import Morrischart from "./morrischart";
import Flotchart from "./flotcharts";
import Peitychart from "./peitychart";

const ChartIndex = ({ match }) => (
  <Routes refresh={true}>    
    <Navigate exact from={`${match.url}/`} to={`${match.url}/chart-apex`} />    
    <Route path={`${match.url}/chart-apex`} component={Apexcharts} />
    <Route path={`${match.url}/chart-js`} component={ChartJs} />
    <Route path={`${match.url}/chart-morris`} component={Morrischart} />
    <Route path={`${match.url}/chart-flot`} component={Flotchart} />
    <Route path={`${match.url}/chart-peity`} component={Peitychart} />
  </Routes>
);

export default ChartIndex;
