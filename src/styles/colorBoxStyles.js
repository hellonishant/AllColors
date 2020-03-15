import chroma from "chroma-js";
export default {
	DynamicText: {
		color: props => {
			let white = chroma.contrast("#eeeeee", props.background);
			let black = chroma.contrast(props.background, "#222222");
			if (white > black) return "#eee";
			return "#222";
		}
	},
	ColorBox: {
		width: "20%",
		height: props => (props.fullColorPalette ? "25%" : "50%"),
		margin: "0 auto",
		display: "inline-block",
		cursor: "pointer",
		position: "relative",
		marginBottom: "-0.5rem",
		textTransform: "uppercase",
		backgroundColor: props => props.background,
		"&:hover button": {
			opacity: "1",
			transition: "0.7s all ease"
		}
	},
	CopyButton: {
		position: "absolute",
		width: "100px",
		height: "30px",
		top: "50%",
		left: " 50%",
		marginTop: "-15px",
		marginLeft: "-50px",
		border: "none",
		outline: "none",
		borderRadius: "2px",
		backgroundColor: "rgba(255, 255, 255, 0.3)",
		cursor: "pointer",
		textTransform: "uppercase",
		lineHeight: "30px",
		opacity: "0",
		textAlign: "center",
		color: props => {
			let white = chroma.contrast("#eeeeee", props.background);
			let black = chroma.contrast(props.background, "#222222");
			if (white > black) return "#eee";
			return "#222";
		}
	},
	ColorBoxMore: {
		position: "absolute",
		right: "0",
		bottom: "0",
		height: "30px",
		width: "60px",
		lineHeight: "30px",
		textAlign: "center",
		backgroundColor: "rgba(255, 255, 255, 0.3)",
		color: props => {
			let white = chroma.contrast("#eeeeee", props.background);
			let black = chroma.contrast(props.background, "#222222");
			if (white > black) return "#eee";
			return "#222";
		}
	},
	ColorBoxName: {
		position: "absolute",
		left: "0",
		bottom: "0",
		padding: "10px",
		letterSpacing: "2px",
		fontSize: "1rem"
	},
	CopyText: {
		position: "fixed",
		left: "0",
		right: "0",
		bottom: "0",
		top: "0",
		opacity: "0",
		zIndex: "-1",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		fontSize: "3rem",
		transform: "scale(0.1)",
		color: "white",
		"& h1": {
			width: "100%",
			backgroundColor: "rgba(255, 255, 255, 0.3)",
			textAlign: "center",
			marginBottom: "0.2rem",
			padding: "0.6rem"
		},
		"& span": {
			fontSize: "2rem",
			fontWeight: "200",
			textTransform: "lowercase"
		}
	},
	ShowOverlay: {
		zIndex: "25",
		opacity: "1",
		transform: "scale(1)",
		transition: "0.4s all ease-in-out",
		transitionDelay: "0.1s"
	},
	CopyAnimation: {
		opacity: "0",
		position: "absolute",
		height: "100%",
		width: "100%",
		transform: "scale(0.1)",
		transition: "0.4s transform ease-in-out",
		zIndex: "-1"
	},
	Animate: {
		opacity: "1",
		transform: "scale(10)",
		zIndex: "10"
	}
};
