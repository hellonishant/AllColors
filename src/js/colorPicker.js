import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { ChromePicker } from "react-color";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

class colorPicker extends Component {
	constructor(props) {
		super(props);
		this.state = { currentColorName: "", currentColor: "cyan" };
	}
	componentDidMount() {
		ValidatorForm.addValidationRule("isColorNameUnique", value =>
			this.props.paletteColors.every(
				({ name }) => name.toLowerCase() !== value.toLowerCase()
			)
		);

		ValidatorForm.addValidationRule("isColorUnique", value =>
			this.props.paletteColors.every(
				({ color }) => color !== this.state.currentColor
			)
		);
	}

	handleChange = event => {
		this.setState({ [event.target.name]: event.target.value });
	};

	updateCurrentColor = (newColor, event) => {
		this.setState({ currentColor: newColor.hex });
	};

	handleAddNewPaletteColor = event => {
		const newColor = {
			color: this.state.currentColor,
			name: this.state.currentColorName
		};
		this.props.addNewPaletteColor(newColor);
		this.setState({ currentColorName: "" });
	};

	render() {
		const { disabled } = this.props;
		return (
			<div>
				<ChromePicker
					color={this.state.currentColor}
					onChange={this.updateCurrentColor}
				/>
				<ValidatorForm
					ref="form"
					onSubmit={this.handleAddNewPaletteColor}
					onError={errors => console.log(errors)}
				>
					<TextValidator
						label="Color Name"
						onChange={this.handleChange}
						name="currentColorName"
						value={this.state.currentColorName}
						validators={["required", "isColorUnique", "isColorNameUnique"]}
						errorMessages={[
							"Color Name is required!",
							"The color should be unique!",
							"The color name should be unique!"
						]}
					/>
					<Button
						variant="contained"
						color="default"
						style={{
							backgroundColor: disabled ? "grey" : this.state.currentColor
						}}
						type="submit"
						disabled={disabled}
					>
						{disabled ? "Palette is Full" : "Add Color"}
					</Button>
				</ValidatorForm>
			</div>
		);
	}
}
export default colorPicker;
