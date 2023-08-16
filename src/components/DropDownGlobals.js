// import React, {useState} from 'react';
// import {globalNames} from './globalNames';
// import SingleGlobalChart from './SingleGlobalHistoryChart';
import SearchBar from './SearchBar';
function DropDown(){
    // const [val,setVal]=useState('')
    //const data = globalNames.map((data)=> [data.GlobalName , data.ClassName])
    return(
        <div>

        {/* <select 
        value = {val} onChange = {e=>{
            setVal(e.target.value)
            }}>
            { 
            data.map(opt=>
            <option>
                {opt[1]!== "" &&
                opt[0] + 
                " Classname: "+opt[1]    
                } 
                {opt[1] ==="" &&
                opt[0]}
            
            </option>
                )   
            }
        </select> */}

       
        {/*         
        { val.split(" ")[0] !== 'Enter' &&
         <h1>{val.split(" ")[2]}</h1> 
        }
    
        { val.split(" ")[0] !== 'Enter' &&
        
        <h2><SingleGlobalChart globalName={val.split(" ")[0]}/></h2>
        }
        {val.split(" ")[0] === 'Enter' &&
        
        } */}
        <SearchBar/>
        </div>

    );
};

export default DropDown;