import CommentForm from './CommentForm'

const Comment = ({ comment }) => <div>{comment}</div>

const Comments = ({ blog }) => {
  if (!blog.comments) return null
  console.log(blog)

  return (
    <div>
      {blog.comments.map((comment) => (
        <Comment comment={comment} key={blog.id + Math.random() * 100} />
      ))}
    </div>
  )
}

export default Comments
