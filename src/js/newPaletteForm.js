import React, { Component } from "react";
import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Button from "@material-ui/core/Button";
import { ChromePicker } from "react-color";
import DraggableColorList from "./draggableColorList";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { arrayMove } from "react-sortable-hoc";

const drawerWidth = 240;

const styles = theme => ({
	root: {
		display: "flex"
	},
	appBar: {
		transition: theme.transitions.create(["margin", "width"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		})
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
	hide: {
		display: "none"
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0
	},
	drawerPaper: {
		width: drawerWidth
	},
	drawerHeader: {
		display: "flex",
		alignItems: "center",
		padding: theme.spacing(0, 1),
		...theme.mixins.toolbar,
		justifyContent: "flex-end"
	},
	content: {
		flexGrow: 1,
		height: `calc(100vh - 64px)`,
		padding: theme.spacing(3),
		transition: theme.transitions.create("margin", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		}),
		marginLeft: -drawerWidth
	},
	contentShift: {
		transition: theme.transitions.create("margin", {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen
		}),
		marginLeft: 0
	}
});

class NewPaletteForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false,
			currentColor: "#eee",
			currentColorName: "",
			currentPaletteName: "",
			paletteColors: [{ color: "blue", name: "blue" }]
		};
	}

	componentDidMount() {
		ValidatorForm.addValidationRule("isColorNameUnique", value =>
			this.state.paletteColors.every(
				({ name }) => name.toLowerCase() !== value.toLowerCase()
			)
		);

		ValidatorForm.addValidationRule("isColorUnique", value =>
			this.state.paletteColors.every(
				({ color }) => color !== this.state.currentColor
			)
		);
		ValidatorForm.addValidationRule("isPaletteNameUnique", value =>
			this.props.palettes.every(
				({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
			)
		);
	}

	handleDrawerOpen = () => {
		this.setState({ open: true });
	};

	handleDrawerClose = () => {
		this.setState({ open: false });
	};

	handleChange = event => {
		this.setState({ [event.target.name]: event.target.value });
	};
	updateCurrentColor = (newColor, event) => {
		this.setState({ currentColor: newColor.hex });
	};

	addNewPaletteColor = () => {
		const color = {
			color: this.state.currentColor,
			name: this.state.currentColorName
		};
		this.setState({
			paletteColors: [...this.state.paletteColors, color],
			currentColorName: ""
		});
	};

	addPalette = () => {
		let newName = "New Palette Name";
		let newPalette = {
			paletteName: newName,
			id: newName.toLowerCase().replace(/ /, "-"),
			emoji: "",
			colors: this.state.paletteColors
		};
		this.props.addNewPalette(newPalette);
		this.props.history.push("/");
	};

	deleteColor = colorName => {
		this.setState({
			paletteColors: this.state.paletteColors.filter(
				({ name }) => name !== colorName
			)
		});
	};

	onSortEnd = ({ oldIndex, newIndex }) => {
		this.setState(({ paletteColors }) => ({
			paletteColors: arrayMove(paletteColors, oldIndex, newIndex)
		}));
	};

	render() {
		const { classes } = this.props;
		let { open, paletteColors } = this.state;
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
							onClick={this.handleDrawerOpen}
							edge="start"
							className={clsx(classes.menuButton, open && classes.hide)}
						>
							<MenuIcon />
						</IconButton>
						<Typography variant="h6" noWrap>
							Persistent drawer
						</Typography>
						<ValidatorForm onSubmit={this.addPalette}>
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
				<Drawer
					className={classes.drawer}
					variant="persistent"
					anchor="left"
					open={open}
					classes={{
						paper: classes.drawerPaper
					}}
				>
					<div className={classes.drawerHeader}>
						<IconButton onClick={this.handleDrawerClose}>
							<ChevronLeftIcon />
						</IconButton>
					</div>
					<Divider />
					<Typography variant="h4">Color Picker</Typography>
					<div>
						<Button variant="contained" color="primary">
							Clear
						</Button>
						<Button variant="contained" color="secondary">
							Random
						</Button>
					</div>
					<ChromePicker
						color={this.state.currentColor}
						onChange={this.updateCurrentColor}
					/>
					<ValidatorForm
						ref="form"
						onSubmit={this.addNewPaletteColor}
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
							style={{ backgroundColor: this.state.currentColor }}
							type="submit"
						>
							Pick
						</Button>
					</ValidatorForm>
				</Drawer>
				<main
					className={clsx(classes.content, {
						[classes.contentShift]: open
					})}
				>
					<div className={classes.drawerHeader} />
					<DraggableColorList
						paletteColors={paletteColors}
						deleteColor={this.deleteColor}
						axis="xy"
						onSortEnd={this.onSortEnd}
					/>
				</main>
			</div>
		);
	}
}

export default withStyles(styles, { withTheme: true })(NewPaletteForm);
