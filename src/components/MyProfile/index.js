import {Component} from 'react'

import {BsGrid3X3} from 'react-icons/bs'

import {BiCamera} from 'react-icons/bi'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import StoryCard from '../StoryCard'

import Header from '../Header'
import PostCard from '../PostCard'
import ProfileCard from '../ProfileCard'

import './index.css'

const ProfileStatus = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class MyProfile extends Component {
  state = {userDetailList: {}, displayPosition: ProfileStatus.loading}

  componentDidMount() {
    this.getMyProfileData()
  }

  getMyProfileData = async () => {
    this.setState({displayPosition: ProfileStatus.loading})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/insta-share/my-profile'
    const option = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, option)
    if (response.ok === true) {
      const data = await response.json()
      const updateData = {
        followersCount: data.profile.followers_count,
        followingCount: data.profile.following_count,
        id: data.profile.id,
        posts: data.profile.posts,
        postsCount: data.profile.posts_count,
        profilePic: data.profile.profile_pic,
        stories: data.profile.stories,
        userBio: data.profile.user_bio,
        userId: data.profile.user_id,
        userName: data.profile.user_name,
      }

      this.setState({
        userDetailList: updateData,
        displayPosition: ProfileStatus.success,
      })
    } else {
      this.setState({displayPosition: ProfileStatus.failure})
    }
  }

  loaderRunning = () => (
    <div className="loader-container-profile" data-testid="loader">
      <Loader type="TailSpin" color="#4094ef" height="50" width="50" />
    </div>
  )

  MyProfileResponseSuccess = () => {
    const {userDetailList} = this.state
    const {posts, stories} = userDetailList

    // this variable create to set alt value to some images in those component
    const isTrue = true
    return (
      <>
        <ProfileCard
          userDetailList={userDetailList}
          key={userDetailList.id}
          isTrue={isTrue}
        />
        <ul className="un-order-profile-story">
          {stories.map(echValue => (
            <StoryCard story={echValue} key={echValue.id} isTrue={isTrue} />
          ))}
        </ul>
        <hr className="hr-line-profile" />
        <div className="posts-container">
          <BsGrid3X3 className="gride-icon" />
          <h1 className="posts-heading">Posts</h1>
        </div>
        {posts.length !== 0 ? (
          <ul className="un-order-profile-posts">
            {posts.map(echValue => (
              <PostCard postItem={echValue} key={echValue.id} isTrue={isTrue} />
            ))}
          </ul>
        ) : (
          <div className="no-post-container">
            <div className="camera-container">
              <BiCamera className="camera-icon" />
            </div>
            <h1 className="no-post-text">No Posts</h1>
          </div>
        )}
      </>
    )
  }

  tryAgain = () => {
    this.getMyProfileData()
  }

  MyProfileResponseFailure = () => (
    <div className="loader-container-profile">
      <img
        src="https://res.cloudinary.com/dufhgcfh6/image/upload/v1678003872/Group_7522_khgnyr.jpg"
        alt="failure view"
        className="failure-img"
      />
      <p className="failure-text">Something went wrong. Please try again</p>
      <button className="failure-btn" type="button" onClick={this.tryAgain}>
        Try again
      </button>
    </div>
  )

  displayMyProfile = () => {
    const {displayPosition} = this.state
    switch (displayPosition) {
      case ProfileStatus.success:
        return this.MyProfileResponseSuccess()
      case ProfileStatus.loading:
        return this.loaderRunning()
      case ProfileStatus.failure:
        return this.MyProfileResponseFailure()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.displayMyProfile()}
      </>
    )
  }
}

export default MyProfile
