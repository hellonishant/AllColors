import React, { Component } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
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
	render() {
		const { background, name } = this.props;
		return (
			<CopyToClipboard text={background} onCopy={this.copyAnimationFunc}>
				<div className="ColorBox" style={{ backgroundColor: background }}>
					<div
						className={`Copy-animation ${this.state.copyAnimation &&
							"animate"}`}
						style={{ backgroundColor: background }}
					/>
					<div className={`Copy-text ${this.state.copyAnimation && "show"}`}>
						<h1>Copied!</h1>
						<span>{background}</span>
					</div>
					<button className="Copy-button">Copy</button>
					<div className="ColorBox-name">
						<span>{name}</span>
					</div>
					<span className="ColorBox-more">More</span>
				</div>
			</CopyToClipboard>
		);
	}
}

export default ColorBox;
