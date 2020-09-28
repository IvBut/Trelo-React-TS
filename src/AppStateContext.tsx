import React, {createContext, Dispatch, useContext, useReducer} from "react";
import {v4 as uuid} from 'uuid'
import {findItemIndexById} from "./utils/findItemIndexById";
import {moveItem} from "./utils/moveItem";
import {DragItem} from "./types";

interface ITask {
    id: string,
    text: string
}

interface IList {
    id: string,
    text: string,
    tasks: Array<ITask>
}

export interface IAppState {
    lists: Array<IList>,
    draggedItem?: DragItem | undefined
}

interface IAppStateContextProps {
    state: IAppState,
    dispatch: Dispatch<Action>
}

export enum ActionTypes {
    ADD_LIST = 'ADD_LIST',
    ADD_TASK = 'ADD_TASK',
    MOVE_LIST = 'MOVE_LIST',
    SET_DRAGGED_ITEM = 'SET_DRAGGED_ITEM',
    DEFAULT = 'DEFAULT'
}

type AddListAction = {
    type: ActionTypes.ADD_LIST,
    payload: string
};

type AddTaskAction = {
    type: ActionTypes.ADD_TASK,
    payload: { text: string, taskId: string }
}

type MoveListAction = {
    type: ActionTypes.MOVE_LIST,
    payload: {dragIndex: number, hoverIndex: number}
}

type DraggedItemAction = {
    type: ActionTypes.SET_DRAGGED_ITEM,
    payload: DragItem | undefined
}

type Action = AddListAction | AddTaskAction | MoveListAction | DraggedItemAction


const appMockData: IAppState = {
    lists: [
        {
            id: '0',
            text: 'To do',
            tasks: [{ id: "c0", text: "Generate app scaffold" }]
        },
        {
            id: "1",
            text: "In Progress",
            tasks: [{ id: "c2", text: "Learn Typescript" }]
        },
        {
            id: "2",
            text: "Done",
            tasks: [{ id: "c3", text: "Begin to use static typing" }]
        }
    ]
};

const AppStateContext = createContext<IAppStateContextProps>({} as IAppStateContextProps);

const handlers : {[key: string] : (state: IAppState, action: Action) => IAppState} = {
    [ActionTypes.ADD_LIST] :
        (state: IAppState, action:Action ): IAppState => {
        let curAction = action as AddListAction;
            return {
                ...state,
                lists: [...state.lists, {id: uuid(), text: curAction.payload, tasks: []}]
            }
    },
    [ActionTypes.ADD_TASK] :
        (state: IAppState, action: Action): IAppState => {
            let curAction = action as AddTaskAction;
            const targetLaneIndex = findItemIndexById(state.lists, curAction.payload.taskId );

            state.lists[targetLaneIndex].tasks.push({
                id: uuid(),
                text: curAction.payload.text
            });
            return {
                ...state
            }
        },
    [ActionTypes.MOVE_LIST]:
        (state: IAppState, action: Action): IAppState => {
            const {dragIndex, hoverIndex} = (action as MoveListAction).payload;
            const listsToUpdate = moveItem([...state.lists],dragIndex, hoverIndex );
            return {
                ...state,
                lists: listsToUpdate
            }
        },
    [ActionTypes.SET_DRAGGED_ITEM]:
        (state: IAppState, action: Action):IAppState => {
            return {
                ...state,
                draggedItem: (action.payload) as DragItem
            }
        },
    [ActionTypes.DEFAULT]: (state: IAppState) => (state)
};

const appStateReducer = (state: IAppState, action: Action): IAppState => {
    const stateHandler = handlers[action.type] || handlers.DEFAULT;
    return  stateHandler(state,action);
};


export const AppStateProvider = ({children}: React.PropsWithChildren<{}>) => {
    const [state, dispatch] = useReducer(appStateReducer, appMockData);

    return (
        <AppStateContext.Provider value={{state, dispatch}}>
            {children}
        </AppStateContext.Provider>
    )
};


export  const useAppState = () => {
    return useContext(AppStateContext);
};