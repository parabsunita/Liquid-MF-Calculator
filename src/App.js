import React from "react";
import Calculator from "./components/Calculator";
import { ThemeProvider } from "@mui/material/styles";

import "./App.css";
function App() {
  return (
    <>
      <div className="App">
        <Calculator></Calculator>
      </div>
      <div class="main__bg"></div>
      <div class="main__bg layer1"></div>
      <div class="main__bg layer2"></div>
    </>
  );
}

export default App;
