import React from 'react'

const Part = ({part}) => (
    <li>
        {part.name} {part.exercises}
    </li>
)

export default Part