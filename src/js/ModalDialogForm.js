import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

class ModalDialogForm extends Component {
	constructor(props) {
		super(props);
		this.state = { open: false, currentPaletteName: "" };
	}

	componentDidMount() {
		ValidatorForm.addValidationRule("isPaletteNameUnique", value =>
			this.props.palettes.every(
				({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
			)
		);
	}

	handleClickOpen = () => {
		this.setState({ open: true });
	};

	handleClose = () => {
		this.setState({ open: false });
	};

	handleFormChange = event => {
		this.setState({ [event.target.name]: event.target.value });
	};

	render() {
		const { open, currentPaletteName } = this.state;
		return (
			<div>
				<Button
					variant="contained"
					color="primary"
					onClick={this.handleClickOpen}
				>
					Save
				</Button>
				<Dialog
					open={open}
					onClose={this.handleClose}
					aria-labelledby="form-dialog-title"
				>
					<ValidatorForm
						onSubmit={() => this.props.addPalette(currentPaletteName)}
					>
						<DialogTitle id="form-dialog-title">Save Palette</DialogTitle>
						<DialogContent>
							<DialogContentText>
								Add your palette to the collection. Use a unique name.
							</DialogContentText>
							<TextValidator
								value={currentPaletteName}
								fullWidth
								label="Palette Name"
								name="currentPaletteName"
								onChange={this.handleFormChange}
								validators={["required", "isPaletteNameUnique"]}
								errorMessages={[
									"Enter a Palette Name",
									"Palette name is already taken"
								]}
							/>
						</DialogContent>
						<DialogActions>
							<Button onClick={this.handleClose} color="primary">
								Cancel
							</Button>
							<Button variant="contained" color="primary" type="submit">
								Save Palette
							</Button>
						</DialogActions>
					</ValidatorForm>
				</Dialog>
			</div>
		);
	}
}

export default ModalDialogForm;
