import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import "./App.css";
import FlightDisplay from "./components/FlightDisplay";
import AdminPage from "./components/AdminPage";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <nav className="main-nav">
            <Link to="/">Flight Display</Link>
            <Link to="/admin">Admin Page</Link>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<FlightDisplay />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </main>
        <footer className="App-footer">
          © 2025 Your Company. All rights reserved.
        </footer>
      </div>
    </Router>
  );
}

export default App;
