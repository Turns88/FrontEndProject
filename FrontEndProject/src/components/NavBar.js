import { Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import React from 'react'

function NavBar() {
	return (
    	<div className= "navigationBar">

			<Navbar collapseOnSelect expand = "sm" bg = "dark" variant = "dark" >

  				<Navbar.Brand href = "/">The Happiness Project</Navbar.Brand>

  				<Navbar.Toggle aria-controls = "responsive-navbar-nav" />

  				<Navbar.Collapse id = "responsive-navbar-nav">

  				<Nav className = "mr-auto">

  					<LinkContainer to = "/Home">
  						<Nav.Link>Home</Nav.Link>
  				  	</LinkContainer>

  				  	<LinkContainer to = "/Search">
  				    	<Nav.Link>Basic Search</Nav.Link>
  				  	</LinkContainer>

  					<LinkContainer to = "/AdvancedSearch">
  						<Nav.Link >Member Search</Nav.Link>
  					</LinkContainer>

  				    <NavDropdown title = "Account" id = "collasible-nav-dropdown">

  				    	<LinkContainer to = "/Login">
  				      		<NavDropdown.Item>Login</NavDropdown.Item>
  				      	</LinkContainer>

  				      	<LinkContainer to = "/Logout">
  				      		<NavDropdown.Item>Logout</NavDropdown.Item>
  				      	</LinkContainer>

  				      	<LinkContainer to = "/Register">
  				      		<NavDropdown.Item>Register</NavDropdown.Item>
  				      	</LinkContainer>

  				    	<NavDropdown.Divider />

  				    </NavDropdown>

  				</Nav> 

  				</Navbar.Collapse>

			</Navbar>
		</div>

    )
}

export default NavBar

