import React from 'react'
import { Link } from "react-router-dom";
import { Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';  

export default function hero() {
    return (
        <div className ="container1">

            <div className ="HeroHeader">

                <h1 className = "heroTitle">
					<strong>The <br></br>Happiness<br></br> Project</strong>
				</h1>

                <p className = "heroSubtitle">Happiness might be closer than you think!!<br></br></p>
            </div>

			<div className = "HeroBody">
           {/* empty body contains a photo that is called in App.css*/}
		   </div>

            <div className = "HeroFooterContent"> 

            	<Link to ="/Home"> 
					<Button color = "primary" size="lg" >Enter</Button>
				</Link>
            	<Link to ="/Login">
					<Button color="primary" size="lg" >Login</Button>
				</Link>
            	<Link to ="/Register">
				<Button color="primary" size="lg" >Register</Button>
				</Link>

            </div>

        </div>
                
    )
}
