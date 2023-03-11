import React from "react";
import { Link } from "react-router-dom";
import "../../assets/plugins/chartjs/chart.min.js"
import "../../assets/plugins/chartjs/chart-data.js"

const ChartJs = () => {
  return (
    <div className="page-wrapper cardhead">
      <div className="content">
        {/* Page Header */}
        <div className="page-header">
          <div className="row">
            <div className="col-sm-12">
              <h3 className="page-title">Chartjs</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="/dream-pos/dashboard">Dashboard</a>
                </li>
                <li className="breadcrumb-item active">Chartjs</li>
              </ul>
            </div>
          </div>
        </div>
        {/* /Page Header */}
        <div className="row">
          {/* Chart */}
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <div className="card-title">Bar Chart</div>
              </div>
              <div className="card-body">
                <div>
                  <canvas id="chartBar1" className="h-300" />
                </div>
              </div>
            </div>
          </div>
          {/* /Chart */}
          {/* Chart */}
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <div className="card-title">Transparency </div>
              </div>
              <div className="card-body">
                <div>
                  <canvas id="chartBar2" className="h-300" />
                </div>
              </div>
            </div>
          </div>
          {/* /Chart */}
          {/* Chart */}
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <div className="card-title">Gradient Bar Chart</div>
              </div>
              <div className="card-body">
                <div>
                  <canvas id="chartBar3" className="h-300" />
                </div>
              </div>
            </div>
          </div>
          {/* /Chart */}
          {/* Chart */}
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <div className="card-title">Horizontal Bar Chart</div>
              </div>
              <div className="card-body">
                <div className="chartjs-wrapper-demo">
                  <canvas id="chartBar4" className="h-300" />
                </div>
              </div>
            </div>
          </div>
          {/* /Chart */}
          {/* Chart */}
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <div className="card-title">Horizontal Bar Chart Style2</div>
              </div>
              <div className="card-body">
                <div className="chartjs-wrapper-demo">
                  <canvas id="chartBar5" className="h-300" />
                </div>
              </div>
            </div>
          </div>
          {/* /Chart */}
          {/* Chart */}
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <div className="card-title">Vertical Stacked Bar Chart</div>
              </div>
              <div className="card-body">
                <div className="chartjs-wrapper-demo">
                  <canvas id="chartStacked1" className="h-300" />
                </div>
              </div>
            </div>
          </div>
          {/* /Chart */}
          {/* Chart */}
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <div className="card-title">Horizontal Stacked Bar Chart</div>
              </div>
              <div className="card-body">
                <div className="chartjs-wrapper-demo">
                  <canvas id="chartStacked2" className="h-300" />
                </div>
              </div>
            </div>
          </div>
          {/* /Chart */}
          {/* Chart */}
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <div className="card-title">Line Chart</div>
              </div>
              <div className="card-body">
                <div className="chartjs-wrapper-demo">
                  <canvas id="chartLine1" className="h-300" />
                </div>
              </div>
            </div>
          </div>
          {/* /Chart */}
          {/* Chart */}
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <div className="card-title">Donut Chart</div>
              </div>
              <div className="card-body">
                <div className="chartjs-wrapper-demo">
                  <canvas id="chartPie" className="h-300" />
                </div>
              </div>
            </div>
          </div>
          {/* /Chart */}
          {/* Chart */}
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <div className="card-title">Pie Chart</div>
              </div>
              <div className="card-body">
                <div className="chartjs-wrapper-demo">
                  <canvas id="chartDonut" className="h-300" />
                </div>
              </div>
            </div>
          </div>
          {/* /Chart */}
          {/* Chart */}
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <div className="card-title">Area Chart</div>
              </div>
              <div className="card-body">
                <div className="chartjs-wrapper-demo">
                  <canvas id="chartArea1" className="h-300" />
                </div>
              </div>
            </div>
          </div>
          {/* /Chart */}
        </div>
      </div>
    </div>
  );
};
export default ChartJs;
