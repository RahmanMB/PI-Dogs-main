/** Import package */
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
/** Imoport files*/
import LandingPage from "./components/LandingPage/LandingPage";
import DogsList from "./components/DogsList/DogsList";
/** Import styles */
import "./App.css";

function App() {
	return (
		<div className="App">
			<Router>
				<Switch>
					<Route exact path="/" component={LandingPage} />
					<Route path="/dogs" component={DogsList} />
				</Switch>
			</Router>
		</div>
	);
}

export default App;
