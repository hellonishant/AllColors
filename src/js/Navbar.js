import React, { Component } from "react";
import { Link } from "react-router-dom";
import Slider from "rc-slider";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import "rc-slider/assets/index.css";
import "../css/Navbar.css";

class Navbar extends Component {
	constructor(props) {
		super();
		this.state = { format: "hex", openSnackbar: false };
	}

	handleFormatChange = event => {
		this.setState({ format: event.target.value, openSnackbar: true }, () =>
			this.props.handleFormatChange(this.state.format)
		);
	};

	closeSnackbar = () => this.setState({ openSnackbar: false });
	render() {
		let { level, changeLevel } = this.props;
		return (
			<header className="Navbar">
				<div className="logo">
					<Link to="/">UI Colors</Link>
				</div>
				<div className="Slider">
					<Slider
						defaultValue={level}
						min={100}
						max={900}
						step={100}
						onChange={changeLevel}
					/>
				</div>
				<div className="select-container">
					<Select value={this.state.format} onChange={this.handleFormatChange}>
						<MenuItem value="hex">hex #ffffff</MenuItem>
						<MenuItem value="rgb">rgb(255, 255, 255)</MenuItem>
						<MenuItem value="rgba">rgba(255, 255, 255, 1.0)</MenuItem>
					</Select>
				</div>
				<Snackbar
					anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
					open={this.state.openSnackbar}
					autoHideDuration={2000}
					onClose={this.closeSnackbar}
					message={
						<span id="message-id">
							Format Changed to {this.state.format.toUpperCase()}
						</span>
					}
					ContentProps={{ "aria-describedby": "message-id" }}
					action={[
						<IconButton
							onClick={this.closeSnackbar}
							color="inherit"
							key="close"
							aria-label="close"
						>
							<CloseIcon />
						</IconButton>
					]}
				/>
			</header>
		);
	}
}

export default Navbar;
