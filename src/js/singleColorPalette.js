import React, { Component } from "react";
import ColorBox from "./colorBox";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import Footer from "./Footer";

class SingleColorPalette extends Component {
	constructor(props) {
		super(props);
		this._shades = this.getShades(
			this.props.palette.colors,
			this.props.colorID
		);
		this.state = { formatType: "hex" };
	}

	getShades = (paletteColors, colorId) => {
		let shades = [];

		for (let level in paletteColors) {
			shades = shades.concat(
				paletteColors[level].filter(index => index.id === colorId)
			);
		}
		return shades.slice(1);
	};

	handleFormatChange = value => {
		this.setState({ formatType: value });
	};

	render() {
		const { palette, colorID } = this.props;
		const colorBoxes = this._shades.map(shade => (
			<ColorBox
				background={shade.hex}
				name={shade.name}
				link={false}
				key={shade.hex}
			/>
		));
		return (
			<div className="Palette">
				<Navbar
					handleFormatChange={this.handleFormatChange}
					notSingleColor={false}
				/>
				<div className="SingleColorPalette Palette-colors">
					{colorBoxes}
					<div className="go-back">
						<Link className="back-button" to={`/palette/${palette.id}`}>
							Go Back
						</Link>
					</div>
				</div>
				<Footer paletteName={palette.paletteName} emoji={palette.emoji} />
			</div>
		);
	}
}

export default SingleColorPalette;
