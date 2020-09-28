import React from 'react';
import {AppContainer} from './styles'
import {Column} from "./components/Column";
import {AddNewItem} from "./components/AddNewItem";
import {ActionTypes, useAppState} from "./AppStateContext";
import CustomDragLayer from "./components/CustomDragLayer";


function App() {
  const {state, dispatch} = useAppState();

  const handleAddList = (text: string) => {
    dispatch({payload: text, type: ActionTypes.ADD_LIST})
  };

  return (
        <AppContainer>
            <CustomDragLayer/>
            {
                state.lists.map((list,index) => {
                    return (
                        <Column id={list.id} text={list.text} index={index} key={list.id}/>
                    )
                })
            }
            <AddNewItem toggleButtonText={'+ Add another list'} onAdd={handleAddList}/>
        </AppContainer>
  );
}

export default App;
