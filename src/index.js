import React from "react";
import ReactDOM from "react-dom";
import Main from './EntryFile/Main';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from "./context/AuthContext";
import config from 'config';

ReactDOM.render(
        <Router basename={`${config.publicPath}`}>
            <AuthProvider>
                <Routes>
                    <Route path="*" element={<Main/>}/>
                </Routes>
            </AuthProvider>
        </Router>
    , document.getElementById('app')
);

if (module.hot) { // enables hot module replacement if plugin is installed
 module.hot.accept();
}