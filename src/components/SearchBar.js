import React, {useState} from 'react';
import SingleGlobalChart from './SingleGlobalHistoryChart'
const SearchBar = () => {
const [searchInput, setSearchInput] = useState("");
const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };
return <div>
<input
   type="search"
   placeholder="Search here"
   onChange={handleChange}
   value={searchInput} />
   <h2><SingleGlobalChart globalName={searchInput}/></h2>
</div>
};
export default SearchBar;