import React from "react";
import { Route, Switch } from "react-router-dom";
import Palette from "./js/Palette";
import seedColors from "./seedColors";
import PaletteList from "./js/PaletteList";
import { generatePalette } from "./js/colorsHelper";
import "./App.css";

function App() {
	function findPalette(id) {
		return seedColors.find(function(palette) {
			return palette.id === id;
		});
	}

	return (
		<Switch>
			<Route
				exact
				path="/"
				render={() => <PaletteList palettes={seedColors} />}
			/>
			<Route
				exact
				path="/palette/:id"
				render={routerProps => (
					<Palette
						palette={generatePalette(findPalette(routerProps.match.params.id))}
					/>
				)}
			/>
		</Switch>
		// { <div>
		// 	<Palette palette={generatePalette(seedColors[1])} />
		// </div> }
	);
}

export default App;
