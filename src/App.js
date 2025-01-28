import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import NotFound from "./Pages/NotFound";
import Symp from "./Pages/Symp";
import ResultsPage from "./Components/ResultsDiabetes";
import Stat  from "./Pages/Stat";

function App() {
  return (
    <div className="App">
      <Router basename="/Health-Plus">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/Symp" element={<Symp />} />
          <Route path="/Charts" element={<Stat />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
