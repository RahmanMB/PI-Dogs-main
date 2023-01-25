/** Import package */
import { Switch, Route } from "react-router-dom";
/** Imoport file  */
import DogsList from "./components/DogsList/DogsList";
import DetailCard from "./components/Details/DetailCard";
import Create from "./components/Create/Create";

function Main({ location }) {
	return (
		<div>
			<Switch>
				<Route exact path="/dogs" component={DogsList} />
				<Route exact path="/dogs/:id" component={DetailCard} />
				<Route exact path="/create" component={Create} />
			</Switch>
		</div>
	);
}

export default Main;
