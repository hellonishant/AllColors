import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import { withStyles } from "@material-ui/styles";
import { blue, red } from "@material-ui/core/colors";

const styles = {
	confirm: {
		backgroundColor: blue[100],
		color: blue[600]
	},
	close: {
		backgroundColor: red[100],
		color: red[600]
	}
};

class DialogBox extends Component {
	handleDelete = () => {
		this.props.deletePalette(this.props.paletteId);
		this.props.handleClose();
	};
	render() {
		const { open, classes, handleClose } = this.props;
		return (
			<div>
				<Dialog
					open={open}
					aria-labelledby="delete-palette-dialog"
					onClose={handleClose}
				>
					<DialogTitle id="delete-palette-dialog">
						Confirm Delete Palette
					</DialogTitle>
					<List>
						<ListItem button onClick={this.handleDelete}>
							<ListItemAvatar>
								<Avatar className={classes.confirm}>
									<CheckIcon />
								</Avatar>
							</ListItemAvatar>
							<ListItemText primary="Confirm" />
						</ListItem>
					</List>
					<List>
						<ListItem button onClick={handleClose}>
							<ListItemAvatar>
								<Avatar className={classes.close}>
									<CloseIcon />
								</Avatar>
							</ListItemAvatar>
							<ListItemText primary="Close" />
						</ListItem>
					</List>
				</Dialog>
			</div>
		);
	}
}

export default withStyles(styles)(DialogBox);
