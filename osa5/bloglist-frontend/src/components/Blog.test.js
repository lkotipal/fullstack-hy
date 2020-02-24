import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog/>', () => {
  let component
  const like = jest.fn()

  const blog = {
    title: 'Miksi yksikkötestejä',
    author: 'Pantsukimies Kotipoltto',
    url: 'localhost',
    likes: 9001,
    id: 1,
    user: {
      name: 'Asd396'
    },
  }

  beforeEach(() => {
    component = render(
      <Blog blog={blog} onLike={like} />
    )
  })

  test('renders initial content', () => {
    expect(component.container).toHaveTextContent(
      blog.title
    )

    expect(component.container).not.toHaveTextContent(
      blog.url
    )

    expect(component.container).not.toHaveTextContent(
      '9001'
    )
  })

  test('renders details', () => {
    const button = component.getByText('show')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent(
      blog.title
    )

    expect(component.container).toHaveTextContent(
      blog.url
    )

    expect(component.container).toHaveTextContent(
      '9001'
    )
  })

  test('liking twice calls handler twice', () => {
    const button = component.getByText('show')
    fireEvent.click(button)

    const likeButton = component.getByText('like')

    fireEvent.click(likeButton)
    expect(like.mock.calls.length).toBe(1)
    fireEvent.click(likeButton)
    expect(like.mock.calls.length).toBe(2)
  })
})