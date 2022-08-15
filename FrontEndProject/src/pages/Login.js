import React from 'react'
import NavBar from '../components/NavBar'
import { useState } from 'react';
import { Container } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { Link } from "react-router-dom";
import { Button } from 'reactstrap';

export default function Login(props) {

    const [ emailAddress, setemailAddress ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ loginStatus, setLoginStatus ] = useState(false)
    const [ welcomeMsg, setWelcomeMsg ]  = useState("Login to continue")

    const registrationData = {
        method: "POST",
        headers: { accept: "application/json","Content-Type": "application/json" },
        body: JSON.stringify( {email: `${ emailAddress }`, password: `${ password }` } )
    }          

    //authenticate the user and prompt the user if the details are wrong to try again
    function loginUser() {

        fetch('http://131.181.190.87:3000/user/login',registrationData)
        .then( res => res.json() ) 
        .then( res => localStorage.setItem("token", res.token) )           
        .then( setLoginStatus(true) )
        .catch( setWelcomeMsg("Incorrect Login Details, please try again") )
    }
//redirect them if successful to the member search
        if ( loginStatus === true) {
            return <Redirect to= "/AdvancedSearch"/>
        }
   
    return (

        <Container>

            <NavBar />

            <div className = "Login-form">
        
                <h2>
                <strong> { welcomeMsg } </strong> 
                </h2>
                <p>
                    <strong>
                    By Logging in you gain access to the Member's
                    Search which provides a wonderful amount of detail
                     </strong>
                </p>

                <form 
                    onSubmit = {(event) => {
                        event.preventDefault();
                        loginUser()      
                    } }

                >

                    <label htmlFor = "emailAddress">Email Address:</label>
                    <input 
                        id = "emailAddress" 
                        name = "emailAddress" 
                        type = "email" 
                        value = {emailAddress} 

                        onChange = {(event) => {
                            setemailAddress(event.target.value)
                        } } 
                    />
                    <label htmlFor = "Password">Password:</label>

                    <input  id = "password" 
                            name = "password" 
                            type = "password" 
                            value = {password}
                            onChange = {(event) => {
                                setPassword(event.target.value)
                            } }
                    />     

                    <button type = "submit" >Submit</button>

                </form>

                <p>
                    <strong>Not a member yet? No worries! Click here to register!</strong>
                </p>

                <Link to="/Register">
                    <Button color="primary" size="lg" >Register</Button>
                </Link>

            </div>

        </Container>  
    )
}
