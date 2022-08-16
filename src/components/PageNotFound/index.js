import {Link} from 'react-router-dom'
import './index.css'

const PageNotFound = () => (
  <div className="not-found-container">
    <img
      src="https://res.cloudinary.com/dy8lqwi3r/image/upload/v1660502418/erroring_1_lq2sxm.png"
      alt="not found"
      className="not-found-image"
    />
    <h1 className="not-found-heading">Page Not Found</h1>
    <p className="not-found-description">
      We are sorry, the page you requested could not be found. Please go back to
      the homepage
    </p>
    <Link to="/">
      <button type="button" className="home-page-button">
        Home Page
      </button>
    </Link>
  </div>
)
export default PageNotFound
