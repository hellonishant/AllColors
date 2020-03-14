import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/styles";
import MiniPalette from "./MiniPalette";

const style = {
	root: {
		backgroundColor: "blue",
		height: "100%",
		display: "flex",
		alignItems: "flex-start",
		justifyContent: "center"
	},
	container: {
		width: "50%"
	},
	navbar: {
		display: "flex",
		justifyContent: "space-around",
		alignItems: "center",
		color: "white"
	},
	palettes: {
		boxSizing: "border-box",
		display: "grid",
		gridTemplateColumns: "repeat(3, 30%)",
		gridGap: "5%"
	}
};

class PaletteList extends Component {
	handleClick = id => {
		this.props.history.push(`/palette/${id}`);
	};
	render() {
		const { palettes, classes } = this.props;
		return (
			<div className={classes.root}>
				<div className={classes.container}>
					<nav className={classes.navbar}>
						<h1>Ui Colors</h1>
					</nav>
					<div className={classes.palettes}>
						{palettes.map(oneColorPalette => (
							<MiniPalette
								{...oneColorPalette}
								key={oneColorPalette.id}
								handleClick={() => this.handleClick(oneColorPalette.id)}
							/>
						))}
					</div>
				</div>
			</div>
		);
	}
}

export default withStyles(style)(PaletteList);
