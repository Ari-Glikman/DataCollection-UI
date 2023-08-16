import React, {useState, useEffect} from 'react'
import{Chart as ChartJS, BarElement} from 'chart.js'
import {Bar} from 'react-chartjs-2'

ChartJS.register(
    BarElement
)

const BarChart = () => {
    
    const [chart, setChart] = useState([])
    

     var baseUrl = "http://localhost:52776/Sample/dbAnalysis/globals/all"
    
    useEffect(() =>{
        const fetchGlobals = async () => {
            await fetch(`${baseUrl}`,{
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': 'true'

                   
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
        labels: chart?.map(x=> x.Name),
        datasets: [{
          label: "Global Used Size (MB)",
        data: chart?.map(x => x.UsedMB),  
        borderWidth: 1,
        borderColor: '#00008b',
        backgroundColor: '#00008b'
        },
        {
            label: "Allocated Size (MB)",
            data: chart?.map(x => x.AllocatedMB),  
            borderWidth: 1,
            borderColor: '#a52a2a',
            backgroundColor: '#a52a2a'
            
        }
    ]
      }
   var options = {
    maintainAspectRatio: false,
    scales: {
        x: {
            display: true,
            title: {
                display: true,
                text: "Name of Class/Global"
            }
        },
      y: {
        beginAtZero: true,
        title: {
            display: true,
            text: "MegaBytes"
        }
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
            <Bar
            data = {data}
            height = {400}
            width = {2000}
            options = {options}
            />
        </div>
    )
}

export default BarChart