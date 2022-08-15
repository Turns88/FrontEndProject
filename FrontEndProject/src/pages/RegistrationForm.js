import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { Container } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { Button } from 'reactstrap';
import NavBar from '../components/NavBar'
import '../App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function RegistrationForm() {

    const [ emailAddress, setEmailAddress ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ regoStatus, setRegoStatus ] = useState(false)
    const [ registrationMsg, setRegistrationMsg ] = useState("Please enter your details")
   
    const registrationData = {
        method: "POST",
        headers: { accept: "application/json","Content-Type": "application/json" },
        body: JSON.stringify({ email: `${ emailAddress }`, password: `${ password }` })          
    }

    function registerUser() {
        fetch( 'http://131.181.190.87:3000/user/register',registrationData )
        .then( res => res.json() )
        .then( res =>localStorage.setItem("token", res.token) )
        .then( setRegoStatus(true) )
        .catch( "error") 

//check for authentication and then redirect if successful
        if ( localStorage.token != null ) {
            setRegoStatus(true)
        } else { setRegoStatus(false) }

        if ( regoStatus === true ) { return <Redirect to= '/Login' />; 
        } else { setRegistrationMsg( `"Registration unsuccessful, UserName has allready been taken, please try again!"`)}    
        }

    return (   
        
        <Container>
            <div className="registrationForm">
                <NavBar />
                
                <h2>
                    <strong>{ registrationMsg }</strong>
                </h2>

                <p>
                    <strong>Registration provides access to Member Search</strong>
                </p>

                <form onSubmit = { (event) => {
                    event.preventDefault()
                    console.log( { emailAddress },{ password } )
                    registerUser()
                } } >

                <div className = "exp">

                    <label htmlFor = "emailAddress">Email Address:</label>

                    <input type = "text" 
                            id = "emailAddress" 
                            name = "emailAddress"
                            value = { emailAddress }
                            onChange = { (event) => 
                                setEmailAddress(event.target.value)
                            }
                    >
                    </input>

                    <label htmlFor = "Password">Password:</label>

                    <input 
                        type = "password" 
                        id = "password" 
                        name = "password"
                        value = { password }

                        onChange = { (event) => 
                            setPassword(event.target.value)
                        }
                    >
                    </input>

                    <input 
                        type = "submit" 
                        value = "Submit"
                    >
                    </input>
                    
                </div>

                </form>

                <p>
                    <strong>Allready a member? Click here to go straight to the login page</strong>
                </p>

                <Link to = "/Login">
                    <Button color ="primary" size="lg" >Login</Button>
                        
                </Link>
            </div> 
        </Container>                         
    )
}

