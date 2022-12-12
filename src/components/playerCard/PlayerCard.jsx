import React from 'react'
import "./PlayerCard.css";
import redCoin from "./redCoin.png"
import yellowCoin from "./yellowCoin.png"


const PlayerCard = (props) => {
    return (
        <>
            <div className="player-card-wrapper">
                <div className="player-card-window">
                    <img className="player-card-coin-img" src={props.id == 1 ? redCoin : yellowCoin}></img>
                </div>
                <div className='player-card-name'>
                    {props.player}
                </div>
                <div className='player-card-wins'>
                    {props.player == "Chaitanya" ? "999 wins" : "0 wins"}
                </div>
            </div>
        </>
    )
}


export default PlayerCard;