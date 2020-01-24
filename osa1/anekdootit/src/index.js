import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Display = ({anecdote}) => (
    <>
        <div>{anecdote.text}</div>
        <div>Has {anecdote.votes} votes</div>
    </>
)

const Button = ({onClick, text}) => (
    <button onClick={onClick}>
        {text}
    </button>
)

const App = (props) => {
    class Anecdote {
        constructor(text) {
            this.text = text;
            this.votes = 0;
        }
    }

    const [selected, setSelected] = useState(0)
    const [myAnecdotes, setAnecdotes] = useState(anecdotes.map(x => new Anecdote(x)))

    function randomAnecdote() {
        setSelected(Math.floor(Math.random() * myAnecdotes.length))
    }

    function voteCurrent() {
        const newAnecdotes = [...myAnecdotes]
        newAnecdotes[selected].votes++
        setAnecdotes(newAnecdotes)
    }

    function bestAnecdote() {
        return myAnecdotes.reduce((a, b) => a.votes > b.votes ? a : b, myAnecdotes[0])
    }

    return (
        <>
            <h1>Anecdote of the day</h1>
            <Display anecdote={myAnecdotes[selected]}/>
            <div>
                <Button text='vote' onClick={() => voteCurrent()}/>
                <Button text='next anecdote' onClick={() => randomAnecdote()}/>
            </div>
            <Display anecdote={bestAnecdote()}/>
        </>
    )
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)