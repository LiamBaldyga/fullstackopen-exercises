import { useMutation, useQuery } from '@apollo/client'
import { useState } from 'react'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'

const BirthForm = () => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const authors = useQuery(ALL_AUTHORS)

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  })

  const submit = (event) => {
    event.preventDefault()

    editAuthor({ variables: { name, born } })

    setName('')
    setBorn('')
  }
  return (
    <div>
      <form onSubmit={submit}>
        <div>
          <label>
            Author:
            <select
              value={name}
              onChange={({ target }) => setName(target.value)}
            >
              {authors.data.allAuthors.map((author) => {
                return (
                  <option key={author.name} value={author.name}>
                    {author.name}
                  </option>
                )
              })}
            </select>
          </label>
        </div>
        <div>
          <label>
            Born:
            <input
              value={born}
              onChange={({ target }) => setBorn(Number(target.value))}
            />
          </label>
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default BirthForm
