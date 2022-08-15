

import React from 'react'
import NavBar from '../components/NavBar'
import { Redirect } from 'react-router-dom';
import { Link } from "react-router-dom";
import { Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';  

export default function Logout() {

    //check to see if there is value in the local storage which would mean
    // that there is an active token. If there is one then delete it
    //this will require the user to log in again

    let userMsg = 'Please click the button to logout'

    function clearToken() {
        if ( localStorage.token != null ) { 
            localStorage.removeItem('token')
            return <Redirect to= "/AdvancedSearch"/>
        } else { userMsg ="You allready have logged out"}
    }
    return (
        
        <div className = "container">

            <NavBar />

            <h1>Do you want to Logout?</h1>

            <p>{ userMsg }</p>

            <Link to="/">
                <Button 
                    color = "primary" 
                    size = "lg" 
                    onClick = { (event) => { clearToken() } } 
                    >Logout
                </Button>
                
            </Link>
            
        </div>
    )
}
