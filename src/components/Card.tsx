import React from "react";
import {CardContainer} from "../styles"


interface ICardProps {
    text: string
}

export const Card = ({text}:ICardProps) => {
    return (
        <CardContainer>
            {text}
        </CardContainer>
    )
};