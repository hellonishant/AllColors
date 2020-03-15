import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import MiniPalette from "./MiniPalette";
import { Link } from "react-router-dom";
import styles from "../styles/paletteListStyles";

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
						<Link to="/palette/new">Create Palette</Link>
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

export default withStyles(styles)(PaletteList);
