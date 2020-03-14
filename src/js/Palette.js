import React, { Component } from "react";
import ColorBox from "./colorBox";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "../css/Palette.css";

class Palette extends Component {
	constructor(props) {
		super(props);
		this.state = { level: 500, formatType: "hex" };
	}
	changeLevel = level => {
		this.setState({ level });
	};

	handleFormatChange = value => {
		this.setState({ formatType: value });
	};

	render() {
		const { colors, emoji, paletteName, id } = this.props.palette;
		let { level, formatType } = this.state;
		const boxes = colors[level].map(color => (
			<ColorBox
				background={color[formatType]}
				name={color.name}
				key={color.id}
				moreUrl={`/palette/${id}/${color.id}`}
				link
			/>
		));
		return (
			<div className="Palette">
				<Navbar
					level={level}
					changeLevel={this.changeLevel}
					handleFormatChange={this.handleFormatChange}
					notSingleColor
				/>
				<div className="Palette-colors">{boxes}</div>
				<Footer paletteName={paletteName} emoji={emoji} />
			</div>
		);
	}
}

export default Palette;
