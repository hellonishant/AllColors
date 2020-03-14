import React from "react";
import { Route, Switch } from "react-router-dom";
import Palette from "./js/Palette";
import seedColors from "./seedColors";
import PaletteList from "./js/PaletteList";
import { generatePalette } from "./js/colorsHelper";
import "./App.css";
import SingleColorPalette from "./js/singleColorPalette";

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
				render={routerProps => (
					<PaletteList {...routerProps} palettes={seedColors} />
				)}
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
			<Route
				exact
				path="/palette/:paletteID/:colorID"
				render={routerProps => (
					<SingleColorPalette
						colorID={routerProps.match.params.colorID}
						palette={generatePalette(
							findPalette(routerProps.match.params.paletteID)
						)}
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
