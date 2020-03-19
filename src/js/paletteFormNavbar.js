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
import { Link } from "react-router-dom";
import ModalDialogForm from "./ModalDialogForm";
import styles from "../styles/paletteFormNavbarStyles";

class paletteFormNavbar extends Component {
	constructor(props) {
		super(props);
		this.state = { currentPaletteName: "" };
	}

	render() {
		const {
			classes,
			handleDrawerOpen,
			addPalette,
			open,
			palettes
		} = this.props;

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
						<Link to="/">
							<Button
								variant="contained"
								color="secondary"
								className={classes.routeBtn}
							>
								Go Back
							</Button>
						</Link>
						<ModalDialogForm addPalette={addPalette} palettes={palettes} />
					</div>
				</AppBar>
			</div>
		);
	}
}

export default withStyles(styles, { withTheme: true })(paletteFormNavbar);
