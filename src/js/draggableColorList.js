import React from "react";
import DraggableColorBox from "./draggableColorBoxes";
import { SortableContainer } from "react-sortable-hoc";

const draggableColorList = SortableContainer(
	({ paletteColors, deleteColor }) => {
		return (
			<div style={{ height: "100%" }}>
				{paletteColors.map((color, index) => (
					<DraggableColorBox
						index={index}
						key={color.name}
						backgroundColor={color}
						deleteColor={deleteColor}
					/>
				))}
			</div>
		);
	}
);
export default draggableColorList;
