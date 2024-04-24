import React, {useState, useEffect} from 'react'
import{Chart as ChartJS, LineElement} from 'chart.js'
import {Line} from 'react-chartjs-2'

ChartJS.register(
    LineElement
)

const SingleGlobalChart = ({globalName}) => {
    
    const [chart, setChart] = useState([])


    var baseUrl = "http://localhost/Sample/dbAnalysis/global/"+globalName
    
    useEffect(() =>{
        const fetchGlobals = async () => {
            await fetch(`${baseUrl}`,{
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Basic c3VwZXJ1c2VyOlNZUw==",
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
        labels: chart?.map(x=> x.Date),
        datasets: [{
          label: "Used MB",
         data: chart?.map(x => x.UsedMB),  
        borderWidth: 1,
        borderColor: '#00008b',
        backgroundColor: '#00008b'
        },
        {
            data: chart?.map(x => x.AllocatedMB),
        label: "Allocated MB",
        borderColor: '#a52a2a',
        backgroundColor: '#a52a2a',
        borderWidth: 1

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
                text: "Date"
            }
        },
      y: {
        beginAtZero: true,
        title:
        {
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
            <Line
            data = {data}
            height = {200}
            width = {1000}
            options = {options}
            />
        </div>
    )
}

export default SingleGlobalChart
