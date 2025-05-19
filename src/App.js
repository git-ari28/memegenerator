import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import MemeGenerator from "./MemeGenerator";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<MemeGenerator />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;




