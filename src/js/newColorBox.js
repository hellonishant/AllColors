import React from "react";
import { withStyles } from "@material-ui/styles";

const styles = {
	root: {
		width: "20%",
		height: "25%",
		margin: "0 auto",
		display: "inline-block",
		cursor: "pointer",
		position: "relative",
		marginBottom: "-0.5rem",
		textTransform: "uppercase",
		backgroundColor: props => props.background.color
	}
};

function NewColorBox(props) {
	const { classes, background } = props;
	return (
		<div className={classes.root}>
			<span className={classes.colorName}>{background.name}</span>
		</div>
	);
}

export default withStyles(styles)(NewColorBox);
