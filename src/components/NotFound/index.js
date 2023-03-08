import './index.css'

const NotFound = props => {
  const GotToHome = () => {
    const {history} = props
    history.replace('/')
  }

  return (
    <div className="not-found-container">
      <img
        src="https://res.cloudinary.com/dufhgcfh6/image/upload/v1678003861/Layer_1_ljqucq.jpg"
        className="img-notfound"
        alt="page not found"
      />
      <h1 className="text-notfound">Page Not Found</h1>
      <p className="discription-notfound">
        We are sorry, the page you requested could not be found. Please go back
        to the HomePage.
      </p>
      <button className="button-notfound" onClick={GotToHome}>
        Home Page
      </button>
    </div>
  )
}

export default NotFound
