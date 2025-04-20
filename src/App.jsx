import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { HomePage } from "./pages/HomePage";
import WelcomeModal from "./components/WelcomeModal";
import Summarizer from "./components/Summarizer";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <WelcomeModal />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/summarize" element={<Summarizer/>}/>
          <Route path="*" element={<HomePage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
