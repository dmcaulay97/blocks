import './index.scss'
import { useState } from 'react';

const Block = (props) => {

    const getRandomInt = (max) => {
        return Math.floor(Math.random() * max);
    }
    const rainbow = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];

    // const [color, setColor] = useState(props.initialColor) //change bak to props.initialColor


    return (
        <div className='block' finalpos={props.finalPos} style={{
            backgroundColor: props.initialColor,
            height: props.pixel,
            width: props.pixel,
            minHeight: props.pixel,
            minWidth: props.pixel,
        }}>

        </div>
    )
}

export default Block;