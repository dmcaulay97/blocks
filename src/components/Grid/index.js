import './index.scss';
import Block from '../Block'

const Grid = () => {

    const getRandomInt = (max) => {
        return Math.floor(Math.random() * max);
    }
    const rainbowArray = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];

    const colorArray = []
    for (let i = 0; i < rainbowArray.length; i++) {
        colorArray.push({ color: rainbowArray[i], position: i })
    }

    const numberArrayGenerator = (num) => {
        const array = []
        for (let i = 0; i < num; i++) {
            array.push(i)
        }
        return array
    }

    const amountOfBlocks = numberArrayGenerator(7)

    const swap = (pos1, pos2) => {
        const element1 = document.querySelector(`div[finalpos = "${pos1}"]`)
        const element2 = document.querySelector(`div[finalpos = "${pos2}"]`)

        const copy = element2.cloneNode(true)
        element1.parentNode.insertBefore(copy, element1);
        element2.parentNode.insertBefore(element1, element2);
        element2.parentNode.replaceChild(element2, copy);

    }

    const bubbleSort = () => {
        const blocks = document.getElementsByClassName('block')
        let done = true
        for (let i = 0; i < blocks.length - 1; i++) {
            if (blocks[i].getAttribute('finalpos') > blocks[i + 1].getAttribute('finalpos')) {
                swap(blocks[i].getAttribute('finalpos'), blocks[i + 1].getAttribute('finalpos'))

                done = false;
            }

        }
        if (!done) {
            return bubbleSort()
        }
    }

    return (
        <div className="container">
            {
                amountOfBlocks.map((num, index) => {
                    const rand = getRandomInt(colorArray.length);
                    const color = colorArray.splice(rand, 1)[0]
                    console.log(color['color'])

                    return <Block key={index} initialPos={num} initialColor={color['color']} finalPos={color['position']} />
                })
            }
            <div className='swap' onClick={bubbleSort}>
                SWAP
            </div>
        </div>
    )
};

export default Grid