import {DragItem} from "../types";
import {ActionTypes, useAppState} from "../AppStateContext";
import {useDrag} from "react-dnd";
import {useEffect} from "react";
import {getEmptyImage} from "react-dnd-html5-backend";

export const useItemDrag = (item: DragItem) => {
    const {dispatch} = useAppState();
    const [, drag, preview] = useDrag({
        item,
        begin: () => {
            dispatch({
                payload: item,
                type: ActionTypes.SET_DRAGGED_ITEM
            })
        },
        end: () => dispatch({type: ActionTypes.SET_DRAGGED_ITEM, payload: undefined})
    });

    useEffect(() => {
        preview(getEmptyImage(), { captureDraggingState: true });
    }, [preview]);

    return {drag};
};