import React, { Component } from "react";
import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Button from "@material-ui/core/Button";
import DraggableColorList from "./draggableColorList";
import arrayMove from "array-move";
import PaletteFormNavbar from "./paletteFormNavbar";
import ColorPicker from "./colorPicker";

const drawerWidth = 240;

const styles = theme => ({
	root: {
		display: "flex"
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
			paletteColors: this.props.palettes[0].colors
		};
		this._allColors = [];
	}

	componentDidMount() {
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

	addNewPaletteColor = newColor => {
		this.setState({
			paletteColors: [...this.state.paletteColors, newColor]
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
					<ColorPicker
						disabled={disabled}
						addNewPaletteColor={this.addNewPaletteColor}
						paletteColors={this.state.paletteColors}
					/>
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
