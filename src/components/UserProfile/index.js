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

class UserProfile extends Component {
  state = {userDetailList: {}, displayPosition: ProfileStatus.loading}

  componentDidMount() {
    this.getUserProfileData()
  }

  getUserProfileData = async () => {
    this.setState({displayPosition: ProfileStatus.loading})
    const {match} = this.props
    const {params} = match
    const {id} = params
    // const id = 'Prabuddha_Dasgupta'

    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/insta-share/users/${id}`
    const option = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, option)

    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const updateData = {
        followersCount: data.user_details.followers_count,
        followingCount: data.user_details.following_count,
        id: data.user_details.id,
        posts: data.user_details.posts,
        postsCount: data.user_details.posts_count,
        profilePic: data.user_details.profile_pic,
        stories: data.user_details.stories,
        userBio: data.user_details.user_bio,
        userId: data.user_details.user_id,
        userName: data.user_details.user_name,
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

  UserProfileResponseSuccess = () => {
    const {userDetailList} = this.state
    console.log(userDetailList)
    const {posts, stories} = userDetailList

    // this variable create to set alt value to some images in those component
    const isTrue = false
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
    this.getUserProfileData()
  }

  UserProfileResponseFailure = () => (
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

  displayUserProfile = () => {
    const {displayPosition} = this.state
    switch (displayPosition) {
      case ProfileStatus.success:
        return this.UserProfileResponseSuccess()
      case ProfileStatus.loading:
        return this.loaderRunning()
      case ProfileStatus.failure:
        return this.UserProfileResponseFailure()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.displayUserProfile()}
      </>
    )
  }
}

export default UserProfile
