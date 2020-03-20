import size from "../scalingHelper";
export default {
	"@global": {
		".fade-exit": {
			opacity: 1
		},
		".fade-exit-active": {
			opacity: 0,
			transition: "opacity 500ms ease-in-out"
		}
	},
	root: {
		backgroundColor: "blue",
		height: "100vh",
		display: "flex",
		alignItems: "flex-start",
		justifyContent: "center",
		overflow: "scroll"
	},
	container: {
		width: "50%",
		[size("lg")]: {
			width: "60%"
		},
		[size("sm")]: {
			width: "70%"
		},
		[size("xs")]: {
			width: "90%"
		}
	},
	navbar: {
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		color: "white",
		"& a": {
			color: "white",
			textDecoration: "none"
		}
	},
	palettes: {
		boxSizing: "border-box",
		display: "grid",
		gridTemplateColumns: "repeat(3, 30%)",
		gridGap: "5%",
		[size("xs")]: {}
	}
};
