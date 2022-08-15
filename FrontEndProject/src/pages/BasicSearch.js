import  React, { useState } from 'react';
import { AgGridReact } from "ag-grid-react";
import { Bar } from 'react-chartjs-2';
import { Container } from 'react-bootstrap';
import NavBar from '../components/NavBar'
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import 'bootstrap/dist/css/bootstrap.min.css';  

export default function BasicSearch() {

    const [	Country, setCountry ] = useState('')
    const [	Year, setYear ] = useState('')
    const [	rowData, setRowData ] = useState([]);
    const [	yearError, setYearError ] = useState(null)
    const [	countryError, setCountryError ] = useState(null)
    const [	welcomeMsg, setWelcomeMsg ] = useState('Select by Country, Year or a combination of both. Press search to begin!')
    
    //iniatialise arrays to filter/manipulate the received data to be used in the chart
    const x = new Array
    const y = new Array 

    const columns = [
        { headerName: "Rank:", field: "rank", sortable: true, filter: true},
        { headerName: "Country:", field: "country", sortable: true, filter: true},
        { headerName: "Score", field: "score", sortable: true, filter: "agNumberColumnFilter"},
        { headerName: "Year", field: "year", sortable: true, filter: "agNumberColumnFilter"}
    ]
    /* Go to the api and get info based off the user updated variables, put that into rowData for input into table*/
    function getRankings(){
        fetch(`http://131.181.190.87:3000/rankings?year=${Year}&country=${Country}`)
        	.then( (res) => { if ( res.ok ) {
				return (res.json())
        	} else {
        		throw new Error('Network response was not ok') 
			}
			})
        	.then((rankings) => rankings.map((ranking) =>({
        	        rank: ranking.rank,
        	        country: ranking.country, 
        	        score: ranking.score, 
        	        year: ranking.year          
        	      }))
			)  
            .then( ranking => setRowData(ranking) ) 
            .catch( error => console.log('There was a problem with your fetch operation', error.message) )
    }               
           //populate new arrays to only have a specific number of countries eg 25 for the chart. 
           //Country is x axis, Score is the y axis
    for (let i = 0; i <(rowData.length - 131); i++){
    x.push(rowData[i].country)
     }
	 
    for (let j = 0; j <(rowData.length -131); j++){
    y.push(rowData[j].score)
    }
     //initalise the chart data using the newly created arrays as the x and y axis
    function chartData(props) {
        return {
        	labels: x,
        	datasets: [ {
        	    label: 'Top10',
        	    backgroundColor: [ 
					'white', 
					"red",
					"blue",
					"green", 
					"brown", 
					"purple", 
					"yellow", 
					"black", 
					"pink", 
					"teal" 
				],
        	    borderColor: 'black',
        	    borderWidth: 3,
        	    data: y
        	} ]
    	}
    }
  

    return (
        <Container>
        	<div>

                <NavBar />  

                <div className = "tab">

                	<h1>
						<strong> Basic Search </strong>
					</h1>

           			<p> 
					   <strong> 
					   		{welcomeMsg} 
					    	{yearError != null ? <p> Error: {yearError} </p> : null} 
							{ countryError != null ? <p>Error: {countryError}</p> : null}
						</strong>
					</p>

                	<form className = "basicSearch"
                    	onSubmit=  {(event) => {
                        	event.preventDefault()
                        	getRankings()
                        }}
                    >

                	<label 
						className = "basicYearLabel" 
						htmlFor = "Year"><strong>Year:</strong></label>

                	<input 
						type = "number" 
						min = "2015" 
						max = "2020" 
						id = "Year" 
						name = "Year" 
						value = { Year } 
						
						onChange={ (event) => {
                	    const { value } = event.target;
                	    if ( /[A-Za-z]/.test(value) ) {
                	        setYearError ("Year should not contain letters");
                	    } else {
                	    	setYearError(null);
                	    }

                	    setYear(value) 
						}}
					></input>

                	<label htmlFor="Country">
						<strong> Country: </strong>
					</label>

                	<input 
						type="search" 
						id="Country" 
						name="Country" 
						value={Country} 
					
						onChange={(event) => {
                	    const { value } = event.target;
                	    if ( /[0-9]/.test(value) ) { 
                	    	setCountryError ("Country should not contain numbers");
                	    } else {
                	    	setCountryError(null);
                	    }

                	    setCountry(value)
						}} 

					></input>

                	<input 
						type="submit" 
						value="Search"
					></input>

            	</form>
            </div>   
        </div>
        <div className = "Home">
           
 
        	<div 
        		className = "ag-theme-alpine"
        		style = { {
        			height: "300px",
        			width: "600px"
        		} }
			>

           		<AgGridReact
        			className = "basicTable"
        			id = "basicTable"
        			columnDefs = {columns}
        			rowData = {rowData}
        			pagination = {true}
           		/>
       
            </div>
    	</div>

    	<div className = "HomeBarGraph">
    	<Bar
        	data= { chartData }
			options = { { 
            	title: {
            		display: true,
            		text: 'Top 25 Countries',
            		fontSize: 20
            	},
            	legend: {
            		display:true,
            		position:'right'
            	},
            	scales: {
            	    x: {  
            	    	offset:true,
            	    	max:50,
            	    	categoryPercentage: 1.0,
            	    	barPercentage: 1.0,
            	    	ticks: {
            	     		stepSize: 0.025
            	    	},
            		},
				
            	    y:{ 
						min:6.2,
            	    	max:7.8,
            	    	ticks: {
            	    		stepSize: 0.025
            	    	},
            	       offset:true
            	    } 
            	} 
          }}
        />
    </div>   

    </Container>
    )
        }
