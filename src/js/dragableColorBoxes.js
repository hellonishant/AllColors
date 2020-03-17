import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import { withStyles } from "@material-ui/styles";
import IconButton from "@material-ui/core/IconButton";

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
		backgroundColor: props => props.backgroundColor.color,
		"&:hover svg": {
			color: "white",
			transform: "scale(1.3)"
		}
	},
	boxContent: {
		position: "absolute",
		left: "0",
		bottom: "0",
		width: "100%",
		padding: "4px",
		fontSize: "1rem",
		fontFamily: "Poppins",
		letterSpacing: "4px",
		lineHeight: "1.5rem",
		color: "rgba(0, 0, 0, 0.5)",
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center"
	},
	deleteIcon: {
		transition: "all 0.3s ease-in-out"
	},
	IconButton: {
		padding: "0"
	}
};

function NewColorBox(props) {
	const { classes, backgroundColor, deleteColor } = props;
	return (
		<div className={classes.root}>
			<div className={classes.boxContent}>
				<span className={classes.colorName}>{backgroundColor.name}</span>
				<IconButton
					className={classes.IconButton}
					onClick={event => deleteColor(backgroundColor.name)}
				>
					<DeleteIcon className={classes.deleteIcon} />
				</IconButton>
			</div>
		</div>
	);
}

export default withStyles(styles)(NewColorBox);
