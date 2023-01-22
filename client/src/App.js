/** Import package */
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
/** Imoport files*/
import LandingPage from "./components/LandingPage/LandingPage";
import DogsList from "./components/DogsList/DogsList";
import DetailCard from "./components/Details/DetailCard";
/** Import styles */
import "./App.css";

function App() {
	return (
		<div className="App">
			<Router>
				<Switch>
					<Route exact path="/" component={LandingPage} />
					<Route exact path="/dogs" component={DogsList} />
					<Route exact path="/dogs/:id" component={DetailCard} />
				</Switch>
			</Router>
		</div>
	);
}

export default App;
