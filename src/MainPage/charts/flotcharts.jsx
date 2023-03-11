import React from "react";
import { Link } from "react-router-dom";
import "../../assets/plugins/flot/jquery.flot.js";
import "../../assets/plugins/flot/jquery.flot.fillbetween.js";
import "../../assets/plugins/flot/jquery.flot.pie.js";
import "../../assets/plugins/flot/chart-data.js";
const FlotCharts = () => {
  return (
    <div className="page-wrapper cardhead">
      <div className="content">
        {/* Page Header */}
        <div className="page-header">
          <div className="row">
            <div className="col-sm-12">
              <h3 className="page-title">Flot Chart</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/dream-pos/dashboard">Dashboard</Link>
                </li>
                <li className="breadcrumb-item active">Flot Charts</li>
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
              <div className="card-body  chart-set">
                <div className="h-250" id="flotBar1" />
              </div>
            </div>
          </div>
          {/* /Chart */}
          {/* Chart */}
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <div className="card-title">Bar Chart</div>
              </div>
              <div className="card-body chart-set">
                <div className="h-250" id="flotBar2" />
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
              <div className="card-body chart-set">
                <div className="h-250" id="flotLine1" />
              </div>
            </div>
          </div>
          {/* /Chart */}
          {/* Chart */}
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <div className="card-title">Line ChartPOints</div>
              </div>
              <div className="card-body chart-set">
                <div className="h-250" id="flotLine2" />
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
              <div className="card-body chart-set">
                <div className="h-250" id="flotArea1" />
              </div>
            </div>
          </div>
          {/* /Chart */}
          {/* Chart */}
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <div className="card-title">Area Chart Points</div>
              </div>
              <div className="card-body chart-set">
                <div className="h-250" id="flotArea2" />
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
              <div className="card-body chart-set">
                <div className="h-250" id="flotPie1" />
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
              <div className="card-body chart-set">
                <div className="h-250" id="flotPie2" />
              </div>
            </div>
          </div>
          {/* /Chart */}
        </div>
      </div>
    </div>
  );
};
export default FlotCharts;
