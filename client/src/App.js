/** Import package */
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
/** Imoport file  */
import LandingPage from "./components/LandingPage/LandingPage";
import Navbar from "./components/LandingPage/Navbar";
import DogsList from "./components/DogsList/DogsList";
import DetailCard from "./components/Details/DetailCard";
import Create from "./components/Create/Create";
/** Import stule  */
import "./App.css";

function App() {
	return (
		<div className="App">
			<Router>
				<Navbar />
				<Switch>
					<Route exact path="/" component={LandingPage} />
					<Route exact path="/dogs" component={DogsList} />
					<Route exact path="/dogs/:id" component={DetailCard} />
					<Route exact path="/create" component={Create} />
				</Switch>
			</Router>
		</div>
	);
}

export default App;
