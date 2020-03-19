import React from "react";
import { withStyles } from "@material-ui/styles";
import styles from "../styles/MiniPaletteStyles";

function MiniPalette(props) {
	const { paletteName, emoji, colors, classes } = props;
	const miniColors = colors.map(color => (
		<div
			className={classes.miniColors}
			style={{ backgroundColor: color.color }}
			key={color.color}
		></div>
	));
	return (
		<div className={classes.root} onClick={props.handleClick}>
			<div className={classes.colors}>{miniColors}</div>
			<h5 className={classes.title}>
				{paletteName} <span className={classes.emoji}>{emoji}</span>
			</h5>
		</div>
	);
}

export default withStyles(styles)(MiniPalette);
