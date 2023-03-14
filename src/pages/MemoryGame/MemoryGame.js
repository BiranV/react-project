import { useEffect, useState } from "react"
import SingleCard from "./SingleCard"


export default function MemoryGame() {
    const [cards, setCards] = useState([])
    const [turns, setTurns] = useState(0)
    const [choiceOne, setchoiceOne] = useState(null)
    const [choiceTwo, setchoiceTwo] = useState(null)
    const [disabled, setDisabled] = useState(false)
    const [popup, setPopup] = useState(false)

    const cardImages = [
        { "src": "/images/1.png", matched: false },
        { "src": "/images/2.png", matched: false },
        { "src": "/images/3.png", matched: false },
        { "src": "/images/4.png", matched: false },
        { "src": "/images/5.png", matched: false },
        { "src": "/images/6.png", matched: false },
        { "src": "/images/7.png", matched: false },
        { "src": "/images/8.png", matched: false },
    ]

    const shuffleCards = () => {
        const shuffledCards = [...cardImages, ...cardImages]
            .sort(() => Math.random() - 0.5)
            .map((card) => ({ ...card, id: Math.random() }));

        setCards(shuffledCards);
        setTurns(0);
    }

    useEffect(() => {
        if (choiceOne && choiceTwo) {
            setDisabled(true)
            if (choiceOne.src === choiceTwo.src) {
                setCards(prev => {
                    return prev.map((card) => {
                        if (card.src === choiceOne.src) {
                            return { ...card, matched: true }
                        }
                        else {
                            return card;
                        }
                    })
                })
                resetTurn()
            } else {
                setTimeout(() => resetTurn(), 1000)
            };
        }
        checkMode()

    }, [choiceOne, choiceTwo])

    const handleChoice = (card) => {
        if (card.id === choiceOne?.id) return;
        choiceOne ? setchoiceTwo(card) : setchoiceOne(card)
    }

    const checkMode = () => {
        const res = cards.filter(x => x.matched === true);
        if (res.length === 16) {
            setPopup(true)
        } else return;

    }

    const resetTurn = () => {
        setchoiceOne(null)
        setchoiceTwo(null)
        setTurns(prevTurns => prevTurns + 1)
        setDisabled(false)
    }

    const resetGame = () => {
        setchoiceOne(null)
        setchoiceTwo(null)
        setTurns(0)
        setDisabled(false)
        setPopup(false)
        setCards([])
    }

    return (
        <div className="app-memory">
            <div className="title-page">
                <h1>Memory Game</h1>
            </div>
            <button className="start-game-btn" onClick={shuffleCards} >Start Game</button>
            <div className="grid-container">
                {popup && <div className="popup">
                    <div className="popup-inner-memory">
                        <div>
                            Good Job!<br />
                            You beat the game in {turns} moves
                        </div>
                        <button
                            style={{marginTop: "1rem"}}
                            type="button"
                            className="blue-btn"
                            onClick={resetGame}
                        >
                            Exit
                        </button>
                    </div>
                </div>}
                {cards.map(card => (
                    <SingleCard
                        key={card.id}
                        card={card}
                        handleChoice={handleChoice}
                        flipped={card === choiceOne || card === choiceTwo || card.matched}
                        disabled={disabled}
                    />
                ))}
            </div>
        </div >
    )
}
