import red from "@material-ui/core/colors/red";

const styles = {
	root: {
		backgroundColor: "white",
		borderRadius: "4px",
		cursor: "pointer",
		padding: "0.4rem",
		position: "relative",
		overflow: "hidden",
		"&:hover div": {
			opacity: 1
		}
	},
	title: {
		display: "flex",
		justifyContent: "space-between",
		fontFamily: "Roboto"
	},
	colors: {
		display: "block",
		backgroundColor: "grey",
		height: "150px",
		borderRadius: "4px",
		overflow: "hidden"
	},
	emoji: {
		marginLeft: "0.5rem",
		fontSize: "1.5rem"
	},
	miniColors: {
		width: "20%",
		height: "25%",
		display: "inline-block",
		position: "relative",
		marginBottom: "-7px"
	},
	IconContainer: {
		position: "absolute",
		right: 0,
		top: 0,
		height: "20%",
		width: "20%",
		zIndex: 20,
		color: "white",
		background: red[500],
		opacity: 0,
		transition: "all 0.3s ease-in-out",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		"& svg": {
			transform: "scale(1.2)"
		}
	}
};

export default styles;
