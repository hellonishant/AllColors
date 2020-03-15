import React from "react";
import { withStyles } from "@material-ui/styles";

const styles = {
	PaletteFooter: {
		height: "5vh",
		display: "flex",
		justifyContent: "flex-end",
		alignItems: "center",
		fontWeight: "700"
	},
	Emoji: {
		fontSize: "2rem",
		margin: "1rem",
		fontWeight: "400"
	}
};
function Footer(props) {
	const { paletteName, emoji, classes } = props;
	return (
		<footer className={classes.PaletteFooter}>
			{paletteName}
			<span className={classes.emoji}>{emoji}</span>
		</footer>
	);
}

export default withStyles(styles)(Footer);
