import React, { Component } from "react";
import ColorBox from "./colorBox";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import { withStyles } from "@material-ui/styles";

const styles = {
	Palette: {
		height: "100vh",
		display: "flex",
		flexDirection: "column",
		overflow: "hidden"
	},
	PaletteColors: {
		height: "90%"
	},
	GoBack: {
		width: "20%",
		height: "50%",
		margin: "0 auto",
		display: "inline-block",
		cursor: "pointer",
		position: "relative",
		marginBottom: "-0.5rem",
		textTransform: "uppercase",
		backgroundColor: "black"
	},
	BackButton: {
		position: "absolute",
		width: "100px",
		height: "30px",
		top: "50%",
		left: "50%",
		marginTop: "-15px",
		marginLeft: "-50px",
		border: "none",
		outline: "none",
		borderRadius: "2px",
		backgroundColor: "rgba(255, 255, 255, 0.3)",
		cursor: "pointer",
		textTransform: "uppercase",
		lineHeight: "30px",
		opacity: "1",
		textAlign: "center",
		color: "white",
		textDecoration: "none"
	}
};

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
		const { palette, colorID, classes } = this.props;
		const colorBoxes = this._shades.map(shade => (
			<ColorBox
				background={shade.hex}
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
