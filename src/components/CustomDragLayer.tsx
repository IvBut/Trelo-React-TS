import { useDragLayer, XYCoord, } from "react-dnd";
import {Column} from "./Column";
import {CustomDragLayerContainer} from "../styles";
import React from "react";


 const CustomDragLayer: React.FC = () => {
    const { isDragging, item, currentOffset } = useDragLayer(monitor => ({
        item: monitor.getItem(),
        currentOffset: monitor.getSourceClientOffset(),
        isDragging: monitor.isDragging()
    }));

    return isDragging ? (
        <CustomDragLayerContainer>
            <div  style={getItemStyles(currentOffset)}>
                <Column
                    id={item.id}
                    text={item.text}
                    index={item.index}
                    isPreview={true}
                />
            </div>
        </CustomDragLayerContainer>
    ) : null
};



function getItemStyles(currentOffset: XYCoord | null): React.CSSProperties {
    if (!currentOffset) {
        return {
            display: "none"
        }
    }
    const { x, y } = currentOffset;
    const transform = `translate(${x}px, ${y}px)`;
    return {
        transform,
        WebkitTransform: transform
    }
}


export default CustomDragLayer;