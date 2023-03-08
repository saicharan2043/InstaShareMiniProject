import './index.css'

const StoryCard = props => {
  const {story, isTrue} = props
  const {image} = story

  return (
    <li className="story-list-card">
      <img
        src={image}
        className="story-img"
        alt={isTrue ? 'my story' : 'user story'}
      />
    </li>
  )
}

export default StoryCard
