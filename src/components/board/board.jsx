import React, { useState, useEffect } from 'react';
import './board.css';
import Slot from '../slot/slot.jsx'

const Board = (props) => {
    const [slots, setSlots] = useState([]);
    const WIDTH = 7;
    const HEIGHT = 6;

    const initialSlot = []

    for (let i = 0; i < HEIGHT; i++) {
        const arr = []
        for (let j = 0; j < WIDTH; j++) {
            arr.push({
                id: i * 6 + j,
                x: j,
                y: i,
                value: 0
            })
        }
        initialSlot.push(arr)
    }

    useEffect(() => {
        setSlots(initialSlot)
    }, [])

    const checkWin = (x, y, val) => {
        let h = 1;
        let v = 1;
        let d1 = 1;
        let d2 = 1;
        // horizontal

        let newX = x + 1;
        while (newX >= 0 && newX < WIDTH && slots[y][newX].value == val) {
            h++;
            if (h == 4) return true;
            newX++;
        }

        newX = x - 1
        while (newX >= 0 && newX < WIDTH && slots[y][newX].value == val) {
            h++;
            if (h == 4) return true;
            newX--;
        }

        // vertical

        let newY = y + 1;
        while (newY >= 0 && newY < HEIGHT && slots[newY][x].value == val) {
            v++;
            if (v == 4) return true;
            newY++;
        }

        newY = y - 1;
        while (newY >= 0 && newY < HEIGHT && slots[newY][x].value == val) {
            v++;
            if (v == 4) return true;
            newY--;
        }

        // diagonal

        let dx = x + 1;
        let dy = y + 1;
        while (dx >= 0 && dx < WIDTH && dy >= 0 && dy < HEIGHT && slots[dy][dx].value == val) {
            d1++;
            if (d1 == 4) return true;
            dx++;
            dy++;
        }

        dx = x - 1;
        dy = y - 1;
        while (dx >= 0 && dx < WIDTH && dy >= 0 && dy < HEIGHT && slots[dy][dx].value == val) {
            d1++;
            if (d1 == 4) return true;
            dx--;
            dy--;
        }

        dx = x + 1;
        dy = y - 1;
        while (dx >= 0 && dx < WIDTH && dy >= 0 && dy < HEIGHT && slots[dy][dx].value == val) {
            d2++;
            if (d2 == 4) return true;
            dx++;
            dy--;
        }

        dx = x - 1;
        dy = y + 1;
        while (dx >= 0 && dx < WIDTH && dy >= 0 && dy < HEIGHT && slots[dy][dx].value == val) {
            d2++;
            if (d2 == 4) return true;
            dx--;
            dy++;
        }

        // no direction has 4 coins

        return false;
    }

    function getLowestCoin(x) {
        for (let i = 5; i >= 0; i--) {
            if (slots[i][x].value == 0) return i;
        }
        return -1;
    }

    function coinPlayed(x, y) {
        if (y != 0) return
        if (slots[0][x].value != 0) return
        const position = getLowestCoin(x);

        if (position == -1) return

        setSlots(currentSlots => (
            currentSlots.map((row, y_map) => (
                row.map((slot, x_map) => {
                    if (y_map == position && x_map == x) {
                        return {
                            ...slot,
                            value: props.turn
                        }
                    } else return { ...slot }
                })
            ))
        ))

        // console.log(checkWin(x, position, props.turn))
        
        props.setTurn(turn => turn == 1 ? 2 : 1);
        if(checkWin(x, position, props.turn)) alert('win!')
    }

    function clearBoard() {
        setSlots(currentSlots => (
            currentSlots.map((row, y_map) => (
                row.map((slot, x_map) => {
                    return {
                        ...slot,
                        value: 0
                    }
                })
            ))
        ))
    }

    return (
        <div>
            <div className='board-grid'>
                {
                    slots.map(row => (
                        row.map(slot => (
                            <Slot
                                key={slot.id}
                                x={slot.x}
                                y={slot.y}
                                id={slot.id}
                                value={slot.value}
                                coinPlayed={coinPlayed} />
                        ))
                    ))
                }
            </div>
            <div onClick={props.onStart} className='board-start-button'>
                Start
            </div>
            <div onClick={clearBoard} className='board-start-button'>
                Clear
            </div>
        </div>
    )
}

export default Board;