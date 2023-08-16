import React, {useState} from 'react';
import Table from './TableData.js';
const TableInputBar = () => {
const [searchInput, setSearchInput] = useState("");
const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };
return <div>
<input
   type="search"
   placeholder="Number of Globals?"
   onChange={handleChange}
   value={searchInput} />
   <Table timeBack={1000} numGlobals={searchInput}/>
</div>
};
export default TableInputBar;