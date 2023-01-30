/** Import package */
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
/** Imoport file */
import LandingPage from "./components/LandingPage/LandingPage";
import DogsList from "./components/DogsList/DogsList";
import DetailCard from "./components/Details/DetailCard";
import Create from "./components/Create/Create";
import Put from "./components/Put/Put";
/** Import stule */
import css from "./App.module.css";

function App() {
	return (
		<div className={css.main}>
			<Router>
				<Switch>
					<Route exact path="/" component={LandingPage} />
					<Route exact path="/dogs" component={DogsList} />
					<Route exact path="/dogs/details/:id" component={DetailCard} />
					<Route exact path="/dogs/create" component={Create} />
					<Route exact path="/dogs/update/:id" component={Put} />
				</Switch>
			</Router>
		</div>
	);
}

export default App;
