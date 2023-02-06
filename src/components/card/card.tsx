import { useEffect, useState } from "react"

export interface CardProps {
    value: number
}

export default function Card({value}:  CardProps) {
    const [face, setFace] = useState('1');

    useEffect(() => {
        switch(value) {
            case 11:
                setFace('J');
                break
            case 12:
                setFace('Q');
                break;
            case 13:
                setFace('K');
                break
            default:
                setFace(value.toString());
        }
    }, [value])

    return (
        <div style={{
            display: 'inline-flex',
            width: '15vw',
            height: '15vw',
            border: '1px solid white',
            margin: 5,
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 30
        }}>
            {face}
        </div>
    )
}