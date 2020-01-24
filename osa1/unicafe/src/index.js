import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({handleClick, text}) => (
    <button onClick={handleClick}>
        {text}
    </button>
)

const StatisticLine = ({text, value}) => (
    <tr>
        <td>{text}</td>
        <td>{value}</td>
    </tr>
)

const Statistics = ({good, neutral, bad}) => {
    const all = good + neutral + bad
    const average = (good - bad)/all
    const positive = 100*good/all

    return all > 0 ? (
        <div>
            <h1>Statistics</h1>
            <table>
                <tbody>
                    <StatisticLine text='good' value={good}/>
                    <StatisticLine text='neutral' value={neutral}/>
                    <StatisticLine text='bad' value={bad}/>
                    <StatisticLine text='all' value={all}/>
                    <StatisticLine text='average' value={average}/>
                    <StatisticLine text='positive' value={positive + '%'}/>
                </tbody>
            </table>
        </div>
    ) : (
        <div>No feedback given</div>
    )
}

const App = () => {
    // tallenna napit omaan tilaansa
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const incrementGood = () => {setGood(good + 1)}    
    const incrementNeutral = () => {setNeutral(neutral + 1)}    
    const incrementBad = () => {setBad(bad + 1)}    

    return (
        <div>
            <h1>Give feedback</h1>
            <Button handleClick={incrementGood} text='good'/>
            <Button handleClick={incrementNeutral} text='neutral'/>
            <Button handleClick={incrementBad} text='bad'/>
            <Statistics good={good} neutral={neutral} bad={bad}/>
        </div>
    )
}

ReactDOM.render(<App />, 
    document.getElementById('root')
)