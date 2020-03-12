import React, { Component } from "react";
import "../css/colorBox.css";

class ColorBox extends Component {
	render() {
		return (
			<div
				className="ColorBox"
				style={{ backgroundColor: this.props.background }}
			>
				<div className="box-content">
					<button className="Copy-button">Copy</button>
				</div>
				<div className="ColorBox-name">
					<span>{this.props.name}</span>
				</div>
				<span className="ColorBox-more">More</span>
			</div>
		);
	}
}

export default ColorBox;
