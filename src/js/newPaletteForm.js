import React, { Component } from "react";
import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Button from "@material-ui/core/Button";
import { ChromePicker } from "react-color";
import DraggableColorList from "./draggableColorList";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { arrayMove } from "react-sortable-hoc";
import PaletteFormNavbar from "./paletteFormNavbar";

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
	static defaultProps = {
		maxColors: 20
	};
	constructor(props) {
		super(props);
		this.state = {
			open: false,
			currentColor: "#eee",
			currentColorName: "",
			paletteColors: this.props.palettes[0].colors
		};
		this._allColors = [];
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
		// Get an Array of all the colors from existing palettes.
		this._allColors = this.props.palettes
			.map(eachPalette => eachPalette.colors)
			.flat();
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

	addPalette = newName => {
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

	clearPalette = () => {
		this.setState({ paletteColors: [] });
	};

	addRandomColor = () => {
		let colorIndex = Math.floor(Math.random() * this._allColors.length);
		this.setState({
			paletteColors: [...this.state.paletteColors, this._allColors[colorIndex]]
		});
	};

	onSortEnd = ({ oldIndex, newIndex }) => {
		this.setState(({ paletteColors }) => ({
			paletteColors: arrayMove(paletteColors, oldIndex, newIndex)
		}));
	};

	render() {
		const { classes, maxColors, palettes } = this.props;
		let { open, paletteColors } = this.state;
		let disabled = paletteColors.length >= maxColors;
		return (
			<div className={classes.root}>
				<PaletteFormNavbar
					classes={classes}
					open={open}
					addPalette={this.addPalette}
					palettes={palettes}
					handleDrawerOpen={this.handleDrawerOpen}
				/>
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
						<Button
							variant="contained"
							color="primary"
							onClick={this.clearPalette}
						>
							Clear
						</Button>
						<Button
							variant="contained"
							color="secondary"
							onClick={this.addRandomColor}
							disabled={disabled}
						>
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
							style={{
								backgroundColor: disabled ? "grey" : this.state.currentColor
							}}
							type="submit"
							disabled={disabled}
						>
							{disabled ? "Palette is Full" : "Add Color"}
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
