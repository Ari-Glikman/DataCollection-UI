import './App.css';
import DBChart from "./components/DBChart.js"
import BarChart from './components/BarChart';
import SearchBar from './components/SearchBar';
import React from "react";
import TableInputBar from './components/TableInputBar';

function App() {

  return (

    <div className="float-parent-element">
      <div className = "float-child-element1">
        
      <h1>Database History</h1>
      
      <br /> 
      <br /> 
      <br />   
      <DBChart/>
      </div>
      
      <div className = "float-child-element1">
      <h2>Enter a Global To Inspect It</h2>
      
      <div>
        <SearchBar/>
      </div>
      </div>
      {/* <br /> */}
      {/* <br /> */}
      <div className = "float-child-element1">
      <h1>Global Sizes   
       </h1>  
      <BarChart/>
      </div>

      <div className = "float-child-element1">
      <h2>Tabled Data</h2>

      <TableInputBar/>
      </div>
    </div>
   
  );
}


export default App;

