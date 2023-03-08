import './index.css'

const PostCard = props => {
  const {postItem, isTrue} = props

  const {image} = postItem
  return (
    <li className="list-post-card">
      <img
        src={image}
        className="post-img-profile"
        alt={isTrue ? 'my post' : 'user post'}
      />
    </li>
  )
}

export default PostCard
