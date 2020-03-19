import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";

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

	handleSaveButton = () => {
		this.setState({ open: "name" });
	};

	handleClose = () => {
		this.setState({ open: false });
	};

	handleNameSubmit = () => {
		this.setState({ open: "emoji" });
	};

	handleEmojiSubmit = emoji => {
		const paletteInfo = {
			paletteName: this.state.currentPaletteName,
			emoji: emoji.native
		};
		this.props.addPalette(paletteInfo);
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
					onClick={this.handleSaveButton}
				>
					Save
				</Button>
				<Dialog
					open={open === "emoji"}
					onClose={this.handleClose}
					aria-labelledby="emoji-picker-dialog"
				>
					<Picker set="google" onSelect={this.handleEmojiSubmit} />
				</Dialog>
				<Dialog
					open={open === "name"}
					onClose={this.handleClose}
					aria-labelledby="form-dialog-title"
				>
					<ValidatorForm onSubmit={this.handleNameSubmit}>
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
