import './index.scss';
import Block from '../Block'
import space from '../../assets/space.jpg'
import smile from '../../assets/smile.jpg'
import moon from '../../assets/moon.jpg'
import { useState } from 'react';
import ColorThief from '../../../node_modules/colorthief/dist/color-thief.mjs'

const Grid = () => {
    let rainbowArray = ['rgb(255, 0, 0)', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];

    const createColorArray = (array) => {
        const cArray = []
        for (let i = 0; i < array.length; i++) {
            cArray.push({ color: array[i], position: i })
        }
        return cArray
    }


    const [blockColor, setBlockColor] = useState('green')
    const [count, setCount] = useState(1)
    const [colorArray, setColorArray] = useState(createColorArray(rainbowArray))

    //creating an array generator that creates an array for us to iterate on to create as many block as we want
    // const numberArrayGenerator = (num) => {
    //     const array = []
    //     for (let i = 0; i < num; i++) {
    //         array.push(i)
    //     }
    //     return array
    // }

    // //array containing css colors of the rainbow


    // let redArray = ['red', 'red', 'red', 'red', 'red', 'red', 'red'];

    // //reating array of objects, so that when colors are selected randomly for blocks, their final position can also be passed on




    // //function to generate random intager below a given maximum.
    const getRandomInt = (max) => {
        return Math.floor(Math.random() * max);
    }


    //A function that allows us to swap the position of two blocks in the dom
    const swap = (pos1, pos2) => {
        const element1 = document.querySelector(`div[finalpos = "${pos1}"]`)
        const element2 = document.querySelector(`div[finalpos = "${pos2}"]`)

        const copy = element2.cloneNode(true)
        element1.parentNode.insertBefore(copy, element1);
        element2.parentNode.insertBefore(element1, element2);
        element2.parentNode.replaceChild(element2, copy);

    }

    //bubble sort function for blocks
    const bubbleSort = () => {
        const blocks = document.getElementsByClassName('block')
        let done = true
        for (let i = 0; i < blocks.length - 1; i++) {

            if (parseInt(blocks[i].getAttribute('finalpos')) > parseInt(blocks[i + 1].getAttribute('finalpos'))) {
                swap(blocks[i].getAttribute('finalpos'), blocks[i + 1].getAttribute('finalpos'))

                done = false;
            }

        }
        if (!done) {
            return bubbleSort()
        }
    }

    // //Image slicing

    const pixelRounding = (height, width, pixel) => {
        const h = Math.floor(height / pixel) * pixel
        const w = Math.floor(width / pixel) * pixel
        return [h, w]
    }

    const determineAspectRatio = (height, width, pixel) => {
        const imageRatio = height / width;
        const screenHeight = window.innerHeight;
        const screenWidth = window.innerWidth;
        let containerHeight;
        let containerWidth;
        if (imageRatio < 1) {
            containerWidth = screenWidth;
            containerHeight = imageRatio * screenWidth;
            if (containerHeight < screenHeight) {
                //still need to acccount for if it is divisable by pixel size
                return pixelRounding(containerHeight, containerWidth, pixel)
            } else {
                containerHeight = containerHeight - (containerHeight - screenHeight);
                containerWidth = containerHeight / imageRatio;
                return pixelRounding(containerHeight, containerWidth, pixel)
            }
        } else if (imageRatio > 1) {
            containerHeight = screenHeight;
            containerWidth = screenHeight / imageRatio;
            if (containerWidth < screenWidth) {
                //still need to acccount for if it is divisable by pixel size
                return pixelRounding(containerHeight, containerWidth, pixel)
            } else {
                containerWidth = containerWidth - (containerWidth - screenWidth);
                containerHeight = imageRatio * containerWidth;
                return pixelRounding(containerHeight, containerWidth, pixel)
            }
        }

    }

    const resizeContainer = (height, width) => {
        const container = document.getElementsByClassName('container')[0];
        container.style.height = `${height}px`
        container.style.width = `${width}px`
    }


    // const appendImg = () => {
    //     const image = new Image();
    //     image.src = space;
    //     image.className = 'image'
    //     const container = document.getElementsByClassName('container')[0];
    //     container.append(image)
    // }
    const pixelSize = 100

    const cutImageUp = async () => {


        const widthOfOnePiece = pixelSize;
        const heightOfOnePiece = pixelSize;

        const image = new Image()
        image.src = moon;
        image.onload = function () {
            // const image = document.getElementsByClassName('image')[0];
            let containerHeight, containerWidth
            [containerHeight, containerWidth] = determineAspectRatio(this.height, this.width, pixelSize)

            resizeContainer(containerHeight, containerWidth);

            const numColsToCut = containerWidth / pixelSize;
            const numRowsToCut = containerHeight / pixelSize;

            const imagePieces = []
            for (let x = 0; x < numColsToCut; ++x) {
                for (let y = 0; y < numRowsToCut; ++y) {
                    const canvas = document.createElement('canvas');
                    canvas.width = widthOfOnePiece;
                    canvas.height = heightOfOnePiece;
                    const context = canvas.getContext('2d');
                    context.drawImage(image, x * widthOfOnePiece, y * heightOfOnePiece, widthOfOnePiece, heightOfOnePiece, 0, 0, canvas.width, canvas.height);
                    imagePieces.push(canvas.toDataURL())

                }
            }


            const container = document.getElementById('container')
            imagePieces.forEach((element, index) => {
                const img = new Image()
                img.src = element
                img.setAttribute('id', `img${index}`)
                container.append(img)
            })

            const colorThief = new ColorThief()
            const rgbArray = []



            const findColor = new Promise((resolve, rejecs) => {
                imagePieces.forEach((element, index, array) => {
                    const img = document.getElementById(`img${index}`)
                    if (img.complete) {
                        rgbArray.push(colorThief.getColor(img));
                        if (index === array.length - 1) resolve();
                    } else {
                        img.addEventListener('load', function () {
                            rgbArray.push(colorThief.getColor(img));
                            if (index === array.length - 1) resolve();
                        });
                    }
                })
            })

            findColor.then(() => {

                const colorArray = rgbArray.map((e, index) => {
                    return `rgb(${e[0]}, ${e[1]}, ${e[2]})`
                })

                console.log(colorArray)

                setColorArray(createColorArray(colorArray))
            })
        }
    }

    //Render blocks function
    const renderBlocks = (colorArray) => {
        for (let i = 0; i < colorArray.length; i++) {
            const color = colorArray.splice(getRandomInt(colorArray.length), 1)[0]

        }
    }

    const colorArrayCopy = [...colorArray]


    return (
        <div className="container" id='container'>
            {
                colorArray.map((element, index) => {
                    // const rand = getRandomInt(colorArrayCopy.length);
                    // const color = colorArrayCopy.splice(index, 1)[0]
                    const color = element;

                    return <Block key={index} initialColor={color.color} finalPos={color.position} pixel={pixelSize} />
                })
            }

            {/* <div className='button append' onClick={appendImg}>
                append
            </div> */}

            {/* <Block initialColor={blockColor} finalPos={0} /> */}

            <div className='button left' onClick={() => {
                cutImageUp()
            }}>
                Cut
            </div>

            <div className='button right' onClick={() => {
                bubbleSort()
            }}>
                Sort
            </div>
        </div >
    )
};

export default Grid