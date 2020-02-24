import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('<Blogs/>', () => {
  let component
  const post = jest.fn()

  beforeEach(() => {
    component = render(
      <BlogForm postBlog={post}/>
    )
  })

  test('Posting a blog has proper arguments', () => {
    const title = component.container.querySelector('#title')
    const url = component.container.querySelector('#url')
    const author = component.container.querySelector('#author')

    fireEvent.change(title, {
      target: { value: 'aaa' }
    })

    fireEvent.change(url, {
      target: { value: 'bbb' }
    })

    fireEvent.change(author, {
      target: { value: 'ccc' }
    })

    const button = component.getByText('post')
    fireEvent.click(button)
    expect(post.mock.calls.length).toBe(1)
    expect(post.mock.calls[0][0]).toEqual({
      title: 'aaa',
      url: 'bbb',
      author: 'ccc'
    })
  })
})