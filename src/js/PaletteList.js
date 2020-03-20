import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import MiniPalette from "./MiniPalette";
import { Link } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import styles from "../styles/paletteListStyles";

class PaletteList extends Component {
	handleClick = id => {
		this.props.history.push(`/palette/${id}`);
	};
	render() {
		const { palettes, classes } = this.props;
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
									handleDelete={this.props.deletePalette}
									{...oneColorPalette}
									key={oneColorPalette.id}
									handleClick={() => this.handleClick(oneColorPalette.id)}
								/>
							</CSSTransition>
						))}
					</TransitionGroup>
				</div>
			</div>
		);
	}
}

export default withStyles(styles)(PaletteList);
