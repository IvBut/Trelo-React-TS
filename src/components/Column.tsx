import React, {useRef} from "react";
import {ColumnContainer, ColumnTitle} from "../styles";
import {AddNewItem} from "./AddNewItem";
import {ActionTypes, useAppState} from "../AppStateContext";
import {Card} from "./Card";
import {useItemDrag} from "../utils/useItemDrag";
import {useDrop} from "react-dnd";
import {DragItem} from "../types";
import {isHidden} from "../utils/isHidden";

interface IColumnProps {
    text: string,
    index: number,
    id: string,
    isPreview?: boolean | undefined
}


export const Column = ({
    text,
    index,
    id,
    isPreview
}:  IColumnProps) => {

    const [,drop] = useDrop({
        accept: ['COLUMN','CARD'],
        hover(item: DragItem) {
            if (item.type === 'COLUMN') {
                const dragIndex = item.index;
                const hoverIndex = index;

                if (dragIndex === hoverIndex) return;
                dispatch({
                    type: ActionTypes.MOVE_LIST,
                    payload: {dragIndex, hoverIndex}
                });
                item.index = hoverIndex;
            }
            else {
                const dragIndex = item.index;
                const hoverIndex = 0;
                const sourceColumn = item.columnId;
                const targetColumn = id;
                if (sourceColumn === targetColumn) {
                    return
                }
                dispatch({
                    type: ActionTypes.MOVE_TASK,
                    payload: { dragIndex, hoverIndex, sourceColumn, targetColumn }
                });
                item.index = hoverIndex;
                item.columnId = targetColumn
            }

        }
    });


    const {state, dispatch} = useAppState();
    const  ref = useRef<HTMLDivElement>(null);
    const {drag} =  useItemDrag({type: 'COLUMN', id, index, text});

    drag(drop(ref));

    const handleAddTask = (text: string) => {
      dispatch({
          type: ActionTypes.ADD_TASK,
          payload: {
              text,
              taskId: id
          }
      })
    };

    return (
        <ColumnContainer ref={ref} isHidden={isHidden(isPreview,state.draggedItem, 'COLUMN', id)} isPreview={isPreview}>
            <ColumnTitle>{text}</ColumnTitle>
            {
                state.lists[index].tasks.map(task => (
                    <Card text={task.text} key={task.id} id={task.id} columnId={id} index={index}/>
                ))
            }
            <AddNewItem toggleButtonText={'+ Add another task'} onAdd={handleAddTask} dark={true}/>
        </ColumnContainer>
    )
};