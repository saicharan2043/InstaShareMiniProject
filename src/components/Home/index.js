import {Component} from 'react'

import Cookies from 'js-cookie'

import Slider from 'react-slick'

import Loader from 'react-loader-spinner'

import StoryCard from '../HomeStoryCard'

import SearchFunctionality from '../SearchFunctionality'
import Header from '../Header'

import PostCardOfHomePage from '../HomePagePostCard'

import './index.css'

const storysStatus = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

const postsStatus = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class Home extends Component {
  state = {
    storysList: [],
    postsList: [],
    storysPosition: storysStatus.loading,
    postsPosition: postsStatus.loading,
    valueOfSearch: '',
  }

  componentDidMount() {
    this.getStorysData()
    this.getPostsData()
  }

  // storys detail code

  retryDataBtnStory = () => {
    this.getStorysData()
  }

  responseFailureOfStroy = () => (
    <div className="loader-of-story">
      <img
        src="https://res.cloudinary.com/dufhgcfh6/image/upload/v1678003872/Group_7522_khgnyr.jpg"
        alt="failure view"
        className="story-failure"
      />
      <p className="failure-text story-heading">
        Something went wrong. Please try again
      </p>
      <button
        className="retry-error-btn"
        type="button"
        onClick={this.getStorysData}
      >
        Try Again
      </button>
    </div>
  )

  loadingStageOfStroysData = () => (
    <div className="loader-of-story" data-testid="loader">
      <Loader type="TailSpin" color="#4094ef" height="50" width="50" />
    </div>
  )

  responseSuccessOfStroy = () => {
    const {storysList} = this.state
    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 7,
      slidesToScroll: 1,
    }

    const settingsSm = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
    }

    return (
      <>
        <ul className="un-order-list-story">
          <Slider {...settings}>
            {storysList.map(echValue => (
              <StoryCard stroyItem={echValue} key={echValue.userId} />
            ))}
          </Slider>
        </ul>

        <ul className="un-order-list-story-sm">
          <Slider {...settingsSm}>
            {storysList.map(echValue => (
              <StoryCard stroyItem={echValue} key={echValue.userId} />
            ))}
          </Slider>
        </ul>
      </>
    )
  }

  displayCurrentStageOfStorysData = () => {
    const {storysPosition} = this.state
    switch (storysPosition) {
      case storysStatus.success:
        return this.responseSuccessOfStroy()
      case storysStatus.failure:
        return this.responseFailureOfStroy()
      case storysStatus.loading:
        return this.loadingStageOfStroysData()
      default:
        return null
    }
  }

  getStorysData = async () => {
    this.setState({storysPosition: storysStatus.loading})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/insta-share/stories'
    const option = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, option)
    if (response.ok === true) {
      const data = await response.json()
      const updateData = data.users_stories.map(echValue => ({
        userId: echValue.user_id,
        userName: echValue.user_name,
        storyUrl: echValue.story_url,
      }))
      this.setState({
        storysList: updateData,
        storysPosition: storysStatus.success,
      })
    } else {
      this.setState({storysPosition: storysStatus.failure})
    }
  }

  // posts detail code

  retryDataBtnPost = () => {
    this.getPostsData()
  }

  postsResponseFailure = () => (
    <div className="loader-of-post">
      <img
        src="https://res.cloudinary.com/dufhgcfh6/image/upload/v1678003872/Group_7522_khgnyr.jpg"
        alt="failure view"
        className="failure-img"
      />
      <p className="failure-text">Something went wrong. Please try again</p>
      <button
        className="failure-btn"
        type="button"
        onClick={this.retryDataBtnPost}
      >
        Try again
      </button>
    </div>
  )

  postsLoadingPosotion = () => (
    <div className="loader-of-post" data-testid="loader">
      <Loader type="TailSpin" color="#4094ef" height="50" width="50" />
    </div>
  )

  postsResponseSuccess = () => {
    const {postsList} = this.state
    return (
      <ul className="un-order-list-posts">
        {postsList.map(echValue => (
          <PostCardOfHomePage postItem={echValue} key={echValue.postId} />
        ))}
      </ul>
    )
  }

  displayCurrentStageOfPostsData = () => {
    const {postsPosition} = this.state
    switch (postsPosition) {
      case postsStatus.success:
        return this.postsResponseSuccess()
      case postsStatus.failure:
        return this.postsResponseFailure()
      case postsStatus.loading:
        return this.postsLoadingPosotion()
      default:
        return null
    }
  }

  getPostsData = async () => {
    this.setState({postsPosition: postsStatus.loading})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/insta-share/posts'
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
      const updateData = data.posts.map(echValue => ({
        comments: echValue.comments,
        createdAt: echValue.created_at,
        likesCount: echValue.likes_count,
        postDetails: echValue.post_details,
        postId: echValue.post_id,
        profilePic: echValue.profile_pic,
        userId: echValue.user_id,
        userName: echValue.user_name,
      }))
      console.log(updateData)
      this.setState({
        postsList: updateData,
        postsPosition: postsStatus.success,
      })
    } else {
      this.setState({postsPosition: postsStatus.failure})
    }
  }

  clickSearch = searchValue => {
    this.setState({valueOfSearch: searchValue})
  }

  render() {
    const {valueOfSearch} = this.state
    return (
      <>
        <Header clickSearch={this.clickSearch} />
        {valueOfSearch.length === 0 ? (
          <>
            {this.displayCurrentStageOfStorysData()}
            <hr className="hr-line" />
            {this.displayCurrentStageOfPostsData()}
          </>
        ) : (
          <SearchFunctionality valueOfSearch={valueOfSearch} />
        )}
      </>
    )
  }
}

export default Home
