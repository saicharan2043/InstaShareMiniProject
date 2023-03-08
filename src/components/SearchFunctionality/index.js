import {Component} from 'react'

import Cookies from 'js-cookie'

import {GoAlert} from 'react-icons/go'

import Loader from 'react-loader-spinner'

import PostCardOfHomePage from '../HomePagePostCard'

// import ConfigurationContext from '../../context/ConfigurationContext'

import './index.css'

const postsStatus = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class SearchFunctionality extends Component {
  constructor(props) {
    super(props)
    this.state = {
      search: props.valueOfSearch,
      postsList: [],
      postsPosition: postsStatus.loading,
    }
  }

  componentDidMount() {
    this.getSearchData()
  }

  getSearchData = async () => {
    const {search} = this.state
    this.setState({postsPosition: postsStatus.loading})
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/insta-share/posts?search=${search}`
    const option = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, option)
    if (response.ok === true) {
      const data = await response.json()
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
      this.setState({
        postsList: updateData,
        postsPosition: postsStatus.success,
      })
    } else {
      this.setState({postsPosition: postsStatus.failure})
    }
  }

  retryDataBtnPost = () => {
    this.getSearchData()
  }

  postsResponseFailure = () => (
    <div className="loader-of-search">
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
    <div className="loader-of-search" data-testid="loader">
      <Loader type="TailSpin" color="#4094ef" height="50" width="50" />
    </div>
  )

  searchResultNotFound = () => (
    <div className="loader-of-search">
      <img
        src="https://res.cloudinary.com/dufhgcfh6/image/upload/v1678003853/Group_1_vyfqu8.jpg"
        className="search-not-found-img"
        alt="search not found"
      />
      <h1 className="heading-search-not-found">Search Not Found</h1>
      <p className="discription-search-not-found">
        Try different keyword or search again
      </p>
    </div>
  )

  postsResponseSuccess = () => {
    const {postsList} = this.state
    if (postsList.length === 0) {
      return this.searchResultNotFound()
    }
    return (
      <>
        <h1 className="search-result-heading">Search Results</h1>
        <ul className="un-order-list-search">
          {postsList.map(echValue => (
            <PostCardOfHomePage postItem={echValue} key={echValue.postId} />
          ))}
        </ul>
      </>
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

  render() {
    return <>{this.displayCurrentStageOfPostsData()}</>
  }
}

export default SearchFunctionality
