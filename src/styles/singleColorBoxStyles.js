import down from "../scalingHelper";
export default {
	Palette: {
		height: "100vh",
		display: "flex",
		flexDirection: "column"
	},
	PaletteColors: {
		height: "90%"
	},
	GoBack: {
		width: "20%",
		height: "50%",
		margin: "0 auto",
		display: "inline-block",
		cursor: "pointer",
		position: "relative",
		marginBottom: "-0.5rem",
		textTransform: "uppercase",
		backgroundColor: "#000",
		[down("xs")]: {
			width: "100%",
			height: "20%"
		},
		[down("sm")]: {
			width: "50%"
		}
	},

	BackButton: {
		position: "absolute",
		width: "100px",
		height: "30px",
		top: "50%",
		left: "50%",
		marginTop: "-15px",
		marginLeft: "-50px",
		border: "none",
		outline: "none",
		borderRadius: "2px",
		backgroundColor: "rgba(255, 255, 255, 0.3)",
		cursor: "pointer",
		textTransform: "uppercase",
		lineHeight: "30px",
		opacity: "1",
		textAlign: "center",
		color: "#eee",
		textDecoration: "none"
	}
};
