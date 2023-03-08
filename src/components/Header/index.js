import {Link, withRouter, Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'

import {Component} from 'react'

import {GiHamburgerMenu} from 'react-icons/gi'

import {AiFillCloseCircle} from 'react-icons/ai'

import {FaSearch} from 'react-icons/fa'

// import ConfigurationContext from '../../context/ConfigurationContext'

import './index.css'

class Header extends Component {
  state = {isTabItemsTrue: false, isSearchBarTrue: false, searchValue: ''}

  // menu btn
  clickMenuIcon = () => {
    this.setState(privewsValue => ({
      isTabItemsTrue: !privewsValue.isTabItemsTrue,
      isSearchBarTrue: false,
    }))
  }

  // close btn
  closeIcon = () => {
    this.setState({isTabItemsTrue: false})
  }

  // search visible btn
  clickSearch = () => {
    this.setState({isTabItemsTrue: false, isSearchBarTrue: true})
  }

  // search value
  changeSearchValue = event => {
    this.setState({searchValue: event.target.value})
  }

  // logout
  LogOut = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
  }

  render() {
    const {isTabItemsTrue, isSearchBarTrue, searchValue} = this.state
    console.log(searchValue)
    const {clickSearch} = this.props
    const searchClick = () => {
      clickSearch(searchValue)
    }

    return (
      <>
        <nav className="navbar-lg">
          <div className="logo-side-container-lg">
            <Link className="link" to="/">
              <img
                src="https://res.cloudinary.com/dufhgcfh6/image/upload/v1678003830/Group_ujrorc.jpg"
                className="logo-lg"
                alt="website logo"
              />
            </Link>
            <h1 className="name-of-app-lg">Insta Share</h1>
          </div>
          <div className="search-bar-side-container-lg">
            <input
              type="search"
              className="search-input-lg"
              placeholder="Search Caption"
              onChange={this.changeSearchValue}
              value={searchValue}
            />
            <button
              className="search-icon-container-lg"
              type="button"
              onClick={searchClick}
            >
              <FaSearch className="search-icon" />
            </button>
            <ul className="under-list-tobs-lg">
              <li className="list-items-lg">
                <Link className="link" to="/">
                  <p className="list-items-lg">Home</p>
                </Link>
              </li>
              <li className="list-items-lg">
                <Link className="link" to="/my-profile">
                  <p className="list-items-lg">Profile</p>
                </Link>
              </li>
            </ul>
            <button
              className="logout-btn-lg"
              type="button"
              onClick={this.LogOut}
            >
              Logout
            </button>
          </div>
        </nav>

        <nav className="navbar-sm">
          <div className="first-container-sm">
            <div className="logo-side-container-sm">
              <Link className="link" to="/">
                <img
                  src="https://res.cloudinary.com/dufhgcfh6/image/upload/v1678003830/Group_ujrorc.jpg"
                  className="logo-sm"
                  alt="website logo"
                />
              </Link>
              <h1 className="name-of-app-sm">Insta Share</h1>
            </div>
            <button
              className="menu-bottun-sm"
              type="button"
              onClick={this.clickMenuIcon}
            >
              <GiHamburgerMenu className="menu-icon" />
            </button>
          </div>

          {isTabItemsTrue && (
            <div className="second-container">
              <ul className="under-list-tobs-sm">
                <li className="list-items-sm">
                  <Link className="link" to="/">
                    <p className="list-items-sm">Home</p>
                  </Link>
                </li>
                <li className="list-items-sm" onClick={this.clickSearch}>
                  Search
                </li>
                <li className="list-items-sm">
                  <Link className="link" to="/my-profile">
                    <p className="list-items-sm">Profile</p>
                  </Link>
                </li>
              </ul>
              <button
                className="logout-btn-sm"
                type="button"
                onClick={this.LogOut}
              >
                Logout
              </button>

              <button
                className="menu-bottun-sm"
                type="button"
                onClick={this.closeIcon}
              >
                <AiFillCloseCircle className="close-icon" />
              </button>
            </div>
          )}

          {isSearchBarTrue && (
            <div className="third-container">
              <input
                className="search-input-sm"
                type="search"
                placeholder="Search Caption"
                onChange={this.changeSearchValue}
                value={searchValue}
              />
              <button
                className="search-icon-container-sm"
                type="button"
                onClick={searchClick}
              >
                <FaSearch className="search-icon-sm" />
              </button>
            </div>
          )}
        </nav>
      </>
    )
  }
}

export default withRouter(Header)
