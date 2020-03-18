import React, { Component } from "react";
import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Button from "@material-ui/core/Button";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { Link } from "react-router-dom";

const drawerWidth = 240;

const styles = theme => ({
	root: {},
	appBar: {
		transition: theme.transitions.create(["margin", "width"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		}),
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between"
	},
	appBarShift: {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: drawerWidth,
		transition: theme.transitions.create(["margin", "width"], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen
		})
	},
	menuButton: {
		marginRight: theme.spacing(2)
	},
	navBtn: {}
});

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
			<div className={classes.root}>
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
							Create Palette
						</Typography>
					</Toolbar>
					<div className={classes.navBtn}>
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
						<Link to="/">
							<Button variant="contained" color="secondary">
								Go Back
							</Button>
						</Link>
					</div>
				</AppBar>
			</div>
		);
	}
}

export default withStyles(styles, { withTheme: true })(paletteFormNavbar);