import React from 'react';
import {AppContainer} from './styles'
import {Column} from "./components/Column";
import {Card} from "./components/Card";
import {AddNewItem} from "./components/AddNewItem";
import {useAppState} from "./AppStateContext";


function App() {
  const {state} = useAppState();


  return (
        <AppContainer>
            {
                state.lists.map((list,index) => {
                    return (
                        <Column text={list.text} key={}>
                            <Card text="Generate app scaffold" />
                        </Column>
                    )
                })
            }
            <AddNewItem toggleButtonText={'+ Add another list'} onAdd={(text => console.log(text))}/>
        </AppContainer>
  );
}

export default App;
