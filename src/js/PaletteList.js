import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import MiniPalette from "./MiniPalette";
import { Link } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import DialogBox from "./DialogBox";
import styles from "../styles/paletteListStyles";

class PaletteList extends Component {
	constructor(props) {
		super(props);
		this.state = { dialogBoxOpen: false, paletteId: "" };
	}

	handleClick = id => {
		this.props.history.push(`/palette/${id}`);
	};

	dialogOpen = id => {
		this.setState({ dialogBoxOpen: true, paletteId: id });
	};

	dialogClose = () => {
		this.setState({ dialogBoxOpen: false, paletteId: "" });
	};

	render() {
		const { palettes, classes, deletePalette } = this.props;
		return (
			<div className={classes.root}>
				<div className={classes.container}>
					<nav className={classes.navbar}>
						<h1>Ui Colors</h1>
						<Link to="/palette/new">Create Palette</Link>
					</nav>
					<TransitionGroup className={classes.palettes}>
						{palettes.map(oneColorPalette => (
							<CSSTransition
								classNames="fade"
								timeout={500}
								key={oneColorPalette.id}
							>
								<MiniPalette
									dialogOpen={this.dialogOpen}
									{...oneColorPalette}
									key={oneColorPalette.id}
									handleClick={() => this.handleClick(oneColorPalette.id)}
								/>
							</CSSTransition>
						))}
					</TransitionGroup>
				</div>
				<DialogBox
					open={this.state.dialogBoxOpen}
					handleClose={this.dialogClose}
					deletePalette={deletePalette}
					paletteId={this.state.paletteId}
				/>
			</div>
		);
	}
}

export default withStyles(styles)(PaletteList);
