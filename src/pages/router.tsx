import React from "react";
import Home from "../pages/Home/";

// import { Container } from './styles';

import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import firebase from "firebase";
import { config } from "../services/firebase";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
