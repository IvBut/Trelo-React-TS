import React, {useRef} from "react";
import {CardContainer} from "../styles"
import {useDrop} from "react-dnd";
import {CardDragItem} from "../types";
import {ActionTypes, useAppState} from "../AppStateContext";
import {Simulate} from "react-dom/test-utils";
import {useItemDrag} from "../utils/useItemDrag";



interface ICardProps {
    text: string,
    id: string,
    columnId: string,
    index: number
}

export const Card = ({text, id, columnId, index}:ICardProps) => {
    const {dispatch} = useAppState();

    const [,drop] = useDrop({
       accept: 'CARD',
       hover(item: CardDragItem) {
           if (item.id === id) return;

          const dragIndex = item.index;
          const hoverIndex = index;
          const sourceColumn = item.columnId;
          const targetColumn = columnId;

          dispatch({type: ActionTypes.MOVE_TASK, payload: {dragIndex,hoverIndex,sourceColumn,targetColumn}})
       }
    });

    const  ref = useRef<HTMLDivElement>(null);
    const {drag} =  useItemDrag({type: 'CARD', id, index, text, columnId});
    drag(drop(ref));

    return (
        <CardContainer ref={ref} >
            {text}
        </CardContainer>
    )
};