import React, { Component } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "../css/Navbar.css";

class Navbar extends Component {
	render() {
		let { level, changeLevel } = this.props;
		return (
			<header className="Navbar">
				<div className="logo">
					<a href="#">UI Colors</a>
				</div>
				<div className="Slider">
					<Slider
						defaultValue={level}
						min={100}
						max={900}
						step={100}
						onChange={changeLevel}
					/>
				</div>
			</header>
		);
	}
}

export default Navbar;
