import React, { useState } from 'react';
import { AgGridReact } from "ag-grid-react";
import { Container } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import NavBar from '../components/NavBar';
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
  
export default function AdvancedSearch() {
    /* set the state of the variables country, limit,and year which will be the  search inputs,
    row data which is going to store all the information received from api and the variables that will store errors*/
    const [ Country, setCountry ] = useState('')
    const [ Year, setYear ] = useState('')
    const [ rowData, setRowData ] = useState([]);
    const [ yearError, setYearError ] = useState(null)
    const [ countryError, setCountryError ] = useState(null)
    const [ limit, setLimit ] = useState(10)
    const [ limitError, setLimitError ] = useState(null)
    const [ userMessage, setUserMessage ] = useState('Select by Year(required), Country and Number of results(default:10)')
    
    //Create arrays to further filter and manipulate the data received from the api
    //This way it can be used in the table as seperate arrays for the x and y axis
    let x = new Array
    let y = new Array 
    let arr1 = new Array
    let arr2 = new Array

    const columns = [
        { headerName: "Rank:", field: "rank", width: 100,resizable: true, sortable: true, filter: true },
        { headerName: "Country:", field: "country",width: 125, resizable: true, sortable: true, filter: true },
        { headerName: "Score:", field: "score", width: 125, resizable: true,sortable: true, filter: "agNumberColumnFilter" },
        { headerName: "Economy:", field: "economy", width: 125,resizable: true,sortable: true, filter: "agNumberColumnFilter" },
        { headerName: "Family:", field: "family", width: 125,resizable: true,sortable: true, filter: true },
        { headerName: "Health:", field: "health", width: 125, resizable: true,sortable: true, filter: true },
        { headerName: "Freedom:", field: "freedom", width: 125, resizable: true,sortable: true, filter: true },
        { headerName: "Generosity:", field: "generosity", width: 125, resizable: true,sortable: true, filter: true },
        { headerName: "Trust:", field: "trust", width: 125, resizable: true, sortable: true, filter: true },
        ]

    const token = localStorage.getItem( "token" );

    const headers = {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${ token }`
    }   
    //Go to the api when called and receive information. The query uses the variables updated state from the form input
    function getFactors()  {
        fetch(`http://131.181.190.87:3000/factors/${Year}?limit=${limit}&country=${Country}`, {headers})
            .then((res) => { if (res.ok) { return (res.json())     
            }   else {
                throw new Error('Network response was not ok')}})
            .then((rankings) => rankings.map((ranking) =>({
                    rank: ranking.rank,
                    country: ranking.country, 
                    score: ranking.score, 
                    economy: ranking.economy,
                    family: ranking.family,
                    health: ranking.health,
                    freedom: ranking.freedom,
                    generosity: ranking.generosity,
                    trust: ranking.trust
                  })
                )
            )
            .then(rankings => setRowData(rankings) ) 
            .catch(error => {console.log('There was a problem with your fetch operation', error.message)
                            setUserMessage ("Sorry you need to be a member to access the Member search, please login and try again")
                            }
            )
    }
            /* Using array methods to manipulate row data which has everything from the api that is for the table
            and manipulating it to get the array I  can use as an x and y axis*/ 
    for ( let i = 0; i <rowData.length ; i++ ) {
        x.push( rowData[i].country )
    }
    
    for ( let j = 0; j<10; j++ ){
        arr1.push( x[j] )
    }
    
    for ( let j = 0; j <rowData.length; j++ ) {
        y.push( rowData[j].score )
    }

    for (let i = 0; i<10; i++){
        arr2.push( y[i] )
    }
                //initalise the data going to the chart. It will use the two new arrays created above
                function chartData(props) {
                    return {
                        labels: arr1,
                        datasets: [ {
                            label: 'Top 10 Countries overall scores',
                            backgroundColor: [ 'white' , "red" , "blue", "green", "brown", "purple", "yellow", "black", "pink", "teal"],
                            borderColor: 'black',
                            borderWidth: 3,
                            data: arr2
                        } ]
                    }
                }
    return (
        
    <Container>
        
        <NavBar />
        <div>
        
            <div className = "Search-query">

                <h1> <strong> Member Search </strong> </h1>

                <p> 
                    <strong>
                        { userMessage }  
                        { yearError != null ? <p> Error: {yearError} </p> : null } 
                        { countryError != null ? <p> Error: {countryError } </p> : null } 
                        { limitError != null ? <p> Error: { limitError } </p> : null }
                    </strong>
                </p>  

                <div className = "tab">
                
                <form 
                    onSubmit=  
                        { (event) => {
                            event.preventDefault()
                            getFactors()
                        }}
                >

                <label htmlFor = "Year">
                    <strong> Year: </strong> 
                </label>

                <input  
                    required type = "number" 
                    min = "2016" 
                    max = "2020" 
                    id = "Year" 
                    name = "Year" 
                    value = { Year } 

                    onChange = { (event) => {
                        const { value } = event.target;
                        if ( /[A-Za-z]/.test( value ) ){
                            setYearError ("Year should not contain letters");
                        } else{
                            setYearError(null);
                        }
                            setYear(value)
                    }}
                >
                </input>

                <label htmlFor = "Country">
                    <strong> Country: </strong>
                </label>

                <input 
                    type="search" 
                    id="Country" 
                    name="Country" 
                    value={Country} 

                    onChange={ (event) => {
                        const { value } = event.target;
                        if ( /[0-9]/.test(value) ) {
                            setCountryError ("Country should not contain numbers");
                        } else {
                            setCountryError(null);
                        }
                            setCountry(value)
                    }} 
                >
                </input>

                <label htmlFor = "Limit">
                    <strong> Number of Results: </strong>
                </label>

                <input 
                    type = "search" 
                    id = "limit" 
                    name = "limit" 
                    value = {limit} 

                    onChange = { (event) => {
                        const { value } = event.target;
                        if ( /[a-zA-Z]/.test(value) ) {
                            setLimitError("Limit should not contain letters");
                        }else {
                            setLimitError(null);
                        }
                        setLimit(value)
                        }} 
                    >
                    </input>

                <input 
                    type = "submit" 
                    value="Search">
                </input>

            </form>

            </div>
                
            
        </div>

    <div className = "Home">

        <div 
            className = "ag-theme-alpine"
            style = {{
                height: "400px",
                width: "1100px"
            }}
        >
            <AgGridReact
                className = "AdvancedTable"
                columnDefs = { columns }
                rowData = { rowData }
                pagination = { true } 
            />
    
       </div>

    </div>

</div>

    <div className = "HomeBarGraph">

        <Bar
            data = { chartData }
            width = { 1100 }
            height = { 800 }
            options = {{ 
                title: {
                    display: true,
                    text: 'Top 25 Countries Overall Score',
                    fontSize: 20
                },
                legend: { 
                    display: true,
                    position: 'right'
                },
                scales: {                    
                    y: { 
                        min:7.20,
                        max:7.7,
                        ticks: {
                            stepSize: 0.025
                        },
                        offset: true
                    } 
                }  
            }}
        />
    </div>   
    </Container>
    )
}
