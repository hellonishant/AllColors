import React, { PureComponent } from "react";
import { withStyles } from "@material-ui/styles";
import styles from "../styles/MiniPaletteStyles";
import DeleteIcon from "@material-ui/icons/Delete";

class MiniPalette extends PureComponent {
	deletePalette = event => {
		event.stopPropagation();
		this.props.dialogOpen(this.props.id);
	};
	render() {
		const { paletteName, emoji, colors, classes, id, handleClick } = this.props;
		console.log("rendering ", paletteName);
		const miniColors = colors.map(color => (
			<div
				className={classes.miniColors}
				style={{ backgroundColor: color.color }}
				key={color.color}
			></div>
		));
		return (
			<div className={classes.root} onClick={() => handleClick(id)}>
				<div className={classes.IconContainer} onClick={this.deletePalette}>
					<DeleteIcon />
				</div>
				<div className={classes.colors}>{miniColors}</div>
				<h5 className={classes.title}>
					{paletteName} <span className={classes.emoji}>{emoji}</span>
				</h5>
			</div>
		);
	}
}

export default withStyles(styles)(MiniPalette);
