import React, {useState} from "react";
import {NewItemFormContainer, NewItemButton, NewItemInput} from "../styles";
import {useFocus} from "../utils/useFocus";

interface INewItemFormProps {
    onAdd: (text: string) => void
}


export const NewItemForm = ({onAdd} : INewItemFormProps) => {
    const [inpValue, setInpValue] = useState('');
    const inputRef = useFocus();

    return (
        <NewItemFormContainer>
            <NewItemInput
                onChange={e => setInpValue(e.target.value)}
                value={inpValue}
                ref={inputRef}
            />
            <NewItemButton onClick={() => onAdd(inpValue)}>Create</NewItemButton>
        </NewItemFormContainer>
    )
};