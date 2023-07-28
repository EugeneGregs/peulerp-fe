import {Routes, Route} from 'react-router-dom';
import React from 'react';
import Invertry from './inventry';
import ReportIndex from './index';

const ReportLayout = () => (
    <Routes>
        <Route path="/" element={<ReportIndex />} />
        <Route index element={<Invertry/>} />
        <Route path="inventoryreport" element={<Invertry/>} />
    </Routes>
)

export default ReportLayout;