import React, { Component } from "react";
import ColorBox from "./colorBox";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import styles from "../styles/singleColorBoxStyles";
import { withStyles } from "@material-ui/styles";

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
		const { palette, classes } = this.props;
		const colorBoxes = this._shades.map(shade => (
			<ColorBox
				background={shade[this.state.formatType]}
				name={shade.name}
				fullColorPalette={false}
				key={shade.hex}
			/>
		));
		return (
			<div className={classes.Palette}>
				<Navbar
					handleFormatChange={this.handleFormatChange}
					notSingleColor={false}
				/>
				<div className={classes.PaletteColors}>
					{colorBoxes}
					<div className={classes.GoBack}>
						<Link className={classes.BackButton} to={`/palette/${palette.id}`}>
							Go Back
						</Link>
					</div>
				</div>
				<Footer paletteName={palette.paletteName} emoji={palette.emoji} />
			</div>
		);
	}
}

export default withStyles(styles)(SingleColorPalette);
