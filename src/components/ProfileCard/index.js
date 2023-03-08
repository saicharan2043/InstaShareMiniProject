import './index.css'

const ProfileCard = props => {
  const {userDetailList, isTrue} = props
  const {
    followersCount,
    followingCount,
    profilePic,
    userBio,
    userId,
    userName,
    postsCount,
  } = userDetailList
  return (
    <div className="profile-container">
      <img
        src={profilePic}
        alt={isTrue ? 'my profile' : 'user profile'}
        className="profile-dp"
      />
      <div className="profile-details-container">
        <h1 className="user-name">{userName}</h1>
        <div className="followers-super-container">
          <img src={profilePic} className="profile-dp-sm" alt="" />
          <div className="followers-sub-container">
            <p className="follower-text">{postsCount}</p>
            <p className="follower-text">posts</p>
          </div>

          <div className="followers-sub-container">
            <p className="follower-text">{followersCount}</p>
            <p className="follower-text">followers</p>
          </div>

          <div className="followers-sub-container">
            <p className="follower-text">{followingCount}</p>
            <p className="follower-text">following</p>
          </div>
        </div>
        <p className="name-text">{userId}</p>
        <p className="discription">{userBio}</p>
      </div>
    </div>
  )
}

export default ProfileCard
