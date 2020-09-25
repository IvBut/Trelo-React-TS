import React from "react";
import {ColumnContainer, ColumnTitle} from "../styles";
import {AddNewItem} from "./AddNewItem";

interface IColumnProps {
    text: string,
}


export const Column = ({
    text,
    children
}:  React.PropsWithChildren<IColumnProps>) => {

    return (
        <ColumnContainer>
            <ColumnTitle>{text}</ColumnTitle>
            {children}
            <AddNewItem toggleButtonText={'+ Add another task'} onAdd={text => console.log(text)} dark={true}/>
        </ColumnContainer>
    )
};