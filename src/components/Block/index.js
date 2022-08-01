import './index.scss'
import { useState } from 'react';

const Block = () => {

    const getRandomInt = (max) => {
        return Math.floor(Math.random() * max);
    }

    const [color, setColor] = useState('red')

    const rainbow = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];


    return (
        <div className='block' style={{ backgroundColor: color }} onClick={() => {
            setColor(rainbow[getRandomInt(7)])
        }}>

        </div>
    )
}

export default Block;