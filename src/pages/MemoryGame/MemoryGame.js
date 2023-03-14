import { useEffect, useState } from "react"
import SingleCard from "./SingleCard"


export default function MemoryGame() {
    const [cards, setCards] = useState([])
    const [turns, setTurns] = useState(0)
    const [choiceOne, setchoiceOne] = useState(null)
    const [choiceTwo, setchoiceTwo] = useState(null)
    const [disabled, setDisabled] = useState(false)

    const cardImages = [
        { "src": "/images/blue.png", matched: false },
        { "src": "/images/red.png", matched: false },
        { "src": "/images/yellow.png", matched: false },
        { "src": "/images/green.png", matched: false },
        { "src": "/images/pink.png", matched: false },
        { "src": "/images/purple.png", matched: false },
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
            }
        }
    }, [choiceOne, choiceTwo])

    const handleChoice = (card) => {
        if (card.id === choiceOne?.id) return;
        choiceOne ? setchoiceTwo(card) : setchoiceOne(card)
    }

    const resetTurn = () => {
        setchoiceOne(null)
        setchoiceTwo(null)
        setTurns(prevTurns => prevTurns + 1)
        setDisabled(false)
    }

    return (
        <div className="app-memory">
            <div className="title-page">
                <h1>Memory Game</h1>
            </div>
            <button className="start-game-btn" onClick={shuffleCards} >Start Game</button>
            <div className="game-container">
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
