const styles = {
	root: {
		width: "20%",
		height: "25%",
		margin: "0 auto",
		display: "inline-block",
		cursor: "pointer",
		position: "relative",
		marginBottom: "-0.5rem",
		textTransform: "uppercase",
		backgroundColor: props => props.backgroundColor.color,
		"&:hover svg": {
			color: "white",
			transform: "scale(1.3)"
		}
	},
	boxContent: {
		position: "absolute",
		left: "0",
		bottom: "0",
		width: "100%",
		padding: "4px",
		fontSize: "1rem",
		fontFamily: "Poppins",
		letterSpacing: "4px",
		lineHeight: "1.5rem",
		color: "rgba(0, 0, 0, 0.5)",
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center"
	},
	deleteIcon: {
		transition: "all 0.3s ease-in-out"
	},
	IconButton: {
		padding: "0"
	}
};

export default styles;
