import React from "react";
import ReactDOM from "react-dom";
import Main from './EntryFile/Main';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from "./context/AuthContext";

ReactDOM.render(
    <React.StrictMode>
        <Router basename={`${config.publicPath}`}>
            <AuthProvider>
                <Routes>
                    <Route path="/*" element={<Main/>}/>
                </Routes>
            </AuthProvider>
        </Router>
    </React.StrictMode>
    , document.getElementById('app')
);

if (module.hot) { // enables hot module replacement if plugin is installed
 module.hot.accept();
}