import { useState } from 'react'

const Blog = ({ blog, update, user, delBlog }) => {
  const [expand, setExpand] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const expandBlog= () => {
    setExpand(!expand)
  }

  const likeBlog = () => {
    const updatedBlog = ({
      ...blog,
      likes: blog.likes + 1
    })
    console.log(updatedBlog)
    update(updatedBlog)
  }

  const deleteBlog = () => delBlog(blog)

  const isBlogOwner = () => {
    const matching = user.username === blog.user.username
    if(matching){
      return <button onClick={deleteBlog}>delete</button>
    } else {
      return null
    }
  }

  if(expand) {
    return (
      <div style={blogStyle} className='blog'>
        <div>
          {blog.title}
          <button onClick={expandBlog}>hide</button>
        </div>
        <div>
          {blog.url}
        </div>
        <div>
          {blog.likes}
          <button onClick={likeBlog}>like</button>
        </div>
        <div>{blog.author}</div>
        {isBlogOwner()}
      </div>
    )
  } else {
    return (
      <div style={blogStyle}>
        {blog.title} {blog.author}
        <button onClick={expandBlog}>view</button>
      </div>
    )
  }

}

export default Blog