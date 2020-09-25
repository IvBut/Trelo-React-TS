import React,{createContext, useContext, useReducer} from "react";

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
    lists: Array<IList>
}

interface IAppStateContextProps {
    state: IAppState
}

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

export const AppStateProvider = ({children}: React.PropsWithChildren<{}>) => {
    return (
        <AppStateContext.Provider value={{state: appMockData}}>
            {children}
        </AppStateContext.Provider>
    )
};


export  const useAppState = () => {
    return useContext(AppStateContext);
};