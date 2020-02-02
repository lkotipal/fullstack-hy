import React from 'react'

const Total = (props) => (
    <p>
        <strong>
            Total of {props.parts.map(value => value.exercises).reduce((a, b) => a + b, 0)} exercises
        </strong>
    </p>
)

export default Total