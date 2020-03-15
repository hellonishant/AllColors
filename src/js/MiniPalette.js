import React from "react";
import { withStyles } from "@material-ui/styles";

const styles = {
	root: {
		backgroundColor: "white",
		borderRadius: "4px",
		cursor: "pointer",
		padding: "0.4rem"
	},
	title: {
		display: "flex",
		justifyContent: "space-between",
		fontFamily: "Nunito"
	},
	colors: {
		display: "block",
		backgroundColor: "grey",
		height: "150px",
		borderRadius: "4px",
		overflow: "hidden"
	},
	emoji: {
		marginLeft: "0.5rem",
		fontSize: "1.5rem"
	},
	miniColors: {
		width: "20%",
		height: "25%",
		display: "inline-block",
		position: "relative",
		marginBottom: "-7px"
	}
};

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
