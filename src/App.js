import React from "react";
import Palette from "./js/Palette";
import seedColors from "./seedColors";
import { generatePalette } from "./js/colorsHelper";
import "./App.css";

function App() {
	return (
		<div>
			<Palette palette={generatePalette(seedColors[1])} />
		</div>
	);
}

export default App;
