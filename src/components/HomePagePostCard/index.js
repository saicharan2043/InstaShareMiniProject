import {withRouter} from 'react-router-dom'

import {Component} from 'react'

import {BsHeart} from 'react-icons/bs'
import {FcLike} from 'react-icons/fc'
import {FaRegComment} from 'react-icons/fa'
import {BiShareAlt} from 'react-icons/bi'

import Cookies from 'js-cookie'

import './index.css'

class PostCardOfHomePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      uniqueId: props.postItem.postId,
      likedStatus: false,
      postLikesCount: props.postItem.likesCount,
      userUniqueId: props.postItem.userId,
    }
  }

  clickLikeBtn = async () => {
    const {uniqueId, likedStatus} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const likeStatus = {
      like_status: !likedStatus,
    }
    const url = `https://apis.ccbp.in/insta-share/posts/${uniqueId}/like`
    const option = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(likeStatus),
    }
    const response = await fetch(url, option)
    const data = await response.json()
    console.log(data)
    if (data.message === 'Post has been liked') {
      this.setState(privewsValue => ({
        likedStatus: !privewsValue.likedStatus,
        postLikesCount: privewsValue.postLikesCount + 1,
      }))
    } else {
      this.setState(privewsValue => ({
        likedStatus: !privewsValue.likedStatus,
        postLikesCount: privewsValue.postLikesCount - 1,
      }))
    }
  }

  ClickProfile = () => {
    const {userUniqueId} = this.state
    const {history} = this.props
    history.replace(`/users/${userUniqueId}`)
  }

  render() {
    const {postItem} = this.props
    const {likedStatus, postLikesCount} = this.state
    const {
      comments,
      createdAt,
      postDetails,
      profilePic,

      userName,
    } = postItem

    return (
      <li className="list-container">
        <button
          className="top-container-in-post"
          type="button"
          onClick={this.ClickProfile}
        >
          <img
            src={profilePic}
            className="profile-pic-in-post"
            alt="post author profile"
          />
          <h1 className="user-name-in-post">{userName}</h1>
        </button>
        <img src={postDetails.image_url} className="post-img" alt="post" />
        <div className="bottom-container-in-post">
          <div className="like-icon-container">
            {likedStatus ? (
              <button
                className="menu-bottun-sm"
                type="button"
                onClick={this.clickLikeBtn}
              >
                <FcLike className="icons-size liked-icon-color" />
              </button>
            ) : (
              <button
                className="menu-bottun-sm"
                type="button"
                onClick={this.clickLikeBtn}
              >
                <BsHeart className="icons-size" />
              </button>
            )}
            <button className="menu-bottun-sm" type="button">
              <FaRegComment className="icons-size" />
            </button>
            <button className="menu-bottun-sm" type="button">
              <BiShareAlt className="icons-size" />
            </button>
          </div>
          <p className="discription-text span">{postLikesCount} likes</p>
          <p className="discription-text">{postDetails.caption}</p>
          {comments.map(echValue => (
            <p className="discription-text span">
              <span className="span">{echValue.user_name}</span>
              {echValue.comment}
            </p>
          ))}

          <p className="post-at-text">{createdAt}</p>
        </div>
      </li>
    )
  }
}

export default withRouter(PostCardOfHomePage)
