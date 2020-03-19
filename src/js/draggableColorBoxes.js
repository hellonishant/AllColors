import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import { withStyles } from "@material-ui/styles";
import IconButton from "@material-ui/core/IconButton";
import { SortableElement } from "react-sortable-hoc";
import styles from "../styles/draggableColorBoxesStyles.js";

const NewColorBox = SortableElement(props => {
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
});

export default withStyles(styles)(NewColorBox);
