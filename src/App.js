import './App.css';
import DBChart from "./components/DBChart.js"
import DropDown from './components/DropDownGlobals';
import BarChart from './components/BarChart';
import React from "react";
import TableInputBar from './components/TableInputBar';

function App() {


  return (

    <div className="float-parent-element">
     
      {/* <canvas id = "DBChart"></canvas> */}
      <div className = "float-child-element1">
        
        
        
        
      <h1>Database History</h1>
       
      
      <br /> 
      <br /> 
      <br />   
      <DBChart/>
      </div>
      
      <div className = "float-child-element1">
      <h2>Choose a global to see it's history</h2>
      
      <DropDown/>
      </div>
      {/* <br /> */}
      {/* <br /> */}
      <h3>Most recent measurement of global sizes 
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        Tabled Data </h3>
      <div className = "float-child-element1">
       
      <BarChart/>
      </div>

      
      {/* <h2>Tabled Data (Ordered by Size)</h2> */}

      <TableInputBar/>
      {/* <Table timeBack = {30} numGlobals={5}/> */}

      
  
    </div>
   
  );
}


export default App;

