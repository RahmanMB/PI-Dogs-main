/** Import package */
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
/** Imoport file  */
import LandingPage from "./components/LandingPage/LandingPage";
import Main from "./Main";
/** Import stule  */
import css from "./App.module.css";

function App() {
	return (
		<div className={css.main}>
			<Router>
				<Switch>
					<Route exact path="/" component={LandingPage} />
					<Route path="/" component={Main} />
				</Switch>
			</Router>
		</div>
	);
}

export default App;
