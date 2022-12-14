import React from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import { Books } from "./features/books/Books";

function App() {
  return (
    <div className="App">
      <NavBar />
      <div className="content">
        <Books />
      </div>
    </div>
  );
}

export default App;
