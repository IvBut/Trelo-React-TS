import React, {useState} from "react";
import {AddItemButton} from "../styles";
import {NewItemForm} from "./NewItemForm";

interface IAddNewItemProps {
    dark?: boolean,
    toggleButtonText: string,
    onAdd: (text: string) => void
}


export const AddNewItem = (props: IAddNewItemProps) => {
    const [showForm, setShowForm] = useState(false);
    const {onAdd, toggleButtonText, dark} = props;

    if (showForm) {
        return (
            <NewItemForm onAdd={text => {
                onAdd(text);
                setShowForm(false);
            }}/>
        )
    }

    return (
        <AddItemButton
            onClick={() => setShowForm(true)}
            dark={dark}
        >
            {toggleButtonText}
        </AddItemButton>
    )
};