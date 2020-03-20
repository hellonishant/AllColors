import React, { Component } from "react";
import clsx from "clsx";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/styles";
import styles from "../styles/colorBoxStyles";

class ColorBox extends Component {
	constructor(props) {
		super(props);
		this.state = { copyAnimation: false };
	}

	copyAnimationFunc = () => {
		this.setState({ copyAnimation: true }, () => {
			setTimeout(() => {
				this.setState({ copyAnimation: false });
			}, 1500);
		});
	};

	render() {
		const { background, name, moreUrl, fullColorPalette, classes } = this.props;
		return (
			<CopyToClipboard text={background} onCopy={this.copyAnimationFunc}>
				<div className={classes.ColorBox}>
					<div
						className={clsx(classes.CopyAnimation, {
							[classes.Animate]: this.state.copyAnimation
						})}
						style={{ backgroundColor: background }}
					/>
					<div
						className={clsx(classes.CopyText, {
							[classes.ShowOverlay]: this.state.copyAnimation
						})}
					>
						<h1 className={classes.DynamicText}>Copied!</h1>
						<span className={classes.DynamicText}>{background}</span>
					</div>
					<button className={classes.CopyButton}>Copy</button>
					<div className={classes.ColorBoxName}>
						<span className={classes.DynamicText}>{name}</span>
					</div>
					{fullColorPalette && (
						<Link to={moreUrl} onClick={event => event.stopPropagation()}>
							<span className={classes.ColorBoxMore}>More</span>
						</Link>
					)}
				</div>
			</CopyToClipboard>
		);
	}
}

export default withStyles(styles)(ColorBox);
