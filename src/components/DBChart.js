import React, {useState, useEffect} from 'react'
import {Line} from 'react-chartjs-2'
import { Chart, registerables} from 'chart.js';

Chart.register(...registerables);

const DBChart = () => {
    
    const [chart, setChart] = useState([])

    var baseUrl = "http://localhost/Sample/dbAnalysis/db/history"




    useEffect(() =>{
        const fetchGlobals = async () => {
           
            await fetch(`${baseUrl}`,{
                method: "GET",
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET",
                    "Access-Control-Allow-Headers": "Content-Type, Authorization",
                    "Authorization": "Basic c3VwZXJ1c2VyOlNZUw=="
                    
                }
                
            }).then((response) =>{
                response.json().then((json)=> {
                    console.log(json)
                    setChart(json.data)
                })
            }).catch(error => {
                console.log(error);
            })
        }
        fetchGlobals()
    },
    [baseUrl])

    var data =  {
        labels: chart?.map(x=> x.Date),
        datasets: [{
          label: "Used MB",
        data: chart?.map(x => x.DBUsedSize),  
        borderWidth: 1,
        borderColor: '#00008b',
        backgroundColor: '#00008b'
        },
        {
            data: chart?.map(x => x.DBAllocSize),
        label: "Allocated Size",
        borderColor: '#a52a2a',
        backgroundColor: '#a52a2a',
        borderWidth: 1

        }
    
    ]
      }



   var options = {
    
    onClick: (e, elements) => {
        if(elements.length)
        {
            console.log(elements[0])
            ///alert(elements[0]?.index)
            
        }
    },

    
    maintainAspectRatio: false,
    scales: {
        x: {
            display: true,
            title: {
                display: true,
                text: "Date"
            }
        },
      y: {
        display: true,
        title: {
            display: true,
            text: "MegaBytes"
        },
        beginAtZero: true,
      }
    },


    legend: {
        labels:{

            fontSize: 26
        }
    }
 
  }  
    
    
    return (
        <div>
            <Line
            data = {data}
            height = {200}
            width = {1000}
            options = {options}
            />
        </div>
    )
}

export default DBChart
