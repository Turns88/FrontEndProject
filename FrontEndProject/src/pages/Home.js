import React, { useState, useEffect } from 'react'
import{ AgGridReact } from "ag-grid-react";
import { Container } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import NavBar from '../components/NavBar'
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

export default function Home() {

	const [rowData, setRowData]=useState([]);
	
	const x = new Array
	const y = new Array 
	
	const columns =[
	    { headerName: "Rank:", field: "rank", resizable:true,width:90 , sortable: true, filter:true},
	    { headerName: "Country:", field: "country",resizable:true,width:120,  sortable: true, filter: true},
	    { headerName: "Score", field: "score",resizable:true,width:100 , sortable: true, filter: "agNumberColumnFilter"},
	    { headerName: "Year:", field: "year",resizable:true, width:90, sortable: true, filter:true},
	    ]

    //fetch the all the rankings from the api, filter the result to show just the top 10 from 2020
    useEffect( () => {
        fetch("http://131.181.190.87:3000/rankings")
        .then( (res) => { if (res.ok) { 
			return (res.json() )
        } else {
			throw new Error('Network response was not ok')
		}})
        .then( (rankings) => rankings.map( (ranking) =>( {
            rank: ranking.rank,
            country: ranking.country, 
            score: ranking.score,
            year: ranking.year           
        }))
		)  
        .then(rankings => setRowData( rankings.filter( function( country ) {
            return country.rank <= 10 & country.year ===2020 }))) 
        .catch(error => console.log( 'There was a problem with your fetch operation', error.message) )
    }, [rowData.country] );

    //manipulate the data received to seperate into two arrays one for x axis and one for y axis
    for ( let i = 0; i <rowData.length; i++) {
        x.push( rowData[i].country )
   }

	for (let j = 0; j <rowData.length; j++) {
       y.push( rowData[j].score )
   }

    function chartData(props) {
        return {
        	labels: x,
        	datasets: [
          	{
            	label: 'Top10',
            	backgroundColor: [
					'white' ,
					"red" ,
					"blue", 
					"green", 
					"brown", 
					"purple", 
					"yellow", 
					"black", 
					"pink", 
					"teal"],
            	borderColor: 'black',
            	borderWidth: 3,
            	data: y
          }]
    	}
    }

    return (
        <Container >
 			<div className ="App">
        		<div className ="Homeheading">
            		<NavBar />
        		</div>
        
            	<h1 className = "HomeTitle"> 
					<strong>Top 10 Rankings 2020</strong>
				</h1>

            	<p className = "HomePara">Explore using filters or scroll to see a visual representation</p>
    			
				<div className="homeTable">  
        		
					<div
            			className="ag-theme-alpine"
            			style={ {
            			height: "550px",
            			width: "475px"
            			} }>
            			<AgGridReact
            			className= "RankingsTable"
            			columnDefs={ columns }
            			rowData={ rowData} 
            			pagination = { true }
            			paginationPageSize = { 10 }
            			/>
        			</div>
    			</div>
   				<div className = "HomeBarGraph">
        			<Bar
						data= { chartData }
          				options={ {
            			title: {
            				display: true,
            				text: 'Top 10Countries',
            				fontSize: 20
            			},
            			legend: {
            				display: true,
            				position: 'right'
            			},
            			scales: {
            			       x:{  
            			           offset: true
            			       },
            			       y: { 
									min: 7,
            			        	max: 8,
            			        	ticks: {
            			        		stepSize: 0.025
            			        	},
            			    	offset:true
            			       } 
            				} 
          				}}
        			/>
   				</div>   

			</div>
  
   		 </Container>

    )
}
