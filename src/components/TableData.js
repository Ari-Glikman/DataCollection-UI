import React, {useState, useEffect} from 'react'


  function Table({timeBack, numGlobals}) {
    const [data, setData] = useState([]);


    const fetchData = () => {
      fetch('http://localhost/Sample/dbAnalysis/globals/table/' + timeBack, {
        headers: {
          "Authorization": "Basic c3VwZXJ1c2VyOlNZUw=="
        }
      })
        .then((response) => response.json())
        .then((actualData) => {
          console.log(actualData);
          setData(actualData.data);
          console.log(data);
         
        })
        .catch((err) => {
          console.log(err.message);
        });
    };
    useEffect(() => {
      fetchData();
    });
    return (
      <div>
      <tbody>
        <tr>
          <th>GlobalName</th>
          <th>ClassName</th>
          <th>Bytes Used OLD</th>
          <th>Date OLD</th>
          <th>Bytes Used New</th>
          <th>Date NEW</th>
          <th>% CHANGE</th>
        </tr>
        {
        data.sort((a,b) => a.NewMB < b.NewMB ? 1 : -1).slice(0,numGlobals)
        .map((item, index) => (
          <tr key={index}>
            <td style = {{backgroundColor: 'rgba(21,147,255, .3)'}}>{item.Name}</td>
            <td>{item.ClassName}</td>
            <td style = {{backgroundColor: 'rgba(21,147,255, .3)'}}>{item.OldMB}</td>
            <td>{item.OldDate}</td>
            <td style = {{backgroundColor: 'rgba(21,147,255, .3)'}}>{item.NewMB}</td>
            <td>{item.NewDate}</td>
            <td style = {{backgroundColor: item.Change > 10 ? 'rgba('+item.Change*20+', 0, 0, 0.8)': item.Change < 0 ? 'rgba(0, 245, 0, 0.8)' : 'rgba(255, 255, 0, 0.8)'}}>{item.Change}</td>
          </tr>
        ))}
      </tbody>
      </div>
    );
  }
    
  export default Table;
