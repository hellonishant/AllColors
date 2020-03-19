import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Palette from "./js/Palette";
import seedColors from "./seedColors";
import PaletteList from "./js/PaletteList";
import { generatePalette } from "./js/colorsHelper";
import SingleColorPalette from "./js/singleColorPalette";
import NewPaletteForm from "./js/newPaletteForm";

class App extends Component {
	constructor(props) {
		super(props);
		const palettes = JSON.parse(window.localStorage.getItem("palettes"));
		this.state = { palettes: palettes || seedColors };
	}

	findPalette = id => {
		return this.state.palettes.find(function(palette) {
			return palette.id === id;
		});
	};

	addNewPalette = newPalette => {
		this.setState(
			{ palettes: [...seedColors, newPalette] },
			this.syncToLocalStorage
		);
	};

	syncToLocalStorage = () => {
		window.localStorage.setItem(
			"palettes",
			JSON.stringify(this.state.palettes)
		);
	};

	deletePalette = id => {
		this.setState(
			st => ({ palettes: st.palettes.filter(palette => palette.id !== id) }),
			this.syncToLocalStorage
		);
	};

	render() {
		return (
			<Switch>
				<Route
					exact
					path="/palette/new"
					render={routerProps => (
						<NewPaletteForm
							addNewPalette={this.addNewPalette}
							palettes={this.state.palettes}
							{...routerProps}
						/>
					)}
				/>
				<Route
					exact
					path="/"
					render={routerProps => (
						<PaletteList
							palettes={this.state.palettes}
							deletePalette={this.deletePalette}
							{...routerProps}
						/>
					)}
				/>
				<Route
					exact
					path="/palette/:id"
					render={routerProps => (
						<Palette
							palette={generatePalette(
								this.findPalette(routerProps.match.params.id)
							)}
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
								this.findPalette(routerProps.match.params.paletteID)
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
}

export default App;
