import React from "react";
import Palette from "./js/Palette";
import seedColors from "./seedColors";
import { generatePalette } from "./js/colorsHelper";
import "./App.css";

function App() {
	return (
		<div>
			<Palette {...seedColors[4]} />
		</div>
	);
}

export default App;
