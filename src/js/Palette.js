import React, { Component } from "react";
import ColorBox from "./colorBox";
import "../css/Palette.css";

class Palette extends Component {
	render() {
		const boxes = this.props.colors.map(color => (
			<ColorBox background={color.color} name={color.name} />
		));
		return (
			<div className="Palette">
				<div className="Palette-colors">{boxes}</div>
			</div>
		);
	}
}

export default Palette;
