import React, { Component } from "react";
import "../css/colorBox.css";

class ColorBox extends Component {
	render() {
		return (
			<div
				className="ColorBox"
				style={{ backgroundColor: this.props.background }}
			>
				<span className="ColorBox-name">{this.props.name}</span>
				<span className="ColorBox-more">More</span>
			</div>
		);
	}
}

export default ColorBox;
