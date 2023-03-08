import './index.css'

const StoryCard = props => {
  const {stroyItem} = props
  const {userName, storyUrl} = stroyItem
  return (
    <li className="list-story">
      <img src={storyUrl} className="img-story" alt="user story" />
      <p className="username-of-story">{userName}</p>
    </li>
  )
}

export default StoryCard
