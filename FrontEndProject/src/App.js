
import { BrowserRouter as Router,Switch, Route } from "react-router-dom";
import Home from './pages/Home'
import Hero from './pages/Hero'
import Login from './pages/Login'
import BasicSearch from './pages/BasicSearch'
import AdvancedSearch from './pages/AdvancedSearch'
import RegistrationForm from "./pages/RegistrationForm";
import Logout from './pages/Logout'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
	return (
  
    	<Router>

    		<div className = "App">

    	  		<Switch>

    	  			<Route path = "/Home">
    	  				<Home />
    	  			</Route>

    	  			<Route path = "/Search">
    	  				<BasicSearch/>
    	  			</Route>	

    	  			<Route path = "/Login">
    	  				<Login />
    	  			</Route>

    	  			<Route path ="/Logout">
    	  				<Logout />
    	  			</Route>

    	  			<Route path = "/Register">
    	  				<RegistrationForm />
    	  			</Route>

    	  			<Route path = "/AdvancedSearch">
    	  				<AdvancedSearch />
    	  			</Route>

    	  			<Route  path ="/">
    	  				<Hero />
    	  			</Route>

    	  		</Switch>

    	  	</div>

    	</Router>
  	);
}

export default App;
