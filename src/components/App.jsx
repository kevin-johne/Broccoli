import React from "react";
import './App.css';
import Header from "./header";
import Products from "./products";


function App() {
  return (
    <div className="App">
      <Header/>
      <div>
        <Products/>
      </div>
    </div>
  );
}

export default App;
