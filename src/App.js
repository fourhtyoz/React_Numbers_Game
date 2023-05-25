import React from "react";
import Die from "./components/Die";
import { nanoid } from "nanoid";
import Confetti from 'react-confetti'

export default function App() {

    const [dice, setDice] = React.useState(allNewDice)
    const [tenzies, setTenzies] = React.useState(false)

    React.useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const allSameValue = dice.every(die => die['value'])

        if (allHeld && allSameValue)
            setTenzies(prev => !prev)
    }, [dice])

    function generateNewDie() {
        return {
                id: nanoid(),
                value: Math.ceil(Math.random() * 6),
                isHeld: false
        }
    }

    function allNewDice() {
        let values = []
        for (let i = 0; i < 10; i++) {
            values.push(generateNewDie())
        }
        return values
    }
    
    function rollDice() {
        setDice(prev => prev.map(die => {
            return die.isHeld ? 
                   {...die} : 
                   generateNewDie()
        }))
    }

    function holdDice(id) {
        setDice(prev => prev.map(die => die.id === id ? {...die, isHeld: !die.isHeld} : die))}

    function restart() {
        setTenzies(prev => !prev)
        setDice(allNewDice())
    }
    
    const diceElements = dice.map(die => (
        <Die 
            key={die.id} 
            isHeld={die.isHeld} 
            value={die.value}
            holdDice={() => holdDice(die.id)}
        />
            )
    )

    return (
        <main>
            {tenzies && <Confetti width='1200px' height='700px'/>}
            <h1 className="heading">Tenzies</h1>
            <p className="description">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className="board">
                {diceElements}
            </div>
            <button onClick={tenzies ? restart : rollDice}>{tenzies ? 'New Game' : 'Roll'}</button>
        </main>
    )

}