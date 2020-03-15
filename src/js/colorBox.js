import React, { Component } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Link } from "react-router-dom";
import chroma from "chroma-js";
import "../css/colorBox.css";

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

	getColor = background => {
		let white = chroma.contrast("#eeeeee", background);
		let black = chroma.contrast(background, "#222222");
		if (white > black) return "#eee";
		return "#222";
	};

	render() {
		const { background, name, moreUrl, link } = this.props;
		let textColor = this.getColor(background);
		return (
			<CopyToClipboard text={background} onCopy={this.copyAnimationFunc}>
				<div className="ColorBox" style={{ backgroundColor: background }}>
					<div
						className={`Copy-animation ${this.state.copyAnimation &&
							"animate"}`}
						style={{ backgroundColor: background }}
					/>
					<div className={`Copy-text ${this.state.copyAnimation && "show"}`}>
						<h1 style={{ color: textColor }}>Copied!</h1>
						<span style={{ color: textColor }}>{background}</span>
					</div>
					<button className="Copy-button" style={{ color: textColor }}>
						Copy
					</button>
					<div className="ColorBox-name">
						<span style={{ color: textColor }}>{name}</span>
					</div>
					{link && (
						<Link to={moreUrl} onClick={event => event.stopPropagation()}>
							<span className="ColorBox-more" style={{ color: textColor }}>
								More
							</span>
						</Link>
					)}
				</div>
			</CopyToClipboard>
		);
	}
}

export default ColorBox;
