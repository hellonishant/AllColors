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
import styles from "../styles/newPaletteFormStyles";

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

	// handleChange = event => {
	// 	this.setState({ [event.target.name]: event.target.value });
	// };

	addNewPaletteColor = newColor => {
		this.setState({
			paletteColors: [...this.state.paletteColors, newColor]
		});
	};

	addPalette = emojiObject => {
		const { emoji, paletteName } = emojiObject;
		let newPalette = {
			paletteName: paletteName,
			id: paletteName.toLowerCase().replace(/ /, "-"),
			emoji: emoji,
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
					<div className={classes.container}>
						<Typography variant="h4">Color Picker</Typography>
						<div className={classes.buttons}>
							<Button
								variant="contained"
								color="primary"
								onClick={this.clearPalette}
								className={classes.button}
							>
								Clear
							</Button>
							<Button
								variant="contained"
								color="secondary"
								onClick={this.addRandomColor}
								disabled={disabled}
								className={classes.button}
							>
								Random
							</Button>
						</div>
						<ColorPicker
							disabled={disabled}
							addNewPaletteColor={this.addNewPaletteColor}
							paletteColors={this.state.paletteColors}
							style={{ width: "100%" }}
						/>
					</div>
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
