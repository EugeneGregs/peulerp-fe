import React from "react";
import { Link } from "react-router-dom";
import "../../assets/plugins/peity/jquery.peity.min.js"
import "../../assets/plugins/peity/chart-data.js"

const PeityCharts = () => {
  return (
    <div className="page-wrapper cardhead">
      <div className="content container-fluid">
        {/* Page Header */}
        <div className="page-header">
          <div className="row">
            <div className="col-sm-12">
              <h3 className="page-title">Peity Chart</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/dream-pos/dashboard">Dashboard</Link>
                </li>
                <li className="breadcrumb-item active">Peity Charts</li>
              </ul>
            </div>
          </div>
        </div>
        {/* /Page Header */}
        <div className="row">
          {/* Chart */}
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <div className="card-title">Donut Chart</div>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-2 col-md-4">
                    <div className="card-body ">
                      <span
                        className="donut"
                        data-peity='{ "fill": ["#7638ff", "rgba(67, 87, 133, .09)"]}'
                      >
                        1/5
                      </span>
                    </div>
                  </div>
                  <div className="col-lg-2 col-md-4">
                    <div className="card-body ">
                      <span
                        className="donut"
                        data-peity='{ "fill": ["#7638ff", "rgba(67, 87, 133, .09)"]}'
                      >
                        226/360
                      </span>
                    </div>
                  </div>
                  <div className="col-lg-2 col-md-4">
                    <div className="card-body ">
                      <span
                        className="donut"
                        data-peity='{ "fill": ["#7638ff", "rgba(67, 87, 133, .09)"]}'
                      >
                        0.52/1.561
                      </span>
                    </div>
                  </div>
                  <div className="col-lg-2 col-md-4">
                    <div className="card-body ">
                      <span
                        className="donut"
                        data-peity='{ "fill": ["#7638ff", "rgba(67, 87, 133, .09)"]}'
                      >
                        1,4
                      </span>
                    </div>
                  </div>
                  <div className="col-lg-2 col-md-4">
                    <div className="card-body ">
                      <span
                        className="donut"
                        data-peity='{ "fill": ["#7638ff", "rgba(67, 87, 133, .09)"]}'
                      >
                        226,134
                      </span>
                    </div>
                  </div>
                  <div className="col-lg-2 col-md-4">
                    <div className="card-body ">
                      <span
                        className="donut"
                        data-peity='{ "fill": ["#7638ff", "rgba(67, 87, 133, .09)"]}'
                      >
                        0.52,1.041
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* /Chart */}
          {/* Chart */}
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <div className="card-title">Pie Chart</div>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-2 col-md-4">
                    <div className="card-body ">
                      <span
                        className="pie"
                        data-peity='{ "fill": ["#7638ff", "rgba(67, 87, 133, .09)"]}'
                      >
                        1/5
                      </span>
                    </div>
                  </div>
                  <div className="col-lg-2 col-md-4">
                    <div className="card-body ">
                      <span
                        className="pie"
                        data-peity='{ "fill": ["#7638ff", "rgba(67, 87, 133, .09)"]}'
                      >
                        226/360
                      </span>
                    </div>
                  </div>
                  <div className="col-lg-2 col-md-4">
                    <div className="card-body ">
                      <span
                        className="pie"
                        data-peity='{ "fill": ["#7638ff", "rgba(67, 87, 133, .09)"]}'
                      >
                        0.52/1.561
                      </span>
                    </div>
                  </div>
                  <div className="col-lg-2 col-md-4">
                    <div className="card-body ">
                      <span
                        className="pie"
                        data-peity='{ "fill": ["#7638ff", "rgba(67, 87, 133, .09)"]}'
                      >
                        1,4
                      </span>
                    </div>
                  </div>
                  <div className="col-lg-2 col-md-4">
                    <div className="card-body ">
                      <span
                        className="pie"
                        data-peity='{ "fill": ["#7638ff", "rgba(67, 87, 133, .09)"]}'
                      >
                        226,134
                      </span>
                    </div>
                  </div>
                  <div className="col-lg-2 col-md-4">
                    <div className="card-body ">
                      <span
                        className="pie"
                        data-peity='{ "fill": ["#7638ff", "rgba(67, 87, 133, .09)"]}'
                      >
                        0.52,1.041
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* /Chart */}
          {/* Chart */}
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Line Charts</h3>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-4">
                    <div className="card-body ">
                      <span className="peity-line" data-width="100%">
                        6,2,8,4,3,8,1,3,6,5,9,2,8,1,4,8,9,8,2,1
                      </span>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="card-body ">
                      <span className="peity-line" data-width="100%">
                        6,2,8,4,-3,8,1,-3,6,-5,9,2,-8,1,4,8,9,8,2,1
                      </span>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="card-body ">
                      <span className="peity-line" data-width="100%">
                        6,2,8,4,3,8,1,3,6,5,9,2,8,1,4,8,9,8,2,1
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Bar Charts</h3>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-4">
                    <div className="card-body ">
                      <span
                        className="bar"
                        data-peity='{ "fill": ["#5b73e8", "#38cb89"]}'
                      >
                        6,2,8,4,3,8,1,3,6,5,9,2,8,1,4,8,9,8,2,1
                      </span>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="card-body ">
                      <span
                        className="bar"
                        data-peity='{ "fill": ["#38cb89", "#3e80eb"]}'
                      >
                        6,2,8,4,-3,8,1,-3,6,-5,9,2,-8,1,4,8,9,8,2,1
                      </span>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="card-body ">
                      <span
                        className="bar"
                        data-peity='{ "fill": ["#ef4b4b", "#ffab00"]}'
                      >
                        6,2,8,4,3,8,1,3,6,5,9,2,8,1,4,8,9,8,2,1
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* /Chart */}
          <div className="col-lg-12 col-md-12">
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Data attributes</h3>
              </div>
              <div className="text-center">
                <div className="row">
                  <div className="col-lg-2 col-md-4">
                    <div className="card-body ">
                      <p className="data-attributes">
                        <span data-peity='{ "fill": ["#664dc9", "rgba(67, 87, 133, .09)"],    "innerRadius": 10, "radius": 40 }'>
                          1/7
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-2 col-md-4">
                    <div className="card-body ">
                      <p className="data-attributes">
                        <span data-peity='{ "fill": ["#5b73e8", "rgba(67, 87, 133, .09)"], "innerRadius": 14, "radius": 36 }'>
                          2/7
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-2 col-md-4">
                    <div className="card-body ">
                      <p className="data-attributes">
                        <span data-peity='{ "fill": ["#38cb89", "rgba(67, 87, 133, .09)"], "innerRadius": 16, "radius": 32 }'>
                          3/7
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-2 col-md-4">
                    <div className="card-body ">
                      <p className="data-attributes">
                        <span data-peity='{ "fill": ["#ef4b4b", "rgba(67, 87, 133, .09)"],  "innerRadius": 18, "radius": 28 }'>
                          4/7
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-2 col-md-4">
                    <div className="card-body ">
                      <p className="data-attributes">
                        <span data-peity='{ "fill": ["#ffab00", "rgba(67, 87, 133, .09)"],   "innerRadius": 20, "radius": 24 }'>
                          5/7
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-2 col-md-4">
                    <div className="card-body ">
                      <p className="data-attributes">
                        <span data-peity='{ "fill": ["#3e80eb", "rgba(67, 87, 133, .09)"], "innerRadius": 18, "radius": 20 }'>
                          6/7
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-12 col-md-12">
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Setting Colours Dynamically</h3>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-3">
                    <div className="card-body ">
                      <span className="bar-colours-1">5,3,9,6,5,9,7,3,5,2</span>
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="card-body ">
                      <span className="bar-colours-2">
                        5,3,2,-1,-3,-2,2,3,5,2
                      </span>
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="card-body ">
                      <span className="bar-colours-3">
                        0,-3,-6,-4,-5,-4,-7,-3,-5,-2
                      </span>
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="card-body ">
                      <span className="pie-colours-2">5,3,9,6,5</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PeityCharts;
