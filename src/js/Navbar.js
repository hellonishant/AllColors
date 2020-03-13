import React, { Component } from "react";
import Slider from "rc-slider";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import "rc-slider/assets/index.css";
import "../css/Navbar.css";

class Navbar extends Component {
	constructor(props) {
		super();
		this.state = { format: "hex" };
	}

	handleChange = event => {
		this.setState({ format: event.target.value }, () =>
			this.props.handleFormatChange(this.state.format)
		);
	};
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
				<div className="select-container">
					<Select value={this.state.format} onChange={this.handleChange}>
						<MenuItem value="hex">hex #ffffff</MenuItem>
						<MenuItem value="rgb">rgb(255, 255, 255)</MenuItem>
						<MenuItem value="rgba">rgba(255, 255, 255, 1.0)</MenuItem>
					</Select>
				</div>
			</header>
		);
	}
}

export default Navbar;
