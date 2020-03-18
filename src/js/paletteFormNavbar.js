import React, { Component } from "react";
import clsx from "clsx";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Button from "@material-ui/core/Button";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

class paletteFormNavbar extends Component {
	constructor(props) {
		super(props);
		this.state = { currentPaletteName: "" };
	}

	componentDidMount() {
		ValidatorForm.addValidationRule("isPaletteNameUnique", value =>
			this.props.palettes.every(
				({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
			)
		);
	}

	handleChange = event => {
		this.setState({ [event.target.name]: event.target.value });
	};

	render() {
		const { classes, handleDrawerOpen, addPalette, open } = this.props;
		return (
			<div>
				<CssBaseline />
				<AppBar
					position="fixed"
					color="default"
					className={clsx(classes.appBar, {
						[classes.appBarShift]: open
					})}
				>
					<Toolbar>
						<IconButton
							color="inherit"
							aria-label="open drawer"
							onClick={handleDrawerOpen}
							edge="start"
							className={clsx(classes.menuButton, open && classes.hide)}
						>
							<MenuIcon />
						</IconButton>
						<Typography variant="h6" noWrap>
							Persistent drawer
						</Typography>
						<ValidatorForm
							onSubmit={() => addPalette(this.state.currentPaletteName)}
						>
							<TextValidator
								value={this.state.currentPaletteName}
								label="Palette Name"
								name="currentPaletteName"
								onChange={this.handleChange}
								validators={["required", "isPaletteNameUnique"]}
								errorMessages={[
									"Enter a Palette Name",
									"Palette name is already taken"
								]}
							/>
							<Button variant="contained" color="primary" type="submit">
								Add New Palette
							</Button>
						</ValidatorForm>
					</Toolbar>
				</AppBar>
			</div>
		);
	}
}

export default paletteFormNavbar;
